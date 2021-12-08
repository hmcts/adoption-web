import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

const en = () => {
  const addressPostcode = {
    required: 'You have not entered your postcode. Enter your postcode before continuing.',
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    notSelected: 'You have not selected your address. Select your address from the list before continuing.',
  };

  return {
    section: 'Primary applicant',
    title: "What's your home address?",
    enterPostcode: 'Enter a UK postcode',
    buildingStreet: 'Building and street',
    town: 'Town or city',
    county: 'County',
    postcode: 'Postcode',
    errors: {
      applicant1Address1: {
        required:
          'You have not entered your building and street address. Enter your building and street address before continuing.',
      },
      applicant1AddressTown: {
        required: 'You have not entered your town or city. Enter your town or city before continuing.',
      },
      addressPostcode,
      applicant1AddressPostcode: addressPostcode,
      applicant1AddressCountry: {
        required: 'You have not entered your country. Enter your country before continuing.',
      },
    },
  };
};

const cy = () => {
  const addressPostcode = {
    required: 'You have not entered your postcode. Enter your postcode before continuing. (in welsh)',
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing. (in welsh)',
    notSelected: 'You have not selected your address. Select your address from the list before continuing. (in welsh)',
  };

  return {
    title: 'Enter your postal address (in welsh)',
    enterPostcode: 'Enter a UK postcode (in welsh)',
    buildingStreet: 'Building and street (in welsh)',
    line1: 'Address line 1 (in welsh)',
    line2Optional: 'Address line 2 (optional) (in welsh)',
    line3Optional: 'Address line 3 (optional) (in welsh)',
    town: 'Town or city (in welsh)',
    townOptional: 'Town or city (optional) (in welsh)',
    county: 'County (in welsh)',
    countyOptional: 'County, district, state or province (optional) (in welsh)',
    postcode: 'Postcode (in welsh)',
    postcodeOptional: 'Postal code, zip code or area code (optional) (in welsh)',
    country: 'Country (in welsh)',
    findAddress: 'Find address (in welsh)',
    notUK: 'I cannot enter a UK postcode (in welsh)',
    enterUkPostcode: 'Enter UK postcode (in welsh)',
    selectAddress: 'Select an address (in welsh)',
    addressesFound: (addressesFound: number) =>
      `${addressesFound} address${addressesFound !== 1 ? 'es' : ''} found (in welsh)`,
    cannotFindAddress: 'I cannot find the address in the list (in welsh)',
    errors: {
      applicant1Address1: {
        required:
          'You have not entered your building and street address. Enter your building and street address before continuing. (in welsh)',
      },
      applicant1AddressTown: {
        required: 'You have not entered your town or city. Enter your town or city before continuing. (in welsh)',
      },
      addressPostcode,
      applicant1AddressPostcode: addressPostcode,
      applicant1AddressCountry: {
        required: 'You have not entered your country. Enter your country before continuing. (in welsh)',
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1Address1: {
      id: 'address1',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.buildingStreet,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1Address2: {
      id: 'address2',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line2Optional,
      labelSize: null,
    },
    applicant1AddressTown: {
      id: 'addressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant1AddressCounty: {
      id: 'addressCounty',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    applicant1AddressPostcode: {
      id: 'addressPostcode',
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
