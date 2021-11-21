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
    title: 'Enter your postal address',
    enterPostcode: 'Enter a UK postcode',
    buildingStreet: 'Building and street',
    line1: 'Address line 1',
    line2Optional: 'Address line 2 (optional)',
    line3Optional: 'Address line 3 (optional)',
    town: 'Town or city',
    townOptional: 'Town or city (optional)',
    county: 'County',
    countyOptional: 'County, district, state or province (optional)',
    postcode: 'Postcode',
    postcodeOptional: 'Postal code, zip code or area code (optional)',
    country: 'Country',
    findAddress: 'Find address',
    notUK: 'I cannot enter a UK postcode',
    enterUkPostcode: 'Enter UK postcode',
    selectAddress: 'Select an address',
    addressesFound: (addressesFound: number) => `${addressesFound} address${addressesFound !== 1 ? 'es' : ''} found`,
    cannotFindAddress: 'I cannot find the address in the list',
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
    required: 'Nid ydych wedi nodi eich cod post. Nodwch eich cod post cyn parhau.',
    invalid: 'Nid ydych wedi nodi cod post DU dilys. Nodwch god post DU dilys cyn parhau.',
    notSelected: "Nid ydych wedi dewis eich cyfeiriad. Dewiswch eich cyfeiriad o'r rhestr cyn parhau.",
  };

  return {
    title: 'Nodwch eich cyfeiriad post',
    enterPostcode: 'Nodwch god post yn y DU',
    buildingStreet: 'Adeilad a stryd',
    line1: 'Llinell 1 y cyfeiriad',
    line2Optional: 'Llinell 2 y cyfeiriad (dewisol)',
    line3Optional: 'Llinell 3 y cyfeiriad (dewisol)',
    town: 'Tref neu ddinas',
    townOptional: 'Tref neu ddinas (dewisol)',
    county: 'Sir',
    countyOptional: 'Sir, ardal, gwladwriaeth neu dalaith (dewisol)',
    postcode: 'Cod post',
    postcodeOptional: 'Cod post, cod zip neu god ardal (dewisol)',
    country: 'Gwlad',
    findAddress: 'Dod o hyd i gyfeiriad',
    notUK: 'Ni allaf nodi cod post yn y DU',
    enterUkPostcode: 'Nodwch god post yn y DU',
    selectAddress: 'Dewiswch gyfeiriad',
    addressesFound: (addressesFound: number) =>
      `Wedi canfod ${addressesFound} ${addressesFound !== 1 ? 'gyfeiriad' : 'cyfeiriad'}`,
    cannotFindAddress: "Ni allaf ddod o hyd i'r cyfeiriad yn y rhestr",
    errors: {
      applicant1Address1: {
        required:
          "Nid ydych wedi nodi eich adeilad a'ch cyfeiriad stryd. Nodwch eich adeilad a'ch cyfeiriad stryd cyn parhau.",
      },
      applicant1AddressTown: {
        required: 'Nid ydych wedi nodi eich tref neu ddinas. Nodwch eich tref neu ddinas cyn parhau.',
      },
      addressPostcode,
      applicant1AddressPostcode: addressPostcode,
      applicant1AddressCountry: {
        required: 'Nid ydych wedi nodi eich gwlad. Nodwch eich gwlad cyn parhau.',
      },
    },
  };
};

const uk = 'UK';
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
    applicant1Address3: {
      id: 'address3',
      type: 'text',
      classes: 'govuk-label',
      label: l => l.line3Optional,
      labelSize: null,
    },
    applicant1AddressTown: {
      id: 'addressTown',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: (value, formData) => {
        if (formData.applicant1AddressCountry !== uk) {
          return;
        }
        return isFieldFilledIn(value);
      },
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
      validator: (value, formData) => {
        if (formData.applicant1AddressCountry !== uk) {
          return;
        }
        return isInvalidPostcode(value);
      },
    },
    applicant1AddressCountry: {
      id: 'addressCountry',
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.country,
      labelSize: null,
      validator: isFieldFilledIn,
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
