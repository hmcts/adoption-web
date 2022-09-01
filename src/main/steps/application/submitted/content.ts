import { TranslationFn } from '../../../app/controller/GetController';

const en = content => ({
  title: 'Application Submitted',
  referenceNumber: `Your reference number<br><strong>${content.userCase.hyphenatedCaseRef}</strong>`,
  emailSentConfirmation:
    'We have sent you a confirmation email. If you have not received this, you should check your junk or spam folder.',
  nextStep: 'What happens next',
  line1:
    'The court reviews your application and informs the birth parents, if applicable, of your application to adopt. Your personal details are kept strictly confidential.',
  line2:
    'Once the adoption order is granted, an adoption certificate is created. This replaces the child\'s birth certificate. It can be ordered from the <a href="https://www.gov.uk/general-register-office" class="govuk-link" target="_blank">General Register Office - GOV.UK (www.gov.uk)</a> for a small fee.',
  printApplication: 'Download or print your application',
  helpUs: 'Help us improve this service',
  line3:
    'Please help us improve this service by <a  target="_blank" href="https://www.smartsurvey.co.uk/s/SurveyExit/?service=Adoption">leaving feedback</a>',
});

const cy: typeof en = content => ({
  title: 'Cais wedi’i gyflwyno',
  referenceNumber: `Eich cyfeirnod<br><strong>${content.userCase.hyphenatedCaseRef}</strong>`,
  emailSentConfirmation:
    'Rydym wedi anfon neges gadarnhau drwy e-bost. Os nad ydych wedi cael y neges hon, dylech wirio eich ffolder sothach neu spam.',
  nextStep: 'Beth fydd yn digwydd nesaf',
  line1:
    'Mae’r llys yn adolygu eich cais ac yn hysbysu’r rhieni biolegol, os yw’n berthnasol, am eich cais i fabwysiadu. Mae eich manylion personol yn cael eu cadw’n gwbl gyfrinachol.',
  line2:
    'Once the adoption order is granted, an adoption certificate is created. This replaces the child\'s birth certificate. It can be ordered from the <a href="https://www.gov.uk/general-register-office" class="govuk-link" target="_blank">General Register Office - GOV.UK (www.gov.uk)</a> for a small fee. (in welsh)',
  printApplication: 'Download or print your application (in welsh)',
  helpUs: 'Help us improve this service (in welsh)',
  line3:
    'Please help us improve this service by <a  target="_blank" href="https://www.smartsurvey.co.uk/s/SurveyExit/?service=Adoption">leaving feedback</a> (in welsh)',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
