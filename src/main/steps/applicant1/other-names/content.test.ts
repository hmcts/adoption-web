const mockForm = {
  form: {
    fields: { applicant1HasOtherNames: { MOCK_KEY: 'MOCK_VALUE' } },
    submit: { MOCK_SUBMIT_BUTTON: 'MOCK_SUBMIT_BUTTON' },
    saveAsDraft: { MOCK_SAVE_AS_DRAFT_BUTTON: 'MOCK_SAVE_AS_DRAFT_BUTTON' },
  },
};
const mockOtherNamesFields = jest.fn().mockReturnValue(mockForm.form.fields);
jest.mock('../../common/components/other-names', () => {
  return { otherNamesFields: mockOtherNamesFields, generateContent: jest.fn().mockReturnValue(mockForm) };
});

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FieldPrefix } from '../../../app/case/case';
import { ApplyingWith } from '../../../app/case/definition';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { otherNamesFields } from '../../common/components/other-names';

import { form, generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'First applicant',
};

const cyContent = {
  section: 'Ceisydd cyntaf',
};

describe('applicant1 > other-names > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should set correct english title in case of applying alone', () => {
    const aloneCommonContent = { language: 'en', userCase: { applyingWith: ApplyingWith.ALONE } } as CommonContent;
    generatedContent = generateContent(aloneCommonContent);
    expect(generatedContent.section).toEqual('Applicant');
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should set correct welsh title in case of applying alone', () => {
    const aloneCommonContent = { language: 'cy', userCase: { applyingWith: ApplyingWith.ALONE } } as CommonContent;
    generatedContent = generateContent(aloneCommonContent);
    expect(generatedContent.section).toEqual('Ceisydd');
  });

  test('should contain applicant1HasOtherNames field', () => {
    const otherNamesFormFields = otherNamesFields({}, FieldPrefix.APPLICANT1, 'en') as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.applicant1HasOtherNames).toEqual(otherNamesFormFields.applicant1HasOtherNames);
  });

  test('should call otherNamesFields when form.fields is called', () => {
    (form.fields as FormFieldsFn)(commonContent.userCase!);
    expect(otherNamesFields).toHaveBeenCalledWith(
      commonContent.userCase,
      FieldPrefix.APPLICANT1,
      commonContent.language
    );
  });

  it('should contain submit button', () => {
    expect((generatedContent.form as FormContent).submit).toEqual(mockForm.form.submit);
  });

  it('should contain saveAsDraft button', () => {
    expect((generatedContent.form as FormContent).saveAsDraft).toEqual(mockForm.form.saveAsDraft);
  });
});
