import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { SECTION, SECTION_IN_WELSH } from '../../../../steps/birth-father/constants';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../common/components/address-select';
import { BIRTH_FATHER_ADDRESS_LOOKUP, BIRTH_FATHER_MANUAL_ADDRESS } from '../../../urls';

const en = selectAddressContent => ({
  section: SECTION,
  title: "What is the birth father's last known address?",
  errors: {
    birthFatherSelectAddress: selectAddressContent.errors.selectAddress,
  },
  changePostCodeUrl: BIRTH_FATHER_ADDRESS_LOOKUP,
  cantFindAddressUrl: BIRTH_FATHER_MANUAL_ADDRESS,
});

const cy = selectAddressContent => ({
  section: SECTION_IN_WELSH,
  title: "What is the birth father's last known address? (in Welsh)",
  errors: {
    birthFatherSelectAddress: selectAddressContent.errors.selectAddress,
  },
  changePostCodeUrl: BIRTH_FATHER_ADDRESS_LOOKUP,
  cantFindAddressUrl: BIRTH_FATHER_MANUAL_ADDRESS,
});

const selectAddressFormFields = selectAddressForm.fields as FormFields;
export const form: FormContent = {
  ...selectAddressForm,
  fields: {
    birthFatherSelectAddress: selectAddressFormFields.selectAddress,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const selectAddressContent = selectAddressGenerateContent(content);
  const translations = languages[content.language](selectAddressContent);
  return {
    ...selectAddressContent,
    ...translations,
    form,
  };
};
