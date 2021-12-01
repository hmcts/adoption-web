import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  section: 'Applicant details',
  title: 'Date child moved in?',
});

const cy = () => ({
  section: 'Applicant details (in welsh)',
  title: 'Date child moved in?(in welsh)',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
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
