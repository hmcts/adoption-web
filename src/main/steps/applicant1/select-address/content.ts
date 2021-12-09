import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isAddressSelected } from '../../../app/form/validation';
import { APPLICANT_1_FIND_ADDRESS, APPLICANT_1_MANUAL_ADDRESS } from '../../../steps/urls';

const getAddressItems = addresses => addresses.map((item, index) => ({ text: item.fullAddress, value: index }));

const en = content => {
  const addresses = content.addresses;
  const items = [
    {
      attributes: { id: 'totalAddressesFound' },
      value: -1,
      text: `${addresses?.length} address${addresses?.length !== 1 ? 'es' : ''} found`,
      selected: true,
    },
  ];
  items.push(...getAddressItems(addresses));

  return {
    section: 'Primary applicant',
    title: "What's your home address?",
    line1: "We'll send all court papers to this address.",
    postcode: 'Postcode',
    selectAddress: 'Select an address',
    cannotFindAddress: 'I cannot find the address in the list',
    errors: {
      applicant1SelectAddress: {
        notSelected: 'Select an address',
      },
    },
    items,
    changePostCodeUrl: APPLICANT_1_FIND_ADDRESS,
    cantFindAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
  };
};

const cy = content => {
  const addresses = content.addresses;
  const items = [
    {
      attributes: { id: 'totalAddressesFound' },
      value: -1,
      text: `${addresses?.length} address${addresses?.length !== 1 ? 'es' : ''} found (in welsh)`,
      selected: true,
    },
  ];
  items.push(...getAddressItems(addresses));

  return {
    section: 'Primary applicant (in welsh)',
    title: "What's your home address? (in welsh)",
    line1: "We'll send all court papers to this address. (in welsh)",
    postcode: 'Postcode (in welsh)',
    selectAddress: 'Select an address (in welsh)',
    cannotFindAddress: 'I cannot find the address in the list (in welsh)',
    errors: {
      applicant1SelectAddress: {
        notSelected: 'Select an address (in welsh)',
      },
    },
    items,
    changePostCodeUrl: APPLICANT_1_FIND_ADDRESS,
    cantFindAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
  };
};

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
  saveAsDraft: {
    text: l => l.saveAsDraft,
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
