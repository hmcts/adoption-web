import { TranslationFn } from '../../../app/controller/GetController';

const en = content => ({
  title: 'Application Submitted',
  referenceNumberAndChildName: `Your reference number<br><strong>${content.userCase.hyphenatedCaseRef}</strong> <br><br><strong>${content.userCase.childrenFirstName} ${content.userCase.childrenLastName}</strong>`,
  emailSentConfirmation:
    'We have sent you a confirmation email. If you have not received this, you should check your junk or spam folder.',
  nextStep: 'What happens next',
  line1:
    "Your application is sent to the local authority who will provide details of the child's birth parents and any siblings. They will send your application and a separate adoption report (Annex A) to the court. If you don't receive an email confirming this has been done within 10 working days, contact your social worker.",
  line2:
    'The court reviews your application and informs the birth parents, if applicable, of your application to adopt. They might ask the court for leave to oppose. Your social worker should let you know if this happens and how it will affect your application to adopt.',
  line3:
    'There will be a number of court hearings involving the local authority and social workers. You do not have to attend these. Birth relatives of the child may also attend the hearings.',
  line4:
    'Once the adoption order is granted, an adoption certificate is created. This replaces the child\'s birth certificate. It can be ordered from the <a href="https://www.gov.uk/general-register-office" class="govuk-link" target="_blank">General Register Office</a> for a small fee.',
  line5:
    'You should contact your social worker for updates on your application. The adoption service cannot provide these.',
  multipleChildren: 'Adopting more than one child',
  line6:
    'If you are applying for more than one child, you must complete and submit a new application for each child. This must be done before midnight on the day you submitted your first application or you will be charged an additional court fee of £183.',
  line7: 'You will be asked the same questions. This is because each application is treated separately.',
  line8:
    'You might find it useful to take a note of each new reference number next to the name of the child you are applying to adopt. The emails you receive will only contain the reference number.',
  line9: 'You must use the same email address and password for all your applications.',
  newApplication: 'Start a new application for a different child',
  printApplication: 'Print your application',
});

const cy: typeof en = content => ({
  title: 'Cais wedi’i gyflwyno',
  referenceNumberAndChildName: `Eich cyfeirnod<br><strong>${content.userCase.hyphenatedCaseRef}</strong> <br><br><strong>${content.userCase.childrenFirstName} ${content.userCase.childrenLastName}</strong>`,
  emailSentConfirmation:
    'Rydym wedi anfon neges gadarnhau drwy e-bost. Os nad ydych wedi cael y neges hon, dylech wirio eich ffolder sothach neu spam.',
  nextStep: 'Beth fydd yn digwydd nesaf',
  line1:
    'Mae’r llys yn adolygu eich cais ac yn hysbysu’r rhieni biolegol, os yw’n berthnasol, am eich cais i fabwysiadu. Mae eich manylion personol yn cael eu cadw’n gwbl gyfrinachol.',
  line2:
    'Unwaith y bydd y gorchymyn mabwysiadu yn cael ei ganiatáu, bydd tystysgrif mabwysiadu yn cael ei chreu. Bydd yn disodli tystysgrif geni\'r plentyn Gellir ei harchebu o\'r <a href="https://www.gov.uk/general-register-office" class="govuk-link" target="_blank">Swyddfa Gofrestru Gyffredinol - GOV.UK (www.gov.uk)</a> am ffi fach.',
  line3: '',
  line4: '',
  line5: '',
  multipleChildren: '',
  line6: '',
  line7: '',
  line8: '',
  line9: '',
  newApplication: '',
  printApplication: 'Llwytho eich cais i lawr neu ei argraffu',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
