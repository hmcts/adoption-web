import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { generateContent } from '../../steps/application-submitted/content';
import { CommonContent } from '../common/common.content';

const enContent = {
  title: 'Application Submitted',
  referenceNumber: 'Your reference number<br><strong>1234567890123456</strong>',
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
  title: 'Cais wedi’i gyflwyno',
  referenceNumber: 'Eich cyfeirnod<br><strong>1234567890123456</strong>',
  emailSentConfirmation:
    'Rydym wedi anfon neges gadarnhau drwy e-bost. Os nad ydych wedi cael y neges hon, dylech wirio eich ffolder sothach neu spam.',
  nextStep: 'Beth fydd yn digwydd nesaf',
  line1:
    'Mae’r llys yn adolygu eich cais ac yn hysbysu’r rhieni biolegol, os yw’n berthnasol, am eich cais i fabwysiadu. Mae eich manylion personol yn cael eu cadw’n gwbl gyfrinachol.',
  line2:
    'Unwaith bydd y gorchymyn mabwysiadu yn cael ei gymeradwyo, bydd tystysgrif mabwysiadu yn cael ei chreu. Bydd hon yn disodli tystysgrif geni’r plentyn. Gellir ei archebu o’r Swyddfa Gofrestru Gyffredinol am ffi fechan.',
  printApplication: 'Argraffu eich cais',
};

describe('application submmitted', () => {
  const commonContent = { language: 'en', userCase: { hyphenatedCaseRef: '1234567890123456' } } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
