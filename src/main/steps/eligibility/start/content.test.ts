import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  title: 'Apply to adopt a child placed in your care',
  line1:
    'You can apply to adopt a child who\'s in your care following a <a class="govuk-link" href="/eligibility/start">court placement order.</a>',
  line2:
    'You can start your application at any time however, the child must have lived with you for at least 10 weeks before you can submit it.',
  line3:
    "You can save your progress in the application by selecting 'save as draft'. This saves your answers so you can continue working on the application at a later date. You can only submit once all sections are complete.",
  heading1: 'Before you start',
  subheading1: 'Details about you',
  line4: 'You need to provide details about yourself and any second applicant.',
  line5:
    "Some of the information is needed for the Adoption Register and adoption certificate which will replace the child's birth certificate.",
  line6:
    "You will be asked for information that is on the child's placement order. This includes the name of the local authority who placed the child in your care and the court which made the order. Your social worker or adoption agency will have this information.",
  line7: 'Your personal information does not affect your application to adopt.',
  line8: 'The information you provide is only seen by the court and relevant adoption agencies or authorities.',
  subheading2: 'What to expect',
  line9:
    'Your local authority will provide details about the child you wish to adopt. This includes information about their birth parents and any siblings.',
  line10:
    'The court processing fee for an application is £MOCK_AMOUNT. Payment is due once the application is complete and ready to submit to the court.',
  line11:
    'Once you submit your application, it can take up to 6 weeks before the court contacts you about a first hearing date. You do not have to attend any of the hearing dates.',
  line12: 'Updates are sent via email, or post if this is preferable.',
};

const cyContent = {
  title: 'Apply to adopt a child placed in your care (in welsh)',
  line1:
    'You can apply to adopt a child who\'s in your care following a <a class="govuk-link" href="/eligibility/start">court placement order.</a> (in welsh)',
  line2:
    'You can start your application at any time however, the child must have lived with you for at least 10 weeks before you can submit it. (in welsh)',
  line3:
    "You can save your progress in the application by selecting 'save as draft'. This saves your answers so you can continue working on the application at a later date. You can only submit once all sections are complete. (in welsh)",
  heading1: 'Before you start (in welsh)',
  subheading1: 'Details about you (in welsh)',
  line4: 'You need to provide details about yourself and any second applicant. (in welsh)',
  line5:
    "Some of the information is needed for the Adoption Register and adoption certificate which will replace the child's birth certificate. (in welsh)",
  line6:
    "You will be asked for information that is on the child's placement order. This includes the name of the local authority who placed the child in your care and the court which made the order. Your social worker or adoption agency will have this information. (in welsh)",
  line7: 'Your personal information does not affect your application to adopt. (in welsh)',
  line8:
    'The information you provide is only seen by the court and relevant adoption agencies or authorities. (in welsh)',
  subheading2: 'What to expect (in welsh)',
  line9:
    'Your local authority will provide details about the child you wish to adopt. This includes information about their birth parents and any siblings. (in welsh)',
  line10:
    'The court processing fee for an application is £MOCK_AMOUNT. Payment is due once the application is complete and ready to submit to the court. (in welsh)',
  line11:
    'Once you submit your application, it can take up to 6 weeks before the court contacts you about a first hearing date. You do not have to attend any of the hearing dates. (in welsh)',
  line12: 'Updates are sent via email, or post if this is preferable. (in welsh)',
};

describe('eligibility > start > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
    fee: {
      FeeCode: 'MOCK_CODE',
      FeeDescription: 'MOCK_DESCRIPTION',
      FeeVersion: 'MOCK_VERSION',
      FeeAmount: 'MOCK_AMOUNT',
    },
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
