/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
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

import { FieldPrefix } from '../../../app/case/case';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { otherNamesFields } from '../../common/components/other-names';

import { form, generateContent } from './content';

jest.mock('../../../app/form/validation');

const CY = 'cy';
const EN = 'en';

const enContent = {
  section: 'Second applicant',
};

const cyContent = {
  section: 'Second applicant (in Welsh)',
};

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
  const { section } = content;
  expect(generatedContent.section).toEqual(section);
};

describe('applicant2 > other-names > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent);
  });

  test('should contain applicant2HasOtherNames field', () => {
    const otherNamesFormFields = otherNamesFields({}, FieldPrefix.APPLICANT2) as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.applicant2HasOtherNames).toEqual(otherNamesFormFields.applicant2HasOtherNames);
  });

  test('should call otherNamesFields when form.fields is called', () => {
    (form.fields as FormFieldsFn)(commonContent.userCase!);
    expect(otherNamesFields).toHaveBeenCalledWith(commonContent.userCase, FieldPrefix.APPLICANT2);
  });

  it('should contain submit button', () => {
    expect((generatedContent.form as FormContent).submit).toEqual(mockForm.form.submit);
  });

  it('should contain saveAsDraft button', () => {
    expect((generatedContent.form as FormContent).saveAsDraft).toEqual(mockForm.form.saveAsDraft);
  });
});
