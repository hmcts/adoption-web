import { ApplyingWith } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as addressLookupForm,
  generateContent as addressLookupGenerateContent,
} from '../../../common/components/address-lookup';
import { APPLICANT_1_MANUAL_ADDRESS } from '../../../urls';

const en = (addressLookupContent, content) => ({
  section: content.userCase.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant',
  title: "What's your home address?",
  errors: {
    applicant1AddressPostcode: addressLookupContent.errors.addressPostcode,
  },
  manualAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
});

const cy = (addressLookupContent, content) => ({
  section: content.userCase.applyingWith === ApplyingWith.ALONE ? 'Applicant (in welsh)' : 'First applicant (in welsh)',
  title: "What's your home address? (in welsh)",
  errors: {
    applicant1AddressPostcode: addressLookupContent.errors.addressPostcode,
  },
  manualAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
});

const addressLookupFormFields = addressLookupForm.fields as FormFields;
export const form: FormContent = {
  ...addressLookupForm,
  fields: {
    applicant1AddressPostcode: addressLookupFormFields.addressPostcode,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const addressLookupContent = addressLookupGenerateContent(content);
  const translations = languages[content.language](addressLookupContent, content);
  return {
    ...addressLookupContent,
    ...translations,
    form,
  };
};
