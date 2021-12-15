import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../app/form/validation';

const en = () => ({
  section: 'Second applicant',
  title: "What's your home address?",
  buildingStreet: 'Building and street',
  town: 'Town or city',
  county: 'County',
  postcode: 'Postcode',
  errors: {
    applicant2Address1: {
      required: 'Enter the first line of the address',
    },
    applicant2AddressTown: {
      required: 'Enter the town or city',
    },
    applicant2AddressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
});

const cy = () => ({
  section: 'Second applicant (in welsh)',
  title: "What's your home address? (in welsh)",
  buildingStreet: 'Building and street (in welsh)',
  town: 'Town or city (in welsh)',
  county: 'County (in welsh)',
  postcode: 'Postcode (in welsh)',
  errors: {
    applicant2Address1: {
      required: 'Enter the first line of the address (in welsh)',
    },
    applicant2AddressTown: {
      required: 'Enter the town or city (in welsh)',
    },
    applicant2AddressPostcode: {
      required: 'Enter a valid postcode (in welsh)',
      invalid: 'Enter a valid postcode (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2Address1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.buildingStreet,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant2Address2: {
      type: 'text',
      classes: 'govuk-label',
      label: '',
      labelSize: null,
    },
    applicant2AddressTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicant2AddressCounty: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    applicant2AddressPostcode: {
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
