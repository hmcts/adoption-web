import { FieldPrefix } from '../../../app/case/case';
import { PageContent, TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  nationalityFields,
  form as nationalityForm,
  generateContent as nationalityGenerateContent,
} from '../../common/components/nationality';
import { CHILDREN_NATIONALITY } from '../../urls';

export const en = (nationalityContent: PageContent): Record<string, unknown> => ({
  section: "The child's details",
  label: 'What is their nationality?',
  errors: {
    childrenNationality: {
      required: "Select a nationality or 'Not sure'",
      notSureViolation: "Select a nationality or 'Not sure'",
    },
    addAnotherNationality: (nationalityContent.errors as Record<string, unknown>).addAnotherNationality,
  },
  url: CHILDREN_NATIONALITY,
});

export const cy = (nationalityContent: PageContent): Record<string, unknown> => ({
  section: 'Manylion y plentyn',
  label: 'Beth yw eu cenedligrwydd?',
  errors: {
    childrenNationality: {
      required: 'Dewiswch genedligrwydd neu ‘Ddim yn siŵr’',
      notSureViolation: 'Dewiswch genedligrwydd neu ‘Ddim yn siŵr’',
    },
    addAnotherNationality: (nationalityContent.errors as Record<string, unknown>).addAnotherNationality,
  },
  url: CHILDREN_NATIONALITY,
});

export const form: FormContent = {
  ...nationalityForm,
  fields: userCase => nationalityFields(userCase, FieldPrefix.CHILDREN),
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const nationalityContent = nationalityGenerateContent(content, FieldPrefix.CHILDREN);
  const translations = languages[content.language](nationalityContent);
  return {
    ...nationalityContent,
    ...translations,
  };
};
