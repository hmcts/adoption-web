import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isAddressSelected } from '../../../app/form/validation';
import { APPLICANT_1_FIND_ADDRESS, APPLICANT_1_MANUAL_ADDRESS } from '../../../steps/urls';

const en = content => {
  const addressPostcode = {
    required: 'You have not entered your postcode. Enter your postcode before continuing.',
    invalid: 'You have not entered a valid UK postcode. Enter a valid UK postcode before continuing.',
    notSelected: 'You have not selected your address. Select your address from the list before continuing.',
  };

  const items = [
    {
      attributes: { id: 'totalAddressesFound' },
      value: -1,
      text: `${content.addresses?.length} address${content.addresses?.length !== 1 ? 'es' : ''} found`,
      selected: true,
    },
  ];
  items.push(...content.addresses.map((item, index) => ({ text: item.fullAddress, value: index })));

  return {
    section: 'Primary applicant',
    title: "What's your home address?",
    line1: "We'll send all court papers to this address.",
    enterPostcode: 'Enter a UK postcode',
    postcode: 'Postcode',
    notUK: 'I cannot enter a UK postcode',
    enterUkPostcode: 'Enter UK postcode',
    selectAddress: 'Select an address',
    cannotFindAddress: 'I cannot find the address in the list',
    errors: {
      applicant1SelectAddress: addressPostcode,
    },
    items,
    changePostCodeUrl: APPLICANT_1_FIND_ADDRESS,
    cantFindAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
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

// const uk = 'UK';
export const form: FormContent = {
  fields: {
    applicant1SelectAddress: {
      type: 'select',
      label: l => l.selectAddress,
      labelSize: 'm',
      validator: isAddressSelected,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
