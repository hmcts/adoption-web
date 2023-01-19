import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const enContent = {
  section: 'Second applicant',
  label: 'Address changed',
  changeApplicantText: 'Your address has now been changed',
};

const cyContent = {
  section: 'Second applicant (in welsh)',
  label: 'Address changed (in welsh)',
  changeApplicantText: 'Your address has now been changed (in welsh)',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > address > confirm-change > content', () => {
  const commonContent = { language: 'en', userCase: { changeAddressBothApplicants: 'No' } } as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });
});
/* eslint-enable @typescript-eslint/ban-types */
