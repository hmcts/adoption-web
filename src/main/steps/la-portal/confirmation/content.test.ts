import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'Your application has been submitted',
  referenceNumber: 'Application reference number<br><strong>1234567890123456</strong>',
  emailSentConfirmation: 'We have sent a confirmation to the email addresses registered. ',
  line1:
    'The application will now be sent to the court for processing. If you did not upload the Annex A as part of the evidence for the application, you should email this directly to the court as soon as possible to prevent delays and reminders from being sent. ',
  /* line2:
    'If you cannot upload the Annex A within 10 working days from when you submitted the application, you can email it directly to the court.', */
  line3: 'An email will be sent to the applicants to let them know that their application is with the court.',
  line4:
    'You should discuss any attendance at the hearings with the applicants. Particularly if there is a risk that the birth parents may be there.',
};

const cyContent = {
  title: 'Mae eich cais wedi cael ei gyflwyno',
  referenceNumber: 'Cyfeirnod y cais<br><strong>1234567890123456</strong>',
  emailSentConfirmation: 'Rydym wedi anfon e-bost cadarnhad i’r cyfeiriadau e-bost a gofrestrwyd.',
  line1:
    'Bydd y cais nawr yn cael ei anfon i’r llys i’w brosesu. Os na wnaethoch uwchlwytho Atodiad A fel rhan o’r dystiolaeth ar gyfer y cais, dylech e-bostiwch hwn yn uniongyrchol i’r llys cyn gynted â phosib i atal oedi a negeseuon atgoffa rhag cael eu hanfon. ',
  /* line2:
    "Os na allwch uwchlwytho Atodiad A o fewn 10 diwrnod gwaith o'r adeg y gwnaethoch gyflwyno'r cais, gallwch ei e-bostio'n uniongyrchol i'r llys. ", */
  line3: 'Fe anfonir e-bost at y ceiswyr i’w hysbysu bod eu cais wedi cyrraedd y llys. ',
  line4:
    'Dylech drafod unrhyw bresenoldeb yn y gwrandawiadau gyda’r ceiswyr. yn enwedig os oes risg y gallai"r rhieni genedigol fod yno.',
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
