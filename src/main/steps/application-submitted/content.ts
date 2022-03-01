import { TranslationFn } from '../../app/controller/GetController';
import { formatCaseId } from '../../steps/application-submitted/utils';

const en = content => ({
  title: 'Application Submitted',
  referenceNumber: `Your reference number<br><strong>${formatCaseId(
    content.userCase.id,
    '####-####-####-####'
  )}</strong>`,
  emailSentConfirmation:
    'We have sent you a confirmation email. If you have not received this, you should check your junk or spam folder.',
  nextStep: 'What happens next',
  line1:
    'The court reviews your application and informs the birth parents, if applicable, of your application to adopt. Your personal details are kept strictly confidential.',
  line2:
    "Once the adoption order is granted, an adoption certificate is created. This replaces the child's birth certificate. It can be ordered from the General Register Office for a small fee.",
  printApplication: 'Print your application',
});

const cy = content => ({
  title: 'Application Submitted (in welsh)',
  referenceNumber: `Your reference number<br><strong>${formatCaseId(
    content.userCase.id,
    '####-####-####-####'
  )}</strong> (in welsh)`,
  emailSentConfirmation:
    'We have sent you a confirmation email. If you have not received this, you should check your junk or spam folder. (in welsh)',
  nextStep: 'What happens next (in welsh)',
  line1:
    'The court reviews your application and informs the birth parents, if applicable, of your application to adopt. Your personal details are kept strictly confidential. (in welsh)',
  line2:
    "Once the adoption order is granted, an adoption certificate is created. This replaces the child's birth certificate. It can be ordered from the General Register Office for a small fee. (in welsh)",
  printApplication: 'Print your application (in welsh)',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
