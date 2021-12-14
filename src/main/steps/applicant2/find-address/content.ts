import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isInvalidPostcode } from '../../../app/form/validation';
import { APPLICANT_2_MANUAL_ADDRESS } from '../../../steps/urls';

const en = () => ({
  section: 'Second applicant',
  title: "What's your home address?",
  line1: "We'll send all court papers to this address.",
  postcode: 'Postcode',
  findAddress: 'Find address',
  enterAddressManually: 'Or enter address manually',
  errors: {
    applicant2AddressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
  manualAddressUrl: APPLICANT_2_MANUAL_ADDRESS,
});

const cy = () => ({
  section: 'Second applicant (in welsh)',
  title: "What's your home address? (in welsh)",
  line1: "We'll send all court papers to this address. (in welsh)",
  postcode: 'Postcode (in welsh)',
  findAddress: 'Find address (in welsh)',
  enterAddressManually: 'Or enter address manually (in welsh)',
  errors: {
    applicant2AddressPostcode: {
      required: 'Enter a valid postcode (in welsh)',
      invalid: 'Enter a valid postcode (in welsh)',
    },
  },
  manualAddressUrl: APPLICANT_2_MANUAL_ADDRESS,
});

export const form: FormContent = {
  fields: {
    applicant2AddressPostcode: {
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
