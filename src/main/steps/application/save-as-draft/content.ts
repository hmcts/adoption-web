import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  title: 'Your application has been saved',
  continueApplication: 'Continue with your application',
  signOut: 'Sign out',
});

const cy: typeof en = () => ({
  title: ' Mae eich cais wedi cael ei gadw',
  continueApplication: 'Parhau â’ch cais',
  signOut: 'Allgofnodi',
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
