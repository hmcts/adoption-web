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

import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CaseWithId, FieldPrefix } from '../../../app/case/case';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { nationalityFields } from '../../common/components/nationality';
import { BIRTH_FATHER_NATIONALITY } from '../../urls';
import { SECTION, SECTION_IN_WELSH } from '../constants';

import { form, generateContent } from './content';

const enContent = {
  section: SECTION,
  label: "What is the nationality of the child's birth father?",
  url: BIRTH_FATHER_NATIONALITY,
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
  label: 'Beth yw cenedligrwydd tad biolegol y plentyn?',
  url: BIRTH_FATHER_NATIONALITY,
  errors: {
    [`${FieldPrefix.BIRTH_FATHER}Nationality`]: {
      required: 'Dewiswch genedligrwydd neu ‘Ddim yn siŵr’',
      notSureViolation: 'Dewiswch genedligrwydd neu ‘Ddim yn siŵr’',
    },
    addAnotherNationality: {
      required: 'Nid yw hyn yn gofnod dilys',
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
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
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
