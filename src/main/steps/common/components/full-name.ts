import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  firstNames: 'First names',
  firstNamesHint: '(Include any given or middle names)',
  lastNames: 'Last names',
  lastNamesHint: '(Include surname or family names)',
});

const cy: typeof en = () => ({
  firstNames: 'Enwau cyntaf',
  firstNamesHint: '(Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol)',
  lastNames: 'Cyfenwau',
  lastNamesHint: '(Cofiwch gynnwys cyfenw neu enwau teuluol)',
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
