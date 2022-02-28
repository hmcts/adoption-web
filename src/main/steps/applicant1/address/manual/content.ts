import { ApplyingWith } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-manual';

const en = ({ manualAddressContent, userCase }): Record<string, unknown> => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant';
  return {
    section,
    title: "What's your address?",
    errors: {
      applicant1Address1: manualAddressContent.errors.address1,
      applicant1AddressTown: manualAddressContent.errors.addressTown,
      applicant1AddressPostcode: manualAddressContent.errors.addressPostcode,
    },
  };
};

const cy = ({ manualAddressContent, userCase }): Record<string, unknown> => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant (in welsh)' : 'First applicant (in welsh)';
  return {
    section,
    title: "What's your address? (in welsh)",
    errors: {
      applicant1Address1: manualAddressContent.errors.address1,
      applicant1AddressTown: manualAddressContent.errors.addressTown,
      applicant1AddressPostcode: manualAddressContent.errors.addressPostcode,
    },
  };
};

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
  const translations = languages[content.language]({ manualAddressContent, userCase: content.userCase });

  return {
    ...manualAddressContent,
    ...translations,
    form,
  };
};
