import { FieldPrefix } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  nationalityFields,
  form as nationalityForm,
  generateContent as nationalityGenerateContent,
} from '../../common/components/nationality';
import { APPLICANT_1_NATIONALITY } from '../../urls';

export const en = (): Record<string, unknown> => ({
  section: 'Primary applicant',
  url: APPLICANT_1_NATIONALITY,
});

export const cy = (): Record<string, unknown> => ({
  section: 'Primary applicant (in Welsh)',
  url: APPLICANT_1_NATIONALITY,
});

export const form: FormContent = {
  ...nationalityForm,
  fields: userCase => nationalityFields(userCase, FieldPrefix.APPLICANT1),
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const nationalityContent = nationalityGenerateContent(content, FieldPrefix.APPLICANT1);
  const translations = languages[content.language]();
  return {
    ...nationalityContent,
    ...translations,
  };
};
