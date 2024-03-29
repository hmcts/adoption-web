import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

import { form as manualAddressForm, generateContent as manualAddressGenerateContent } from './address-manual';

const en = manualAddressContent => ({
  addressLine1: 'Address line 1',
  addressLine2: 'Address line 2 (optional)',
  addressLine3: 'Address line 3 (optional)',
  town: 'Town or city (optional)',
  county: 'County, district, state or province (optional)',
  postcode: 'Postcode, zip code or area code (optional)',
  country: 'Country',
  errors: {
    address1: manualAddressContent.errors.address1,
    addressCountry: {
      required: 'Enter the country',
    },
  },
});

const cy: typeof en = manualAddressContent => ({
  addressLine1: 'Llinell cyfeiriad 1',
  addressLine2: 'Llinell cyfeiriad 2 (dewisol)',
  addressLine3: 'Llinell cyfeiriad 3 (dewisol)',
  town: 'Tref neu ddinas (dewisol)',
  county: 'Sir, rhanbarth, gwladwriaeth neu dalaith (dewisol)',
  postcode: 'Cod post, cod zip neu god rhanbarth (dewisol)',
  country: 'Gwlad',
  errors: {
    address1: manualAddressContent.errors.address1,
    addressCountry: {
      required: 'Nac ydwdwch y wlad',
    },
  },
});

const manualAddressFormFields = manualAddressForm.fields as FormFields;
export const form: FormContent = {
  ...manualAddressForm,
  fields: {
    address1: manualAddressFormFields.address1,
    address2: manualAddressFormFields.address2,
    address3: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine3,
      labelSize: null,
    },
    addressTown: { ...manualAddressFormFields.addressTown, validator: undefined },
    addressCounty: manualAddressFormFields.addressCounty,
    addressPostcode: { ...manualAddressFormFields.addressPostcode, validator: undefined },
    addressCountry: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.country,
      labelSize: null,
      validator: isFieldFilledIn,
    },
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const manualAddressContent = manualAddressGenerateContent(content);
  const translations = languages[content.language](manualAddressContent);
  return {
    ...manualAddressContent,
    ...translations,
    form,
  };
};
