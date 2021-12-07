import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../app/form/validation';

const en = () => {
  const invalid = 'You have entered an invalid character, like a number. Enter your name using letters only.';
  return {
    section: 'Primary applicant',
    title: 'What is your full name?',
    fullName: 'Your full name',
    errors: {
      applicant1FullName: {
        required: 'You have not entered your full name. Enter it before continuing.',
        invalid,
      },
    },
  };
};

const cy = () => {
  const invalid =
    'You have entered an invalid character, like a number. Enter your name using letters only. (in Welsh)';
  return {
    section: 'Primary applicant (in Welsh)',
    title: 'What is your full name? (in Welsh)',
    FullName: 'Your full name (in Welsh)',
    errors: {
      applicant1FullName: {
        required: 'You have not entered your full name. Enter it before continuing. (in Welsh)',
        invalid,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1FullName: {
      type: 'text',
      label: l => l.FullName,
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
