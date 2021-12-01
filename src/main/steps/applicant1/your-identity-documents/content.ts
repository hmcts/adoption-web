import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  section: 'Applicant details',
  title: 'Please upload your identity documents',
});

const cy = () => ({
  section: 'Applicant details (in welsh)',
  title: 'Please upload your identity documents(in welsh)',
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
