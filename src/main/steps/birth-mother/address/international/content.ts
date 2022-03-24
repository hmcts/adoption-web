import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as internationalAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-international';

const en = internationalAddressContent => ({
  section: "Birth mother's details",
  title: "What is the birth mother's last known address?",
  errors: {
    birthMotherAddress1: internationalAddressContent.errors.address1,
    birthMotherAddressCountry: internationalAddressContent.errors.addressCountry,
  },
});

const cy = internationalAddressContent => ({
  section: 'Manylion y fam fiolegol',
  title: 'Beth yw cyfeiriad olaf hysbys y fam fiolegol?',
  errors: {
    birthMotherAddress1: internationalAddressContent.errors.address1,
    birthMotherAddressCountry: internationalAddressContent.errors.addressCountry,
  },
});

const internationalAddressFormFields = internationalAddressForm.fields as FormFields;
export const form: FormContent = {
  ...internationalAddressForm,
  fields: {
    birthMotherAddress1: internationalAddressFormFields.address1,
    birthMotherAddress2: internationalAddressFormFields.address2,
    birthMotherAddress3: internationalAddressFormFields.address3,
    birthMotherAddressTown: internationalAddressFormFields.addressTown,
    birthMotherAddressCounty: internationalAddressFormFields.addressCounty,
    birthMotherAddressPostcode: internationalAddressFormFields.addressPostcode,
    birthMotherAddressCountry: internationalAddressFormFields.addressCountry,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const internationalAddressContent = manualAddressGenerateContent(content);
  const translations = languages[content.language](internationalAddressContent);
  return {
    ...internationalAddressContent,
    ...translations,
    form,
  };
};
