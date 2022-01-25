import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: 'Your adoption agency or local authority details',
  title: "Details about the child's social worker",
  line1: 'You can get these details from your adoption agency or local authority.',
  socialWorkerNameLabel: "Social worker's name",
  socialWorkerPhoneNumberLabel: "Social worker's phone number",
  socialWorkerEmailLabel: "Social worker's email address",
  socialWorkerTeamEmailLabel: "Social worker's team email address (if known)",
  errors: {
    socialWorkerName: {
      required: 'Enter a name',
    },
    socialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    socialWorkerEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Your adoption agency or local authority details (in Welsh)',
  label: "Details about the child's social worker (in Welsh)",
  hint: 'You can get these details from your adoption agency or local authority. (in Welsh)',
  socialWorkerName: "Social worker's name (in Welsh)",
  socialWorkerPhoneNumber: "Social worker's phone number (in Welsh)",
  socialWorkerEmail: "Social worker's email address (in Welsh)",
  socialWorkerTeamEmail: "Social worker's team email address (if known) (in Welsh)",
  errors: {
    socialWorkerName: {
      required: 'Enter a name (in Welsh)',
    },
    socialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number (in Welsh)',
      invalid: 'Enter a UK telephone number (in Welsh)',
    },
    socialWorkerEmail: {
      required: 'Enter an email address (in Welsh)',
      invalid: 'Enter an email address in the correct format, like name@example.com (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    socialWorkerName: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.socialWorkerNameLabel,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    socialWorkerPhoneNumber: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.socialWorkerPhoneNumberLabel,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    socialWorkerEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.socialWorkerEmailLabel,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    socialWorkerTeamEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.socialWorkerTeamEmailLabel,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isEmailValid(value),
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
