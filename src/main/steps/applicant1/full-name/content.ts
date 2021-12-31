import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: 'Primary applicant',
  label: "What's your full name?",
  hint: 'Your full name',
  errors: {
    applicant1FullName: {
      required: 'Enter your full name',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Primary applicant (in Welsh)',
  label: "What's your full name? (in Welsh)",
  hint: 'Your full name (in Welsh)',
  errors: {
    applicant1FullName: {
      required: 'Enter your full name (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1FullName: {
      type: 'input',
      label: l => l.label,
      hint: l => l.hint,
      labelSize: 'l',
      classes: 'govuk-input--width-20',
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
