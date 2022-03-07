import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  firstNames: 'First names',
  firstNamesHint: '(Include any given or middle names)',
  lastNames: 'Last names',
  lastNamesHint: '(Include surname or family names)',
});

export const cy = (): Record<string, unknown> => ({
  firstNames: 'First names (in Welsh)',
  firstNamesHint: '(Include any given or middle names) (in Welsh)',
  lastNames: 'Last names (in Welsh)',
  lastNamesHint: '(Include surname or family names) (in Welsh)',
});

export const form: FormContent = {
  fields: {
    firstNames: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.firstNames,
      hint: l => l.firstNamesHint,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    lastNames: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.lastNames,
      hint: l => l.lastNamesHint,
      labelSize: null,
      validator: isFieldFilledIn,
    },
  },
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
