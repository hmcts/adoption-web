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

export const en = ({ userCase }: CommonContent): Record<string, unknown> => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant';
  return { section };
};

export const cy: typeof en = ({ userCase }: CommonContent) => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Ceisydd' : 'Ceisydd cyntaf';
  return { section };
};

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
  const translations = languages[content.language](content);
  return {
    ...otherNamesContent,
    ...translations,
  };
};
