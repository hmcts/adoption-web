import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: "What is the other parent's last known address?",
  buildingStreet: 'Building and street',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  errors: {
    otherPersonAddress1: {
      required: 'Enter the first line of the address',
    },
    otherPersonAddressTown: {
      required: 'Enter the town or city',
    },
    otherPersonAddressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  title: "What is the other parent's last known address? (in welsh)",
  buildingStreet: 'Building and street (in welsh)',
  town: 'Town or city (in welsh)',
  county: 'County (in welsh)',
  postcode: 'Postcode (in welsh)',
  errors: {
    otherPersonAddress1: {
      required: 'Enter the first line of the address (in welsh)',
    },
    otherPersonAddressTown: {
      required: 'Enter the town or city (in welsh)',
    },
    otherPersonAddressPostcode: {
      required: 'Enter a valid postcode (in welsh)',
      invalid: 'Enter a valid postcode (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    otherPersonAddress1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.buildingStreet,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    otherPersonAddress2: {
      type: 'text',
      classes: 'govuk-label',
      label: '',
      labelSize: null,
    },
    otherPersonAddressTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    otherPersonAddressCounty: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    otherPersonAddressPostcode: {
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
