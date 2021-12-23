import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: 'Primary applicant',
  title: "What's your full name?",
  applicant1FullName: 'Your full name',
  errors: {
    applicant1FullName: {
      required: 'You have not entered your full name. Enter it before continuing.',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Primary applicant (in Welsh)',
  title: "What's your full name? (in Welsh)",
  applicant1FullName: 'Your full name (in Welsh)',
  errors: {
    applicant1FullName: {
      required: 'You have not entered your full name. Enter it before continuing. (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1FullName: {
      type: 'input',
      label: l => l.applicant1FullName,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
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
