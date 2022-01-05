import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/manual-address';

const en = manualAddressContent => ({
  section: 'Primary applicant',
  title: "What's your home address?",
  errors: {
    applicant1Address1: manualAddressContent.errors.address1,
    applicant1AddressTown: manualAddressContent.errors.addressTown,
    applicant1AddressPostcode: manualAddressContent.errors.addressPostcode,
  },
});

const cy = manualAddressContent => ({
  section: 'Primary applicant (in welsh)',
  title: "What's your home address? (in welsh)",
  errors: {
    applicant1Address1: manualAddressContent.errors.address1,
    applicant1AddressTown: manualAddressContent.errors.addressTown,
    applicant1AddressPostcode: manualAddressContent.errors.addressPostcode,
  },
});

const manualAddressFormFields = manualAddressForm.fields as FormFields;
export const form: FormContent = {
  ...manualAddressForm,
  fields: {
    applicant1Address1: manualAddressFormFields.address1,
    applicant1Address2: manualAddressFormFields.address2,
    applicant1AddressTown: manualAddressFormFields.addressTown,
    applicant1AddressCounty: manualAddressFormFields.addressCounty,
    applicant1AddressPostcode: manualAddressFormFields.addressPostcode,
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
