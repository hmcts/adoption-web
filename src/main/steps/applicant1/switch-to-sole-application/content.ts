import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = ({ partner }) => ({
  title: 'Create a new application',
  newApplicationDisclaimer: `Your ${partner} will not be able to access the new application. They will receive an email confirming this.`,
  create: 'Create a new application',
  cancel: 'Cancel',
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.create,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
