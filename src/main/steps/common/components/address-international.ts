import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

import { form as manualAddressForm, generateContent as manualAddressGenerateContent } from './address-manual';

const en = manualAddressContent => ({
  addressLine1: 'Address line 1',
  addressLine2: 'Address line 2 (Optional)',
  addressLine3: 'Address line 3 (Optional)',
  town: 'Town or city (Optional)',
  county: 'County, district, state or province (Optional)',
  postcode: 'Postcode, zip code or area code (Optional)',
  country: 'Country',
  errors: {
    address1: manualAddressContent.errors.address1,
    addressCountry: {
      required: 'Enter the country',
    },
  },
});

const cy = manualAddressContent => ({
  addressLine1: 'Address line 1 (in welsh)',
  addressLine2: 'Address line 2 (Optional) (in welsh)',
  addressLine3: 'Address line 3 (Optional) (in welsh)',
  town: 'Town or city (Optional) (in welsh)',
  county: 'County, district, state or province (Optional) (in welsh)',
  postcode: 'Postcode, zip code or area code (Optional) (in welsh)',
  country: 'Country',
  errors: {
    address1: manualAddressContent.errors.address1,
    addressCountry: {
      required: 'Enter the country (in welsh)',
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
      classes: 'govuk-label govuk-!-width-two-thirds',
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
