import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

const en = () => ({
  section: 'First applicant',
  label: 'Address changed',
  hint: 'Your address has now been changed.',
});

const cy: typeof en = () => ({
  section: 'First applicant (in welsh)',
  label: 'Address changed (in welsh)',
  hint: 'Your address has now been changed. (in welsh)',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
