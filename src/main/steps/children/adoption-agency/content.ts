import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isInvalidPostcode, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  title: 'Adoption agency or local authority details',
  adopAgencyName: 'Name of adoption agency or local authority',
  adopAgencyContactName: 'Name of your contact',
  adopAgencyPhone: 'Phone number',
  adopAgencyAddressLine1: 'Address line 1',
  adopAgencyTown: 'Town or city',
  adopAgencyPostcode: 'Postcode',
  adopAgencyContactEmail: 'Email address of your contact',
  errors: {
    adopAgencyOrLaName: {
      required: 'Enter a name',
    },
    adopAgencyOrLaContactName: {
      required: 'Enter a name',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    adopAgencyAddressLine1: {
      required: 'Enter the first line of the address',
    },
    adopAgencyTown: {
      required: 'Enter the town or city',
    },
    adopAgencyPostcode: {
      required: 'Enter the postcode',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Application details. (in welsh)',
  title: 'Adoption agency or local authority details. (in welsh)',
  adopAgencyName: 'Name of adoption agency or local authority. (in welsh)',
  adopAgencyContactName: 'Name of your contact. (in welsh)',
  adopAgencyPhone: 'Phone number. (in welsh)',
  adopAgencyAddressLine1: 'Address line 1. (in welsh)',
  adopAgencyTown: 'Town or city. (in welsh)',
  adopAgencyPostcode: 'Postcode. (in welsh)',
  adopAgencyContactEmail: 'Email address of your contact. (in welsh)',
  errors: {
    adopAgencyOrLaName: {
      required: 'Enter a name. (in welsh)',
    },
    adopAgencyOrLaContactName: {
      required: 'Enter a name. (in welsh)',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Enter a UK telephone number. (in welsh)',
      invalid: 'Enter a UK telephone number. (in welsh)',
    },
    adopAgencyAddressLine1: {
      required: 'Enter the first line of the address. (in welsh)',
    },
    adopAgencyTown: {
      required: 'Enter the town or city. (in welsh)',
    },
    adopAgencyPostcode: {
      required: 'Enter the postcode. (in welsh)',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Enter an email address. (in welsh)',
      invalid: 'Enter an email address in the correct format, like name@example.com. (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    adopAgencyOrLaName: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.adopAgencyName,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    adopAgencyOrLaContactName: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.adopAgencyContactName,
      hint: l => l.adopAgencyContactNameHint,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    adopAgencyOrLaPhoneNumber: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.adopAgencyPhone,
      hint: l => l.adopAgencyPhoneHint,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    adopAgencyAddressLine1: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.adopAgencyAddressLine1,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    adopAgencyTown: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.adopAgencyTown,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    adopAgencyPostcode: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.adopAgencyPostcode,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: isInvalidPostcode,
    },
    adopAgencyOrLaContactEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.adopAgencyContactEmail,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isEmailValid(value),
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
