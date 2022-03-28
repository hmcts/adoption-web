import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-manual';
import { OTHER_PARENT_INTERNATIONAL_ADDRESS } from '../../../urls';
import { SECTION, SECTION_IN_WELSH } from '../../constants';

const en = manualAddressContent => ({
  section: SECTION,
  title: "What is the other parent's last known address?",
  errors: {
    otherParentAddress1: manualAddressContent.errors.address1,
    otherParentAddressTown: manualAddressContent.errors.addressTown,
    otherParentAddressPostcode: manualAddressContent.errors.addressPostcode,
  },
  internationalAddressUrl: OTHER_PARENT_INTERNATIONAL_ADDRESS,
});

const cy: typeof en = manualAddressContent => ({
  section: SECTION_IN_WELSH,
  title: 'Beth yw cyfeiriad olaf hysbys y rhiant arall?',
  errors: {
    otherParentAddress1: manualAddressContent.errors.address1,
    otherParentAddressTown: manualAddressContent.errors.addressTown,
    otherParentAddressPostcode: manualAddressContent.errors.addressPostcode,
  },
  internationalAddressUrl: OTHER_PARENT_INTERNATIONAL_ADDRESS,
});

const manualAddressFormFields = manualAddressForm.fields as FormFields;
export const form: FormContent = {
  ...manualAddressForm,
  fields: {
    otherParentAddress1: manualAddressFormFields.address1,
    otherParentAddress2: manualAddressFormFields.address2,
    otherParentAddressTown: manualAddressFormFields.addressTown,
    otherParentAddressCounty: manualAddressFormFields.addressCounty,
    otherParentAddressPostcode: manualAddressFormFields.addressPostcode,
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
