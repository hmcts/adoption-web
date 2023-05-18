import { FieldPrefix } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  otherNamesFields,
  form as otherNamesForm,
  generateContent as otherNamesGenerateContent,
} from '../../common/components/other-names';

const en = () => ({
  section: 'Second applicant',
});

const cy: typeof en = () => ({
  section: 'Ail geisydd',
});

export const form: FormContent = {
  ...otherNamesForm,
  fields: userCase => otherNamesFields(userCase, FieldPrefix.APPLICANT2, currentLanguage),
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const otherNamesContent = otherNamesGenerateContent(content, FieldPrefix.APPLICANT2);
  const translations = languages[content.language]();
  return {
    ...otherNamesContent,
    ...translations,
  };
};

const currentLanguage: string = generateContent[1];
