import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  section: "Check you're eligible to adopt",
  title: 'You cannot apply to adopt',
});

const cy = () => ({
  section: "Check you're eligible to adopt (in welsh)",
  title: 'You cannot apply to adopt (in welsh)',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
  };
};
