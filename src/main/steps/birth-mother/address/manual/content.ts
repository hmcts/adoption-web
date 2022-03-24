import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { BIRTH_MOTHER_INTERNATIONAL_ADDRESS } from '../../../../steps/urls';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-manual';

const en = manualAddressContent => ({
  section: "Birth mother's details",
  title: "What is the birth mother's last known address?",
  errors: {
    birthMotherAddress1: manualAddressContent.errors.address1,
    birthMotherAddressTown: manualAddressContent.errors.addressTown,
    birthMotherAddressPostcode: manualAddressContent.errors.addressPostcode,
  },
  internationalAddressUrl: BIRTH_MOTHER_INTERNATIONAL_ADDRESS,
});

const cy = manualAddressContent => ({
  section: 'Manylion y fam fiolegol',
  title: 'Beth yw cyfeiriad olaf hysbys y fam fiolegol?',
  errors: {
    birthMotherAddress1: manualAddressContent.errors.address1,
    birthMotherAddressTown: manualAddressContent.errors.addressTown,
    birthMotherAddressPostcode: manualAddressContent.errors.addressPostcode,
  },
  internationalAddressUrl: BIRTH_MOTHER_INTERNATIONAL_ADDRESS,
});

const manualAddressFormFields = manualAddressForm.fields as FormFields;
export const form: FormContent = {
  ...manualAddressForm,
  fields: {
    birthMotherAddress1: manualAddressFormFields.address1,
    birthMotherAddress2: manualAddressFormFields.address2,
    birthMotherAddressTown: manualAddressFormFields.addressTown,
    birthMotherAddressCounty: manualAddressFormFields.addressCounty,
    birthMotherAddressPostcode: manualAddressFormFields.addressPostcode,
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
