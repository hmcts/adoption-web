import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../app/form/validation';

const en = () => {
  const invalid = 'You have entered an invalid character, like a number. Enter your name using letters only.';
  return {
    section: 'Primary applicant',
    title: "What's your occupation?",
    occupation:
      'Enter your full occupation. For example, ‘Secondary school teacher’ rather than just ‘Teacher’. If you’re self employed, say so. For example, ‘Self employed carpenter’.',
    errors: {
      applicant1Occupation: {
        required: 'You have not entered your occupation. Enter it before continuing.',
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
    title: "What's your occupation? (in Welsh)",
    occupation:
      'Enter your full occupation. For example, ‘Secondary school teacher’ rather than just ‘Teacher’. If you’re self employed, say so. For example, ‘Self employed carpenter’. (in Welsh)',
    errors: {
      applicant1Occupation: {
        required: 'You have not entered your occupation. Enter it before continuing. (in Welsh)',
        invalid,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1Occupation: {
      type: 'text',
      label: l => l.occupation,
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
  const warningText = {
    text: 'This information will appear on the adoption certificate.',
    iconFallbackText: 'Warning',
  };
  const details = {
    summaryText: "I'm not working at the moment",
    html: `If you’re unemployed, say what your occupation was when you were working. For example, 'Unemployed administrative assistant'.

    If you’re retired, say that you’re retired and what your occupation was when you were working. For example, ‘Retired hairdresser’.

    If you’re a full time parent, enter ‘Full time parent’.`,
  };
  return {
    warningText,
    details,
    ...translations,
    form,
  };
};
