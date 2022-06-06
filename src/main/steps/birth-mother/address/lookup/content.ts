import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as addressLookupForm,
  generateContent as addressLookupGenerateContent,
} from '../../../common/components/address-lookup';
import { BIRTH_MOTHER_MANUAL_ADDRESS } from '../../../urls';

const en = addressLookupContent => ({
  section: "Birth mother's details",
  title: "What is the birth mother's last known address?",
  line1: null,
  errors: {
    birthMotherAddressPostcode: addressLookupContent.errors.addressPostcode,
  },
  manualAddressUrl: BIRTH_MOTHER_MANUAL_ADDRESS,
});

const cy: typeof en = addressLookupContent => ({
  section: 'Manylion y fam fiolegol',
  title: 'Beth yw cyfeiriad olaf hysbys y fam fiolegol?',
  line1: null,
  errors: {
    birthMotherAddressPostcode: addressLookupContent.errors.addressPostcode,
  },
  manualAddressUrl: BIRTH_MOTHER_MANUAL_ADDRESS,
});

const addressLookupFormFields = addressLookupForm.fields as FormFields;
export const form: FormContent = {
  ...addressLookupForm,
  fields: {
    birthMotherAddressPostcode: addressLookupFormFields.addressPostcode,
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
