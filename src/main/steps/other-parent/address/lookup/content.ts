import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as addressLookupForm,
  generateContent as addressLookupGenerateContent,
} from '../../../common/components/address-lookup';
import { OTHER_PARENT_MANUAL_ADDRESS } from '../../../urls';
import { SECTION, SECTION_IN_WELSH } from '../../constants';

const en = addressLookupContent => ({
  section: SECTION,
  title: "What's their address?",
  errors: {
    otherParentAddressPostcode: addressLookupContent.errors.addressPostcode,
  },
  manualAddressUrl: OTHER_PARENT_MANUAL_ADDRESS,
});

const cy: typeof en = addressLookupContent => ({
  section: SECTION_IN_WELSH,
  title: 'Beth yw eu cyfeiriad?',
  errors: {
    otherParentAddressPostcode: addressLookupContent.errors.addressPostcode,
  },
  manualAddressUrl: OTHER_PARENT_MANUAL_ADDRESS,
});

const addressLookupFormFields = addressLookupForm.fields as FormFields;
export const form: FormContent = {
  ...addressLookupForm,
  fields: {
    otherParentAddressPostcode: addressLookupFormFields.addressPostcode,
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
