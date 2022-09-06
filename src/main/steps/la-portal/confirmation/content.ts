import { TranslationFn } from '../../../app/controller/GetController';

const en = content => ({
  title: 'Your response to the application has been submitted',
  referenceNumber: `Case number<br><strong>${content.userCase.hyphenatedCaseRef}</strong>`,
  emailSentConfirmation:
    'An email will be sent to the applicants to let them know that their application is with the court.',
  line1:
    'We have also sent a confirmation email to the registered email addresses of the local authority for the applicant and the local authority for the child. These email addresses were provided by the applicant.',
  line2: 'The email gives more detailed information about the timeline and what happens next.',
  line3:
    'The application will now be sent to the court for processing. If you did not upload Annex A as part of the evidence for the application, you should do this as soon as possible to prevent delays.',
  line4: 'Sign into the',
  documentUploadService: 'document upload service',
  line5: 'to submit the annex and any additional evidence.',
  line6: 'You will get a copy of the full application once the court starts to process it.',
});

const cy: typeof en = content => ({
  title: "Mae eich ymateb i'r cais wedi cael ei gyflwyno",
  referenceNumber: `Rhif yr achos<br><strong>${content.userCase.hyphenatedCaseRef}</strong>`,
  emailSentConfirmation:
    'Bydd e-bost yn cael ei anfon at y ceiswyr i roi gwybod iddyn nhw bod eu cais wedi cyrraedd y llys.',
  line1:
    "Rydym hefyd wedi anfon e-bost cadarnhau i gyfeiriadau e-bost cofrestredig yr awdurdod lleol ar gyfer y ceisydd a'r awdurdod lleol ar gyfer y plentyn. Darparwyd y cyfeiriadau e-bost hyn gan y ceisydd.",
  line2: "Mae'r e-bost yn rhoi gwybodaeth fanylach am y llinell amser a beth sy'n digwydd nesaf.",
  line3:
    'Bydd y cais nawr yn cael ei anfon i’r llys i’w brosesu. Os na wnaethoch uwchlwytho Atodiad A fel rhan o’r dystiolaeth ar gyfer y cais, dylech wneud hynny cyn gynted â phosibl er mwyn atal oedi.',
  line4: 'Sign into the',
  documentUploadService: 'document upload service',
  line5: 'to submit the annex and any additional evidence. (in welsh)',
  line6: "Fe gewch chi gopi o'r cais llawn unwaith y bydd y llys yn dechrau ei brosesu.",
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
