import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-manual';

const en = manualAddressContent => ({
  section: 'Second applicant',
  title: "What's your home address?",
  errors: {
    applicant2Address1: manualAddressContent.errors.address1,
    applicant2AddressTown: manualAddressContent.errors.addressTown,
    applicant2AddressPostcode: manualAddressContent.errors.addressPostcode,
  },
});

const cy = manualAddressContent => ({
  section: 'Second applicant (in welsh)',
  title: "What's your home address? (in welsh)",
  errors: {
    applicant2Address1: manualAddressContent.errors.address1,
    applicant2AddressTown: manualAddressContent.errors.addressTown,
    applicant2AddressPostcode: manualAddressContent.errors.addressPostcode,
  },
});

const manualAddressFormFields = manualAddressForm.fields as FormFields;
export const form: FormContent = {
  ...manualAddressForm,
  fields: {
    applicant2Address1: manualAddressFormFields.address1,
    applicant2Address2: manualAddressFormFields.address2,
    applicant2AddressTown: manualAddressFormFields.addressTown,
    applicant2AddressCounty: manualAddressFormFields.addressCounty,
    applicant2AddressPostcode: manualAddressFormFields.addressPostcode,
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
