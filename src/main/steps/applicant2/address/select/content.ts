import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { APPLICANT_2_FIND_ADDRESS, APPLICANT_2_MANUAL_ADDRESS } from '../../../../steps/urls';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../common/components/address-select';

const en = selectAddressContent => ({
  section: 'Second applicant',
  title: "What's your home address?",
  errors: {
    applicant2SelectAddress: selectAddressContent.errors.selectAddress,
  },
  changePostCodeUrl: APPLICANT_2_FIND_ADDRESS,
  cantFindAddressUrl: APPLICANT_2_MANUAL_ADDRESS,
});

const cy = selectAddressContent => ({
  section: 'Ail geisydd',
  title: 'Beth yw eich cyfeiriad cartref?',
  errors: {
    applicant2SelectAddress: selectAddressContent.errors.selectAddress,
  },
  changePostCodeUrl: APPLICANT_2_FIND_ADDRESS,
  cantFindAddressUrl: APPLICANT_2_MANUAL_ADDRESS,
});

const selectAddressFormFields = selectAddressForm.fields as FormFields;
export const form: FormContent = {
  ...selectAddressForm,
  fields: {
    applicant2SelectAddress: selectAddressFormFields.selectAddress,
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
