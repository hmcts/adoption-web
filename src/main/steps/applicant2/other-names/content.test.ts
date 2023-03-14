const mockForm = {
  form: {
    fields: { applicant2HasOtherNames: { MOCK_KEY: 'MOCK_VALUE' } },
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
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { otherNamesFields } from '../../common/components/other-names';

import { form, generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Second applicant',
};

const cyContent = {
  section: 'Ail geisydd',
};

describe('applicant2 > other-names > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain applicant2HasOtherNames field', () => {
    const otherNamesFormFields = otherNamesFields({}, FieldPrefix.APPLICANT2, 'en') as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.applicant2HasOtherNames).toEqual(otherNamesFormFields.applicant2HasOtherNames);
  });

  test('should call otherNamesFields when form.fields is called', () => {
    (form.fields as FormFieldsFn)(commonContent.userCase!);
    expect(otherNamesFields).toHaveBeenCalledWith(
      commonContent.userCase,
      FieldPrefix.APPLICANT2,
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
