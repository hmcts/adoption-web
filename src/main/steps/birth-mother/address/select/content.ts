import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../common/components/address-select';
import { BIRTH_MOTHER_FIND_ADDRESS, BIRTH_MOTHER_MANUAL_ADDRESS } from '../../../urls';

const en = selectAddressContent => ({
  section: "Birth mother's details",
  title: "What is the birth mother's last known address?",
  line1: null,
  errors: {
    birthMotherSelectAddress: selectAddressContent.errors.selectAddress,
  },
  changePostCodeUrl: BIRTH_MOTHER_FIND_ADDRESS,
  cantFindAddressUrl: BIRTH_MOTHER_MANUAL_ADDRESS,
});

const cy: typeof en = selectAddressContent => ({
  section: 'Manylion y fam fiolegol',
  title: 'Beth yw cyfeiriad olaf hysbys y fam fiolegol?',
  line1: null,
  errors: {
    birthMotherSelectAddress: selectAddressContent.errors.selectAddress,
  },
  changePostCodeUrl: BIRTH_MOTHER_FIND_ADDRESS,
  cantFindAddressUrl: BIRTH_MOTHER_MANUAL_ADDRESS,
});

const selectAddressFormFields = selectAddressForm.fields as FormFields;
export const form: FormContent = {
  ...selectAddressForm,
  fields: {
    birthMotherSelectAddress: selectAddressFormFields.selectAddress,
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
