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

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FieldPrefix } from '../../../app/case/case';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { nationalityFields } from '../../common/components/nationality';
import { BIRTH_FATHER_NATIONALITY } from '../../urls';

import { form, generateContent } from './content';

const enContent = {
  section: "Birth father's details",
  title: "What is the nationality of the child's birth father?",
  hint: 'Select all options that are relevant.',
  errors: {
    birthFatherNationality: {
      required: 'Select if they are British, Irish, citizen of a different country or not sure',
      notSureViolation: "Select a nationality or 'Not sure'",
      addButtonNotClicked: "Select 'Add' before you continue",
    },
    addAnotherNationality: 'MOCK_ERROR_MESSAGE',
  },
  url: BIRTH_FATHER_NATIONALITY,
};

const cyContent = {
  section: 'Manylion y tad genedigol',
  title: 'Beth yw cenedligrwydd tad genedigol y plentyn?',
  hint: 'Dewiswch bob opsiwn sy’n berthnasol i chi.',
  errors: {
    birthFatherNationality: {
      required: "Dewiswch os ydyn nhw'n Brydeinig, Gwyddelig, dinesydd gwlad wahanol neu ddim yn siŵr",
      notSureViolation: 'Dewiswch genedligrwydd neu ‘Ddim yn siŵr’',
      addButtonNotClicked: 'Dewiswch ‘Ychwanegu’ cyn ichi symud ymlaen',
    },
    addAnotherNationality: 'MOCK_ERROR_MESSAGE',
  },
  url: BIRTH_FATHER_NATIONALITY,
};

describe('birth-father > nationality > content', () => {
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

  test('should contain birthFatherNationality field', () => {
    const nationalityFormFields = nationalityFields({}, FieldPrefix.BIRTH_FATHER, 'en') as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.birthFatherNationality).toEqual(nationalityFormFields.birthFatherNationality);
  });

  test('should call nationalityFields when form.fields is called', () => {
    (form.fields as FormFieldsFn)(commonContent.userCase!);
    expect(nationalityFields).toHaveBeenCalledWith(
      commonContent.userCase,
      FieldPrefix.BIRTH_FATHER,
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
