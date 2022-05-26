import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';

const en = () => ({
  title: 'Your application has been saved',
  continueApplication: 'Continue with your application',
  signOut: 'Sign out',
});

const cy: typeof en = () => ({
  title: 'Your application has been saved (in welsh)',
  continueApplication: 'Continue with your application (in welsh)',
  signOut: 'Sign out (in welsh)',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continueApplication,
  },
  saveAsDraft: {
    text: l => l.signOut,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](),
  form,
});
