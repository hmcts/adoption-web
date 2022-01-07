import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as addressLookupForm,
  generateContent as addressLookupGenerateContent,
} from '../../../common/components/address-lookup';
import { APPLICANT_2_MANUAL_ADDRESS } from '../../../urls';

const en = addressLookupContent => ({
  section: 'Second applicant',
  title: "What's your home address?",
  errors: {
    applicant2AddressPostcode: addressLookupContent.errors.addressPostcode,
  },
  manualAddressUrl: APPLICANT_2_MANUAL_ADDRESS,
});

const cy = addressLookupContent => ({
  section: 'Second applicant (in welsh)',
  title: "What's your home address? (in welsh)",
  errors: {
    applicant2AddressPostcode: addressLookupContent.errors.addressPostcode,
  },
  manualAddressUrl: APPLICANT_2_MANUAL_ADDRESS,
});

const addressLookupFormFields = addressLookupForm.fields as FormFields;
export const form: FormContent = {
  ...addressLookupForm,
  fields: {
    applicant2AddressPostcode: addressLookupFormFields.addressPostcode,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const addressLookupContent = addressLookupGenerateContent(content);
  const translations = languages[content.language](addressLookupContent);
  return {
    ...addressLookupContent,
    ...translations,
    form,
  };
};
