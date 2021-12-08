import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isInvalidPostcode } from '../../../app/form/validation';
import { APPLICANT_1_MANUAL_ADDRESS } from '../../../steps/urls';

const en = () => {
  const addressPostcode = {
    required: 'You have not entered your postcode. Enter your postcode before continuing.',
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
  };

  return {
    section: 'Primary applicant',
    title: "What's your home address?",
    line1: "We'll send all court papers to this address.",
    postcode: 'Postcode',
    findAddress: 'Find address',
    enterAddressManually: 'Or enter address manually',
    notUK: 'I cannot enter a UK postcode',
    enterUkPostcode: 'Enter UK postcode',
    errors: {
      applicant1AddressPostcode: addressPostcode,
    },
    manualAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
  };
};

const cy = () => {
  const addressPostcode = {
    required: 'You have not entered your postcode. Enter your postcode before continuing.',
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
  };

  return {
    title: 'Enter your postal address',
    enterPostcode: 'Enter a UK postcode',
    postcode: 'Postcode',
    findAddress: 'Find address',
    notUK: 'I cannot enter a UK postcode',
    enterUkPostcode: 'Enter UK postcode',
    errors: {
      applicant1AddressPostcode: addressPostcode,
    },
  };
};

// const uk = 'UK';
export const form: FormContent = {
  fields: {
    applicant1AddressPostcode: {
      id: 'addressPostcode',
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.postcode,
      labelSize: 'm',
      attributes: {
        maxLength: 14,
      },
      validator: isInvalidPostcode,
    },
  },
  submit: {
    text: l => l.findAddress,
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
