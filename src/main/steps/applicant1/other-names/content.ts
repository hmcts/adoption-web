import { FieldPrefix } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  otherNamesFields,
  form as otherNamesForm,
  generateContent as otherNamesGenerateContent,
} from '../../common/components/other-names';

export const en = (): Record<string, unknown> => ({
  section: 'First applicant',
});

export const cy = (): Record<string, unknown> => ({
  section: 'First applicant (in Welsh)',
});

export const form: FormContent = {
  ...otherNamesForm,
  fields: userCase => otherNamesFields(userCase, FieldPrefix.APPLICANT1),
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const otherNamesContent = otherNamesGenerateContent(content, FieldPrefix.APPLICANT1);
  const translations = languages[content.language]();
  return {
    ...otherNamesContent,
    ...translations,
  };
};
