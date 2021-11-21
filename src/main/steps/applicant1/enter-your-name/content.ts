import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../app/form/validation';

const en = () => {
  const invalid = 'You have entered an invalid character, like a number. Enter your name using letters only.';
  return {
    title: 'Enter your name',
    line1: 'The court needs to know your full name.',
    firstNames: 'Your first name(s)',
    middleNames: 'Your middle name(s)',
    lastNames: 'Your last name(s)',
    errors: {
      applicant1FirstNames: {
        required: 'You have not entered your first name. Enter it before continuing.',
        invalid,
      },
      applicant1MiddleNames: {
        invalid,
      },
      applicant1LastNames: {
        required: 'You have not entered your last name. Enter it before continuing.',
        invalid,
      },
    },
  };
};

// @TODO translations
const cy = en;

export const form: FormContent = {
  fields: {
    applicant1FirstNames: {
      type: 'text',
      label: l => l.firstNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: input => isFieldFilledIn(input) || isFieldLetters(input),
    },
    applicant1MiddleNames: {
      type: 'text',
      label: l => l.middleNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: isFieldLetters,
    },
    applicant1LastNames: {
      type: 'text',
      label: l => l.lastNames,
      labelSize: 'normal',
      classes: 'govuk-input--width-20',
      validator: input => isFieldFilledIn(input) || isFieldLetters(input),
    },
  },
  submit: {
    text: l => l.continue,
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
