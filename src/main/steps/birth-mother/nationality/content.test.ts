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

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FieldPrefix } from '../../../app/case/case';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { nationalityFields } from '../../common/components/nationality';
import { BIRTH_MOTHER_NATIONALITY } from '../../urls';

import { form, generateContent } from './content';

const enContent = {
  section: "Birth mother's details",
  label: "What is the nationality of the child's birth mother?",
  hint: 'Select all options that are relevant.',
  errors: {
    birthMotherNationality: {
      required: 'Select if they are British, Irish, citizen of a different country or not sure',
      notSureViolation: "Select a nationality or 'Not sure'",
      addButtonNotClicked: "Select 'Add' before you continue",
    },
    addAnotherNationality: 'MOCK_ERROR_MESSAGE',
  },
  url: BIRTH_MOTHER_NATIONALITY,
};

const cyContent = {
  section: 'Manylion y fam fiolegol',
  label: 'Beth yw cenedligrwydd mam fiolegol y plentyn?',
  hint: 'Select all options that are relevant. (in welsh)',
  errors: {
    birthMotherNationality: {
      required: 'Select if they are British, Irish, citizen of a different country or not sure (in welsh)',
      notSureViolation: 'Dewiswch genedligrwydd neu ‘Ddim yn siŵr’',
      addButtonNotClicked: "Select 'Add' before you continue (in welsh)",
    },
    addAnotherNationality: 'MOCK_ERROR_MESSAGE',
  },
  url: BIRTH_MOTHER_NATIONALITY,
};

describe('birth-mother > nationality > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
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
