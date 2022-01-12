import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as internationalAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-international';
import { SECTION, SECTION_IN_WELSH } from '../../constants';

const en = internationalAddressContent => ({
  section: SECTION,
  title: "What is the other parent's last known address?",
  errors: {
    otherParentAddress1: internationalAddressContent.errors.address1,
    otherParentAddressCountry: internationalAddressContent.errors.addressCountry,
  },
});

const cy = internationalAddressContent => ({
  section: SECTION_IN_WELSH,
  title: "What is the other parent's last known address? (in Welsh)",
  errors: {
    otherParentAddress1: internationalAddressContent.errors.address1,
    otherParentAddressCountry: internationalAddressContent.errors.addressCountry,
  },
});

const internationalAddressFormFields = internationalAddressForm.fields as FormFields;
export const form: FormContent = {
  ...internationalAddressForm,
  fields: {
    otherParentAddress1: internationalAddressFormFields.address1,
    otherParentAddress2: internationalAddressFormFields.address2,
    otherParentAddress3: internationalAddressFormFields.address3,
    otherParentAddressTown: internationalAddressFormFields.addressTown,
    otherParentAddressCounty: internationalAddressFormFields.addressCounty,
    otherParentAddressPostcode: internationalAddressFormFields.addressPostcode,
    otherParentAddressCountry: internationalAddressFormFields.addressCountry,
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
