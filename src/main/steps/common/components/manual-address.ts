import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

const en = () => ({
  buildingStreet: 'Building and street',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  errors: {
    address1: {
      required: 'Enter the first line of the address',
    },
    addressTown: {
      required: 'Enter the town or city',
    },
    addressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
});

const cy = () => ({
  buildingStreet: 'Building and street (in welsh)',
  town: 'Town or city (in welsh)',
  county: 'County (in welsh)',
  postcode: 'Postcode (in welsh)',
  errors: {
    address1: {
      required: 'Enter the first line of the address (in welsh)',
    },
    addressTown: {
      required: 'Enter the town or city (in welsh)',
    },
    addressPostcode: {
      required: 'Enter a valid postcode (in welsh)',
      invalid: 'Enter a valid postcode (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    address1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.buildingStreet,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    address2: {
      type: 'text',
      classes: 'govuk-label',
      label: '',
      labelSize: null,
    },
    addressTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    addressCounty: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    addressPostcode: {
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
