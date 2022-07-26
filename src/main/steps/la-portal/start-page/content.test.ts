import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  title: 'Getting started',
  heading1: 'Submitting a response to an adoption application',
  line3:
    'Use this service to complete an application form that has been submitted by the prospective adoptive parents. You can save your progress at any time however, you must submit the application within xxx days.',
  heading2: 'What you will need',
  line4: 'In order to complete the application and submit it to the court you will need:',
  line5: "child's full birth certificate",
  line6: 'marriage or civil partnership certificates of the applicants (if appropriate)',
  line7: 'death certificates of birth parents (if appropriate)',
  line8: 'last known addresses of the birth parents',
  line9: 'Certificates must be certified.',
  line10: 'You can also provide additional evidence such as:',
  line11: 'sealed or certified placement order for the child',
  line12: "any court orders for the child and/or child's siblings",
  line13: 'Annex A (if available)',
  line14: 'maintenance agreements or awards',
  line15:
    'two copies of photo ID of the applicants (passports, driving licences) including any immigration stamps on the pages',
  line16: 'any visas relating to the applicants if appropriate',
  line17:
    "You will be asked questions about the child's birth parents and siblings. You can review your answers to these questions before you submit the application.",
  heading3: 'Completing your response to the application',
  line18:
    'Any member of your team can access the application and add information. You should note that if two people access the application at the same time, whoever saves it may override information given by the other person.',
  line19: 'Completing and submitting your response to an application should not take longer than 30 minutes.',
};

const cyContent = {
  title: 'Getting started (in welsh)',
  heading1: 'Submitting a response to an adoption application (in welsh)',
  line3:
    'Use this service to complete an application form that has been submitted by the prospective adoptive parents. You can save your progress at any time however, you must submit the application within xxx days. (in welsh)',
  heading2: 'What you will need (in welsh)',
  line4: 'In order to complete the application and submit it to the court you will need: (in welsh)',
  line5: "child's full birth certificate (in welsh)",
  line6: 'marriage or civil partnership certificates of the applicants (if appropriate) (in welsh)',
  line7: 'death certificates of birth parents (if appropriate) (in welsh)',
  line8: 'last known addresses of the birth parents (in welsh)',
  line9: 'Certificates must be certified. (in welsh)',
  line10: 'You can also provide additional evidence such as: (in welsh)',
  line11: 'sealed or certified placement order for the child (in welsh)',
  line12: "any court orders for the child and/or child's siblings (in welsh)",
  line13: 'Annex A (if available) (in welsh)',
  line14: 'maintenance agreements or awards (in welsh)',
  line15:
    'two copies of photo ID of the applicants (passports, driving licences) including any immigration stamps on the pages (in welsh)',
  line16: 'any visas relating to the applicants if appropriate (in welsh)',
  line17:
    "You will be asked questions about the child's birth parents and siblings. You can review your answers to these questions before you submit the application. (in welsh)",
  heading3: 'Completing your response to the application (in welsh)',
  line18:
    'Any member of your team can access the application and add information. You should note that if two people access the application at the same time, whoever saves it may override information given by the other person. (in welsh)',
  line19:
    'Completing and submitting your response to an application should not take longer than 30 minutes. (in welsh)',
};

describe('eligibility > start > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
    // fee: {
    //   FeeCode: 'MOCK_CODE',
    //   FeeDescription: 'MOCK_DESCRIPTION',
    //   FeeVersion: 'MOCK_VERSION',
    //   FeeAmount: 'MOCK_AMOUNT',
    // },
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
