import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  title: 'Your application has been saved',
  signBackAndContinue: 'Sign back in and continue',
});

const cy: typeof en = () => ({
  title: 'Mae eich cais wedi cael ei gadw',
  signBackAndContinue: 'Mewngofnodwch yn ôl a pharhau',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.signBackAndContinue,
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
