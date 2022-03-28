import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { SECTION, SECTION_IN_WELSH } from '../../../../steps/birth-father/constants';
import {
  form as addressLookupForm,
  generateContent as addressLookupGenerateContent,
} from '../../../common/components/address-lookup';
import { BIRTH_FATHER_MANUAL_ADDRESS } from '../../../urls';

const en = addressLookupContent => ({
  section: SECTION,
  title: "What is the birth father's last known address?",
  errors: {
    birthFatherAddressPostcode: addressLookupContent.errors.addressPostcode,
  },
  manualAddressUrl: BIRTH_FATHER_MANUAL_ADDRESS,
});

const cy: typeof en = addressLookupContent => ({
  section: SECTION_IN_WELSH,
  title: 'Beth yw cyfeiriad olaf hysbys y tad biolegol?',
  errors: {
    birthFatherAddressPostcode: addressLookupContent.errors.addressPostcode,
  },
  manualAddressUrl: BIRTH_FATHER_MANUAL_ADDRESS,
});

const addressLookupFormFields = addressLookupForm.fields as FormFields;
export const form: FormContent = {
  ...addressLookupForm,
  fields: {
    birthFatherAddressPostcode: addressLookupFormFields.addressPostcode,
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
