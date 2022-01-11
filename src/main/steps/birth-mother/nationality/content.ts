import { FieldPrefix } from '../../../app/case/case';
import { PageContent, TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  nationalityFields,
  form as nationalityForm,
  generateContent as nationalityGenerateContent,
} from '../../common/components/nationality';
import { BIRTH_MOTHER_NATIONALITY } from '../../urls';

export const en = (nationalityContent: PageContent): Record<string, unknown> => ({
  section: "Birth mother's details",
  label: "What is the nationality of the child's birth mother?",
  errors: {
    birthMotherNationality: {
      required: "Select a nationality or 'Not sure'",
      notSureViolation: "Select a nationality or 'Not sure'",
    },
    addAnotherNationality: (nationalityContent.errors as Record<string, unknown>).addAnotherNationality,
  },
  url: BIRTH_MOTHER_NATIONALITY,
});

export const cy = (nationalityContent: PageContent): Record<string, unknown> => ({
  section: "Birth mother's details (in welsh)",
  label: "What is the nationality of the child's birth mother? (in welsh)",
  errors: {
    birthMotherNationality: {
      required: "Select a nationality or 'Not sure' (in welsh)",
      notSureViolation: "Select a nationality or 'Not sure' (in welsh)",
    },
    addAnotherNationality: (nationalityContent.errors as Record<string, unknown>).addAnotherNationality,
  },
  url: BIRTH_MOTHER_NATIONALITY,
});

export const form: FormContent = {
  ...nationalityForm,
  fields: userCase => nationalityFields(userCase, FieldPrefix.BIRTH_MOTHER),
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const nationalityContent = nationalityGenerateContent(content, FieldPrefix.BIRTH_MOTHER);
  const translations = languages[content.language](nationalityContent);
  return {
    ...nationalityContent,
    ...translations,
  };
};
