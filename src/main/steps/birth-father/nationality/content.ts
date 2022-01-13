import { FieldPrefix } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  nationalityFields,
  form as nationalityForm,
  generateContent as nationalityGenerateContent,
} from '../../common/components/nationality';
import { BIRTH_FATHER_NATIONALITY } from '../../urls';
import { SECTION, SECTION_IN_WELSH } from '../constants';

export const en = (): Record<string, unknown> => ({
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
});

export const cy = (): Record<string, unknown> => ({
  section: SECTION_IN_WELSH,
  label: "What is the nationality of the child's birth father? (in Welsh)",
  url: BIRTH_FATHER_NATIONALITY,
  errors: {
    [`${FieldPrefix.BIRTH_FATHER}Nationality`]: {
      required: "Select a nationality or 'Not sure' (in Welsh)",
      notSureViolation: "Select a nationality or 'Not sure' (in Welsh)",
    },
    addAnotherNationality: {
      required: 'This is not a valid entry (in Welsh)',
    },
  },
});

export const form: FormContent = {
  ...nationalityForm,
  fields: userCase => nationalityFields(userCase, FieldPrefix.BIRTH_FATHER),
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const nationalityContent = nationalityGenerateContent(content, FieldPrefix.BIRTH_FATHER);
  const translations = languages[content.language]();
  return {
    ...nationalityContent,
    ...translations,
  };
};
