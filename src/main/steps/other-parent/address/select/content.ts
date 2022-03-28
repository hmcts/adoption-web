import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../common/components/address-select';
import { OTHER_PARENT_MANUAL_ADDRESS, OTHER_PARENT_POSTCODE_LOOKUP } from '../../../urls';
import { SECTION, SECTION_IN_WELSH } from '../../constants';

const en = selectAddressContent => ({
  section: SECTION,
  title: "What's their address?",
  errors: {
    otherParentSelectAddress: selectAddressContent.errors.selectAddress,
  },
  changePostCodeUrl: OTHER_PARENT_POSTCODE_LOOKUP,
  cantFindAddressUrl: OTHER_PARENT_MANUAL_ADDRESS,
});

const cy: typeof en = selectAddressContent => ({
  section: SECTION_IN_WELSH,
  title: 'Beth yw eu cyfeiriad?',
  errors: {
    otherParentSelectAddress: selectAddressContent.errors.selectAddress,
  },
  changePostCodeUrl: OTHER_PARENT_POSTCODE_LOOKUP,
  cantFindAddressUrl: OTHER_PARENT_MANUAL_ADDRESS,
});

const selectAddressFormFields = selectAddressForm.fields as FormFields;
export const form: FormContent = {
  ...selectAddressForm,
  fields: {
    otherParentSelectAddress: selectAddressFormFields.selectAddress,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const selectAddressContent = selectAddressGenerateContent(content);
  const translations = languages[content.language](selectAddressContent);
  return {
    ...selectAddressContent,
    ...translations,
    form,
  };
};
