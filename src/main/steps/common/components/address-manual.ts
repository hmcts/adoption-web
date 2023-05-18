import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../app/form/validation';

const en = () => ({
  addressLine1: 'Address line 1 <span class="govuk-visually-hidden">line 1 of 2</span>',
  addressLine2: 'Address line 2 (optional) <span class="govuk-visually-hidden">line 2 of 2</span>',
  town: 'Town or city',
  county: 'County (optional)',
  postcode: 'Postcode',
  enterInternationalAddress: 'Enter an international address',
  errors: {
    address1: {
      required: 'Enter the first line of the address',
    },
    addressTown: {
      required: 'Enter the town or city',
    },
    addressPostcode: {
      required: 'Enter a postcode, like AA1 1AA',
      invalid: 'Enter a postcode, like AA1 1AA',
    },
  },
});

const cy = () => ({
  addressLine1: 'Llinell cyfeiriad 1 <span class="govuk-visually-hidden">llinell 1 o 2</span>',
  addressLine2: 'Llinell cyfeiriad 2 (dewisol) <span class="govuk-visually-hidden">llinell 2 o 2</span>',
  town: 'Tref neu ddinas',
  county: 'Sir (dewisol)',
  postcode: 'Cod post',
  enterInternationalAddress: 'Nac ydwdwch gyfeiriad rhyngwladol',
  errors: {
    address1: {
      required: 'Nac ydwdwch linell gyntaf y cyfeiriad',
    },
    addressTown: {
      required: 'Nac ydwdwch y dref neu ddinas',
    },
    addressPostcode: {
      required: 'Nac ydwdwch y cod post',
      invalid: 'Nodwch god post go iawn',
    },
  },
});

export const form: FormContent = {
  fields: {
    address1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine1,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    address2: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.addressLine2,
      labelSize: null,
    },
    addressTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.town,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    addressCounty: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.county,
      labelSize: null,
    },
    addressPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.postcode,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: isInvalidPostcode,
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
