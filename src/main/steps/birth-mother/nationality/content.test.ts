/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
const mockForm = {
  form: {
    fields: { birthMotherNationality: { MOCK_KEY: 'MOCK_VALUE' } },
    submit: { MOCK_SUBMIT_BUTTON: 'MOCK_SUBMIT_BUTTON' },
    saveAsDraft: { MOCK_SAVE_AS_DRAFT_BUTTON: 'MOCK_SAVE_AS_DRAFT_BUTTON' },
  },
  errors: { addAnotherNationality: 'MOCK_ERROR_MESSAGE' },
};
const mockNationalityFields = jest.fn().mockReturnValue(mockForm.form.fields);
jest.mock('../../common/components/nationality', () => {
  return { nationalityFields: mockNationalityFields, generateContent: jest.fn().mockReturnValue(mockForm) };
});

import { FieldPrefix } from '../../../app/case/case';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { nationalityFields } from '../../common/components/nationality';

import { form, generateContent } from './content';

const enContent = {
  section: "Birth mother's details",
  label: "What is the nationality of the child's birth mother?",
  errors: {
    birthMotherNationality: {
      required: "Select a nationality or 'Not sure'",
      notSureViolation: "Select a nationality or 'Not sure'",
    },
  },
};

const cyContent = {
  section: "Birth mother's details (in welsh)",
  label: "What is the nationality of the child's birth mother? (in welsh)",
  errors: {
    birthMotherNationality: {
      required: "Select a nationality or 'Not sure' (in welsh)",
      notSureViolation: "Select a nationality or 'Not sure' (in welsh)",
    },
  },
};

describe('birth-mother > nationality > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.errors).toEqual({ ...enContent.errors, ...mockForm.errors });
    expect(generatedContent.url).toEqual('/birth-mother/nationality');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.errors).toEqual({ ...cyContent.errors, ...mockForm.errors });
    expect(generatedContent.url).toEqual('/birth-mother/nationality');
  });

  test('should contain birthMotherNationality field', () => {
    const nationalityFormFields = nationalityFields({}, FieldPrefix.BIRTH_MOTHER) as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.birthMotherNationality).toEqual(nationalityFormFields.birthMotherNationality);
  });

  test('should call nationalityFields when form.fields is called', () => {
    (form.fields as FormFieldsFn)(commonContent.userCase!);
    expect(nationalityFields).toHaveBeenCalledWith(commonContent.userCase, FieldPrefix.BIRTH_MOTHER);
  });

  it('should contain submit button', () => {
    expect((generatedContent.form as FormContent).submit).toEqual(mockForm.form.submit);
  });

  it('should contain saveAsDraft button', () => {
    expect((generatedContent.form as FormContent).saveAsDraft).toEqual(mockForm.form.saveAsDraft);
  });
});
