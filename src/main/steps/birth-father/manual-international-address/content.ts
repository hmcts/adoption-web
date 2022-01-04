import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { SECTION, SECTION_IN_WELSH } from '../constants';

export const en = (): Record<string, unknown> => ({
  section: SECTION,
  title: 'title',
  errors: {},
});

export const cy = (): Record<string, unknown> => ({
  section: SECTION_IN_WELSH,
  title: 'title (in Welsh)',
  errors: {},
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

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](),
  form,
});
