import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Primary applicant',
  label: 'What are your contact details?',
  hint: 'This is so we can contact you with updates or questions about your application.',
  emailAddress: 'Email address',
  phoneNumber: 'UK phone number (for phone calls)',
  errors: {
    applicant1ContactDetails: {
      required: 'Enter your telephone number or email address',
    },
    applicant1EmailAddress: {
      required: 'Email is required',
      invalid: 'Email is invalid',
    },
    applicant1PhoneNumber: {
      required: 'Phone number is required',
      invalid: 'Phone number is invalid',
    },
  },
});

const cy = () => ({});

const ContactDetails = {
  EMAIL: 'email',
  PHONE: 'phone',
};

export const form: FormContent = {
  fields: {
    applicant1ContactDetails: {
      type: 'checkboxes',
      label: l => l.label,
      labelSize: 'l',
      section: l => l.section,
      hint: l => l.hint,
      values: [
        {
          name: 'applicant1ContactDetails',
          label: l => l.emailAddress,
          value: ContactDetails.EMAIL,
          subFields: {
            applicant1EmailAddress: {
              type: 'text',
              classes: 'govuk-input--width-20',
              label: '',
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isEmailValid(value),
            },
          },
        },
        {
          name: 'applicant1ContactDetails',
          label: l => l.phoneNumber,
          value: ContactDetails.PHONE,
          subFields: {
            applicant1PhoneNumber: {
              type: 'text',
              classes: 'govuk-input--width-20',
              label: '',
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
            },
          },
        },
      ],
      validator: atLeastOneFieldIsChecked,
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
