import { TranslationFn } from '../../../app/controller/GetController';

const en = content => ({
  title: 'Your response to the application has been submitted',
  referenceNumber: `Case number<br><strong>${content.userCase.hyphenatedCaseRef}</strong>`,
  emailSentConfirmation:
    'An email will be sent to the applicants to let them know that their application is with the court.',
  // nextStep: 'What happens next',
  line1:
    'We have also sent a confirmation email to the registered email addresses of the local authority for the applicant and the local authority for the child. These email addresses were provided by the applicant.',
  line2: 'The email gives more detailed information about the timeline and what happens next.',
  line3:
    'The application will now be sent to the court for processing. If you did not upload Annex A as part of the evidence for the application, you should do this as soon as possible to prevent delays.',
  line4: 'Sign into the',
  documentUploadService: 'document upload service',
  line5: 'to submit the annex and any additional evidence.',
  // printApplication: 'Print your application',
  // helpUs: 'Help us improve this service',
  line6: 'You will get a copy of the full application once the court starts to process it.',
});

const cy: typeof en = content => ({
  title: 'Your response to the application has been submitted (in weslh)',
  referenceNumber: `Case number<br><strong>${content.userCase.hyphenatedCaseRef}</strong> (in welsh)`,
  emailSentConfirmation:
    'An email will be sent to the applicants to let them know that their application is with the court. (in welsh)',
  // nextStep: 'Beth fydd yn digwydd nesaf',
  line1:
    'We have also sent a confirmation email to the registered email addresses of the local authority for the applicant and the local authority for the child. These email addresses were provided by the applicant. (in welsh)',
  line2: 'The email gives more detailed information about the timeline and what happens next. (in welsh)',
  line3:
    'The application will now be sent to the court for processing. If you did not upload Annex A as part of the evidence for the application, you should do this as soon as possible to prevent delays.',
  line4: 'Sign into the',
  documentUploadService: 'document upload service',
  line5: 'to submit the annex and any additional evidence. (in welsh)',
  // printApplication: 'Argraffu eich cais',
  // helpUs: 'Help us improve this service (in welsh)',
  line6: 'You will get a copy of the full application once the court starts to process it. (in welsh)',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
