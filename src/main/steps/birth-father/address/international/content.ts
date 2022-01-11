import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as internationalAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-international';

const en = internationalAddressContent => ({
  section: "Birth father's details",
  title: "What is the birth father's last known address?",
  errors: {
    birthFatherAddress1: internationalAddressContent.errors.address1,
    birthFatherAddressCountry: internationalAddressContent.errors.addressCountry,
  },
});

const cy = internationalAddressContent => ({
  section: "Birth father's details (in welsh)",
  title: "What is the birth father's last known address? (in welsh)",
  errors: {
    birthFatherAddress1: internationalAddressContent.errors.address1,
    birthFatherAddressCountry: internationalAddressContent.errors.addressCountry,
  },
});

const internationalAddressFormFields = internationalAddressForm.fields as FormFields;
export const form: FormContent = {
  ...internationalAddressForm,
  fields: {
    birthFatherAddress1: internationalAddressFormFields.address1,
    birthFatherAddress2: internationalAddressFormFields.address2,
    birthFatherAddress3: internationalAddressFormFields.address3,
    birthFatherAddressTown: internationalAddressFormFields.addressTown,
    birthFatherAddressCounty: internationalAddressFormFields.addressCounty,
    birthFatherAddressPostcode: internationalAddressFormFields.addressPostcode,
    birthFatherAddressCountry: internationalAddressFormFields.addressCountry,
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
