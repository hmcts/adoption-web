import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-manual';
import { SECTION, SECTION_IN_WELSH } from '../../constants';

const en = manualAddressContent => ({
  section: SECTION,
  title: "What is the other parent's last known address?",
  errors: {
    otherParentAddress1: manualAddressContent.errors.address1,
    otherParentAddressTown: manualAddressContent.errors.addressTown,
    otherParentAddressPostcode: manualAddressContent.errors.addressPostcode,
  },
});

const cy = manualAddressContent => ({
  section: SECTION_IN_WELSH,
  title: "What is the other parent's last known address? (in Welsh)",
  errors: {
    otherParentAddress1: manualAddressContent.errors.address1,
    otherParentAddressTown: manualAddressContent.errors.addressTown,
    otherParentAddressPostcode: manualAddressContent.errors.addressPostcode,
  },
});

const manualAddressFormFields = manualAddressForm.fields as FormFields;
export const form: FormContent = {
  ...manualAddressForm,
  fields: {
    otherParentAddress1: manualAddressFormFields.address1,
    otherParentAddress2: manualAddressFormFields.address2,
    otherParentAddressTown: manualAddressFormFields.addressTown,
    otherParentAddressCounty: manualAddressFormFields.addressCounty,
    otherParentAddressPostcode: manualAddressFormFields.addressPostcode,
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
