import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

const en = () => ({
  section: 'Primary applicant',
  title: "What's your home address?",
  buildingStreet: 'Building and street',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  errors: {
    applicant1Address1: {
      required: 'Enter your building and street address before continuing.',
    },
    applicant1AddressTown: {
      required: 'Enter your town or city before continuing.',
    },
    applicant1AddressPostcode: {
      required: 'You have not entered your postcode. Enter your postcode before continuing.',
      invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    },
  },
});

const cy = () => ({
  section: 'Primary applicant (in welsh)',
  title: "What's your home address? (in welsh)",
  buildingStreet: 'Building and street (in welsh)',
  town: 'Town or city (in welsh)',
  county: 'County (in welsh)',
  postcode: 'Postcode (in welsh)',
  errors: {
    applicant1Address1: {
      required: 'Enter your building and street address before continuing. (in welsh)',
    },
    applicant1AddressTown: {
      required: 'Enter your town or city before continuing. (in welsh)',
    },
    applicant1AddressPostcode: {
      required: 'You have not entered your postcode. Enter your postcode before continuing. (in welsh)',
      invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing. (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1Address1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.buildingStreet,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1Address2: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line2Optional,
      labelSize: null,
    },
    applicant1AddressTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1AddressCounty: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    applicant1AddressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.postcode,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: isInvalidPostcode,
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
