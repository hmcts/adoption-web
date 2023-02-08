import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'Your application has been submitted',
  referenceNumber: 'Application reference number<br><strong>1234567890123456</strong>',
  emailSentConfirmation: 'We have sent a confirmation email to the email addresses registered. ',
  line1:
    'The application will now be sent to the court for processing. If you did not upload the Annex A as part of the evidence for the application, you should do this as soon possible to prevent delays and reminders from being sent. ',
  line2:
    'If you cannot upload the Annex A within 10 working days from when you submitted the application, you can email it directly to the court.',
  line3: 'An email will be sent to the applicants to let them know that their application is with the court.',
  line4:
    'You should discuss any attendance at the hearings with the applicants. Particularly if there is a risk that the birth parents may be there.',
};

const cyContent = {
  title: "Mae eich ymateb i'r cais wedi cael ei gyflwyno",
  referenceNumber: 'Rhif yr achos<br><strong>1234567890123456</strong>',
  emailSentConfirmation:
    'Bydd e-bost yn cael ei anfon at y ceiswyr i roi gwybod iddyn nhw bod eu cais wedi cyrraedd y llys.',
  line1:
    "Rydym hefyd wedi anfon e-bost cadarnhau i gyfeiriadau e-bost cofrestredig yr awdurdod lleol ar gyfer y ceisydd a'r awdurdod lleol ar gyfer y plentyn. Darparwyd y cyfeiriadau e-bost hyn gan y ceisydd.",
  line2: "Mae'r e-bost yn rhoi gwybodaeth fanylach am y llinell amser a beth sy'n digwydd nesaf.",
  line3:
    "Bydd y cais nawr yn cael ei anfon i'r llys i’w brosesu. Os na wnaethoch lwytho Atodiad A fel rhan o'r dystiolaeth ar gyfer y cais, dylech wneud hyn cyn gynted â phosibl er mwyn atal oedi.",
  line4: 'Mewngofnodwch i’r',
};

describe('application-submmitted > content', () => {
  const commonContent = { language: 'en', userCase: { hyphenatedCaseRef: '1234567890123456' } } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
