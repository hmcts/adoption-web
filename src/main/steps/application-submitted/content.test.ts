import { generateContent } from '../../steps/application-submitted/content';
import { CommonContent } from '../common/common.content';

const enContent = {
  title: 'Application Submitted',
  referenceNumber: 'Your reference number<br><strong>1234-5678-9012-3456</strong>',
  emailSentConfirmation:
    'We have sent you a confirmation email. If you have not received this, you should check your junk or spam folder.',
  nextStep: 'What happens next',
  line1:
    'The court reviews your application and informs the birth parents, if applicable, of your application to adopt. Your personal details are kept strictly confidential.',
  line2:
    "Once the adoption order is granted, an adoption certificate is created. This replaces the child's birth certificate. It can be ordered from the General Register Office for a small fee.",
  printApplication: 'Print your application',
};

const cyContent = {
  title: 'Application Submitted (in welsh)',
  referenceNumber: 'Your reference number<br><strong>1234-5678-9012-3456</strong> (in welsh)',
  emailSentConfirmation:
    'We have sent you a confirmation email. If you have not received this, you should check your junk or spam folder. (in welsh)',
  nextStep: 'What happens next (in welsh)',
  line1:
    'The court reviews your application and informs the birth parents, if applicable, of your application to adopt. Your personal details are kept strictly confidential. (in welsh)',
  line2:
    "Once the adoption order is granted, an adoption certificate is created. This replaces the child's birth certificate. It can be ordered from the General Register Office for a small fee. (in welsh)",
  printApplication: 'Print your application (in welsh)',
};

describe('application submmitted', () => {
  const commonContent = { language: 'en', userCase: { hyphenatedCaseRef: '1234-5678-9012-3456' } } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.referenceNumber).toEqual(enContent.referenceNumber);
    expect(generatedContent.emailSentConfirmation).toEqual(enContent.emailSentConfirmation);
    expect(generatedContent.nextStep).toEqual(enContent.nextStep);
    expect(generatedContent.line1).toEqual(enContent.line1);
    expect(generatedContent.line2).toEqual(enContent.line2);
    expect(generatedContent.printApplication).toEqual(enContent.printApplication);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.referenceNumber).toEqual(cyContent.referenceNumber);
    expect(generatedContent.emailSentConfirmation).toEqual(cyContent.emailSentConfirmation);
    expect(generatedContent.nextStep).toEqual(cyContent.nextStep);
    expect(generatedContent.line1).toEqual(cyContent.line1);
    expect(generatedContent.line2).toEqual(cyContent.line2);
    expect(generatedContent.printApplication).toEqual(cyContent.printApplication);
  });
});
