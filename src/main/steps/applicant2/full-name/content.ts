import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: 'Second applicant',
  title: "What's your full name?",
  applicant2FullName: 'Your full name',
  errors: {
    applicant2FullName: {
      required: 'You have not entered your full name. Enter it before continuing.',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Second applicant (in Welsh)',
  title: "What's your full name? (in Welsh)",
  applicant2FullName: 'Your full name (in Welsh)',
  errors: {
    applicant2FullName: {
      required: 'You have not entered your full name. Enter it before continuing. (in Welsh)',
      invalid: 'You have entered an invalid character, like a number. Enter your name using letters only. (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2FullName: {
      type: 'input',
      label: l => l.applicant2FullName,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: input => isFieldFilledIn(input) || isFieldLetters(input),
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
