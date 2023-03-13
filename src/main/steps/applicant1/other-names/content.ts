import { FieldPrefix } from '../../../app/case/case';
import { ApplyingWith } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';
import {
  otherNamesFields,
  form as otherNamesForm,
  generateContent as otherNamesGenerateContent,
} from '../../common/components/other-names';

const en = ({ userCase }: CommonContent) => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant';
  return { section };
};

const cy: typeof en = ({ userCase }: CommonContent) => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Ceisydd' : 'Ceisydd cyntaf';
  return { section };
};

export const form: FormContent = {
  ...otherNamesForm,
  fields: userCase => otherNamesFields(userCase, FieldPrefix.APPLICANT1, currentLanguage),
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const otherNamesContent = otherNamesGenerateContent(content, FieldPrefix.APPLICANT1);
  const translations = languages[content.language](content);
  return {
    ...otherNamesContent,
    ...translations,
  };
};

const currentLanguage: string = generateContent[1];
