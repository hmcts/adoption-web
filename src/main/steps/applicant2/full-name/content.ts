import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: 'Second applicant',
  title: "What's your full name?",
  firstNames: 'First names',
  firstHint: '(Include any given or middle names)',
  lastNames: 'Last names',
  lastHint: '(Include surname or family names)',
  errors: {
    applicant2FirstNames: {
      required: 'Enter your first names',
    },
    applicant2LastNames: {
      required: 'Enter your last names',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Ail geisydd',
  title: 'Beth yw eich enw llawn?',
  firstNames: 'Enwau cyntaf',
  firstHint: '(Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol)',
  lastNames: 'Cyfenwau',
  lastHint: '(Cofiwch gynnwys cyfenw neu enwau teuluol)',
  errors: {
    applicant2FirstNames: {
      required: 'Nac ydwdwch eich enw(au) cyntaf',
    },
    applicant2LastNames: {
      required: 'Nac ydwdwch eich cyfenw(au)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2FirstNames: {
      type: 'text',
      label: l => l.firstNames,
      hint: l => l.firstHint,
      labelSize: 'normal',
      validator: input => isFieldFilledIn(input),
    },
    applicant2LastNames: {
      type: 'text',
      label: l => l.lastNames,
      hint: l => l.lastHint,
      labelSize: 'normal',
      validator: input => isFieldFilledIn(input),
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
