/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
const mockForm = {
  form: {
    fields: { birthFatherNationality: { MOCK_KEY: 'MOCK_VALUE' } },
    submit: { MOCK_SUBMIT_BUTTON: 'MOCK_SUBMIT_BUTTON' },
    saveAsDraft: { MOCK_SAVE_AS_DRAFT_BUTTON: 'MOCK_SAVE_AS_DRAFT_BUTTON' },
  },
  errors: { addAnotherNationality: 'MOCK_ERROR_MESSAGE' },
};
const mockNationalityFields = jest.fn().mockReturnValue(mockForm.form.fields);
jest.mock('../../common/components/nationality', () => {
  return { nationalityFields: mockNationalityFields, generateContent: jest.fn().mockReturnValue(mockForm) };
});

import { CaseWithId, FieldPrefix } from '../../../app/case/case';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { nationalityFields } from '../../common/components/nationality';
import { SECTION, SECTION_IN_WELSH } from '../constants';

import { form, generateContent } from './content';

const enContent = {
  section: SECTION,
  label: "What is the nationality of the child's birth father?",
  errors: {
    [`${FieldPrefix.BIRTH_FATHER}Nationality`]: {
      required: "Select a nationality or 'Not sure'",
      notSureViolation: "Select a nationality or 'Not sure'",
    },
    addAnotherNationality: {
      required: 'This is not a valid entry',
    },
  },
};

const cyContent = {
  section: SECTION_IN_WELSH,
  label: "What is the nationality of the child's birth father? (in Welsh)",
  errors: {
    [`${FieldPrefix.BIRTH_FATHER}Nationality`]: {
      required: "Select a nationality or 'Not sure' (in Welsh)",
      notSureViolation: "Select a nationality or 'Not sure' (in Welsh)",
    },
    addAnotherNationality: {
      required: 'This is not a valid entry (in Welsh)',
    },
  },
};

describe('birthFather > nationality content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.errors).toEqual(enContent.errors);
    expect(generatedContent.url).toEqual('/birth-father/nationality');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.errors).toEqual(cyContent.errors);
    expect(generatedContent.url).toEqual('/birth-father/nationality');
  });

  test('should contain birthFatherNationality field', () => {
    const nationalityFormFields = nationalityFields({}, FieldPrefix.CHILDREN) as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.birthFatherNationality).toEqual(nationalityFormFields.birthFatherNationality);
  });

  test('should call nationalityFields when form.fields is called', () => {
    (form.fields as FormFieldsFn)({ userCase: {} } as Partial<CaseWithId>);
    expect(nationalityFields).toHaveBeenCalledWith({ userCase: {} }, FieldPrefix.BIRTH_FATHER);
  });

  it('should contain submit button', () => {
    expect((generatedContent.form as FormContent).submit).toEqual(mockForm.form.submit);
  });

  it('should contain saveAsDraft button', () => {
    expect((generatedContent.form as FormContent).saveAsDraft).toEqual(mockForm.form.saveAsDraft);
  });
});
