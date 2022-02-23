import { ApplyingWith } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../common/components/address-select';
import { APPLICANT_1_FIND_ADDRESS, APPLICANT_1_MANUAL_ADDRESS } from '../../../urls';

const en = ({ selectAddressContent, userCase }): Record<string, unknown> => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant';
  return {
    section,
    title: "What's your home address?",
    errors: {
      applicant1SelectAddress: selectAddressContent.errors.selectAddress,
    },
    changePostCodeUrl: APPLICANT_1_FIND_ADDRESS,
    cantFindAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
  };
};

const cy = ({ selectAddressContent, userCase }): Record<string, unknown> => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant (in Welsh)' : 'First applicant (in Welsh)';
  return {
    section,
    title: "What's your home address? (in Welsh)",
    errors: {
      applicant1SelectAddress: selectAddressContent.errors.selectAddress,
    },
    changePostCodeUrl: APPLICANT_1_FIND_ADDRESS,
    cantFindAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
  };
};

const selectAddressFormFields = selectAddressForm.fields as FormFields;
export const form: FormContent = {
  ...selectAddressForm,
  fields: {
    applicant1SelectAddress: selectAddressFormFields.selectAddress,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const selectAddressContent = selectAddressGenerateContent(content);
  const translations = languages[content.language]({ selectAddressContent, userCase: content.userCase });

  return {
    ...selectAddressContent,
    ...translations,
    form,
  };
};
