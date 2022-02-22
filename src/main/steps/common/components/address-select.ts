import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isAddressSelected } from '../../../app/form/validation';

const getAddressItems = addresses => addresses.map((item, index) => ({ text: item.fullAddress, value: index }));

const en = content => {
  const addresses = content.addresses || [];
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
    line1:
      "We'll send all court papers to this address unless you advise us that you are happy to be served court orders by email.",
    postcode: 'Postcode',
    selectAddress: 'Select an address',
    cannotFindAddress: 'Or enter address manually',
    errors: {
      selectAddress: {
        notSelected: 'Select an address',
      },
    },
    items,
    changePostCodeUrl: '#',
    cantFindAddressUrl: '#',
  };
};

const cy = content => {
  const addresses = content.addresses || [];
  const items = [
    {
      attributes: { id: 'totalAddressesFound' },
      value: -1,
      text: `${addresses.length} address${addresses?.length !== 1 ? 'es' : ''} found (in welsh)`,
      selected: true,
    },
  ];

  items.push(...getAddressItems(addresses));

  return {
    line1:
      "We'll send all court papers to this address unless you advise us that you are happy to be served court orders by email. (in welsh)",
    postcode: 'Postcode (in welsh)',
    selectAddress: 'Select an address (in welsh)',
    cannotFindAddress: 'Or enter address manually (in welsh)',
    errors: {
      selectAddress: {
        notSelected: 'Select an address (in welsh)',
      },
    },
    items,
    changePostCodeUrl: '#',
    cantFindAddressUrl: '#',
  };
};

export const form: FormContent = {
  fields: {
    selectAddress: {
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
