import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { SECTION, SECTION_IN_WELSH } from '../../../../steps/birth-father/constants';
import { BIRTH_FATHER_INTERNATIONAL_ADDRESS } from '../../../../steps/urls';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-manual';

const en = manualAddressContent => ({
  section: SECTION,
  title: "What is the birth father's last known address?",
  errors: {
    birthFatherAddress1: manualAddressContent.errors.address1,
    birthFatherAddressTown: manualAddressContent.errors.addressTown,
    birthFatherAddressPostcode: manualAddressContent.errors.addressPostcode,
  },
  internationalAddressUrl: BIRTH_FATHER_INTERNATIONAL_ADDRESS,
});

const cy = manualAddressContent => ({
  section: SECTION_IN_WELSH,
  title: "What is the birth father's last known address? (in Welsh)",
  errors: {
    birthFatherAddress1: manualAddressContent.errors.address1,
    birthFatherAddressTown: manualAddressContent.errors.addressTown,
    birthFatherAddressPostcode: manualAddressContent.errors.addressPostcode,
  },
  internationalAddressUrl: BIRTH_FATHER_INTERNATIONAL_ADDRESS,
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
