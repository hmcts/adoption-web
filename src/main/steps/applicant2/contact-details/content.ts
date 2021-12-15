import { ContactDetails } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Second applicant',
  label: 'What are your contact details?',
  hint: 'This is so we can contact you with updates or questions about your application.',
  emailAddress: 'Email address',
  phoneNumber: 'UK phone number (for phone calls)',
  errors: {
    applicant2ContactDetails: {
      required: 'Enter your telephone number or email address',
    },
    applicant2EmailAddress: {
      required: 'Enter an email address in the correct format, like name@example.com',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    applicant2PhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
  },
});

const cy = () => ({
  section: 'Second applicant (in welsh)',
  label: 'What are your contact details? (in welsh)',
  hint: 'This is so we can contact you with updates or questions about your application. (in welsh)',
  emailAddress: 'Email address (in welsh)',
  phoneNumber: 'UK phone number (for phone calls) (in welsh)',
  errors: {
    applicant2ContactDetails: {
      required: 'Enter your telephone number or email address (in welsh)',
    },
    applicant2EmailAddress: {
      required: 'Enter an email address in the correct format, like name@example.com (in welsh)',
      invalid: 'Enter an email address in the correct format, like name@example.com (in welsh)',
    },
    applicant2PhoneNumber: {
      required: 'Enter a UK telephone number (in welsh)',
      invalid: 'Enter a UK telephone number (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2ContactDetails: {
      type: 'checkboxes',
      label: l => l.label,
      labelSize: 'l',
      section: l => l.section,
      hint: l => l.hint,
      values: [
        {
          name: 'applicant2ContactDetails',
          label: l => l.emailAddress,
          value: ContactDetails.EMAIL,
          subFields: {
            applicant2EmailAddress: {
              type: 'text',
              classes: 'govuk-input--width-20',
              label: '',
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isEmailValid(value),
            },
          },
        },
        {
          name: 'applicant2ContactDetails',
          label: l => l.phoneNumber,
          value: ContactDetails.PHONE,
          subFields: {
            applicant2PhoneNumber: {
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
