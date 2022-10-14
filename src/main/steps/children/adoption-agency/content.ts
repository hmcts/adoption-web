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
      required: 'Enter name of adoption agency or local authority',
    },
    adopAgencyOrLaContactName: {
      required: 'Enter name of your contact',
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
      required: 'Enter postcode, like AA1 1AA',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y cais',
  title: 'Yr asiantaeth fabwysiadu neu fanylion yr awdurdod lleol',
  adopAgencyName: "Enw'r asiantaeth fabwysiadu neu'r awdurdod lleol",
  adopAgencyContactName: 'Enw eich cyswllt',
  adopAgencyPhone: 'Rhif ffôn',
  adopAgencyAddressLine1: 'Llinell gyntaf y cyfeiriad',
  adopAgencyTown: 'Tref neu ddinas',
  adopAgencyPostcode: 'Cod post, fel AA1 1AA',
  adopAgencyContactEmail: 'Cyfeiriad e-bost eich cyswllt',
  errors: {
    adopAgencyOrLaName: {
      required: "Rhowch enw'r asiantaeth fabwysiadu neu’r awdurdod lleol",
    },
    adopAgencyOrLaContactName: {
      required: "Rhowch enw'ch cyswllt",
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    adopAgencyAddressLine1: {
      required: 'Rhowch linell gyntaf y cyfeiriad',
    },
    adopAgencyTown: {
      required: "Rhowch enw'r dref neu'r ddinas",
    },
    adopAgencyPostcode: {
      required: 'Cod post, fel AA1 1AA',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Rhowch gyfeiriad e-bost',
      invalid: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
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
