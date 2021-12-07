import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../app/form/validation';

const en = () => {
  const invalid = 'You have entered an invalid character, like a number. Enter your name using letters only.';
  return {
    section: 'Primary applicant',
    title: "What's your full name?",
    fullName: 'Your full name',
    errors: {
      applicantFullName: {
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
    title: "What's your full name? (in Welsh)",
    fullName: 'Your full name (in Welsh)',
    errors: {
      applicantFullName: {
        required: 'You have not entered your full name. Enter it before continuing. (in Welsh)',
        invalid,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicantFullName: {
      type: 'text',
      label: l => l.fullName,
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
