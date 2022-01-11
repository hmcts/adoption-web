import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { BIRTH_FATHER_ADDRESS_INTERNATIONAL } from '../../../../steps/urls';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-manual';

const en = manualAddressContent => ({
  section: "Birth father's details",
  title: "What is the birth father's last known address?",
  errors: {
    birthFatherAddress1: manualAddressContent.errors.address1,
    birthFatherAddressTown: manualAddressContent.errors.addressTown,
    birthFatherAddressPostcode: manualAddressContent.errors.addressPostcode,
  },
  internationalAddressUrl: BIRTH_FATHER_ADDRESS_INTERNATIONAL,
});

const cy = manualAddressContent => ({
  section: "Birth father's details (in welsh)",
  title: "What is the birth father's last known address? (in welsh)",
  errors: {
    birthFatherAddress1: manualAddressContent.errors.address1,
    birthFatherAddressTown: manualAddressContent.errors.addressTown,
    birthFatherAddressPostcode: manualAddressContent.errors.addressPostcode,
  },
  internationalAddressUrl: BIRTH_FATHER_ADDRESS_INTERNATIONAL,
});

const manualAddressFormFields = manualAddressForm.fields as FormFields;
export const form: FormContent = {
  ...manualAddressForm,
  fields: {
    birthFatherAddress1: manualAddressFormFields.address1,
    birthFatherAddress2: manualAddressFormFields.address2,
    birthFatherAddressTown: manualAddressFormFields.addressTown,
    birthFatherAddressCounty: manualAddressFormFields.addressCounty,
    birthFatherAddressPostcode: manualAddressFormFields.addressPostcode,
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
