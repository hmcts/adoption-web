import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: 'Your adoption agency or local authority details',
  title: 'Adoption agency or local authority details',
  adopAgencyName: 'Name of adoption agency or local authority',
  adopAgencyPhone: 'Phone number',
  adopAgencyContactName: 'Name of your contact',
  adopAgencyEmail: 'Email address of your contact',
  errors: {
    adopAgencyOrLaName: {
      required: 'Enter a name',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    adopAgencyOrLaContactName: {
      required: 'Enter a name',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Your adoption agency or local authority details (in Welsh)',
  title: 'Adoption agency or local authority details (in Welsh)',
  adopAgencyName: 'Name of adoption agency or local authority (in Welsh)',
  adopAgencyPhone: 'Phone number (in Welsh)',
  adopAgencyContactName: 'Name of your contact (in Welsh)',
  adopAgencyEmail: 'Email address of your contact (in Welsh)',
  errors: {
    adopAgencyOrLaName: {
      required: 'Enter a name (in Welsh)',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Enter a UK telephone number (in Welsh)',
      invalid: 'Enter a UK telephone number (in Welsh)',
    },
    adopAgencyOrLaContactName: {
      required: 'Enter a name (in Welsh)',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Enter an email address (in Welsh)',
      invalid: 'Enter an email address in the correct format, like name@example.com (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const adopAgency = userCase.adopAgencyOrLAs?.find(
      item => item.adopAgencyOrLaId === userCase.selectedAdoptionAgencyId
    );
    return {
      adopAgencyOrLaName: {
        type: 'text',
        classes: 'govuk-label govuk-!-width-two-thirds',
        label: l => l.adopAgencyName,
        value: adopAgency?.adopAgencyOrLaName,
        labelSize: null,
        validator: isFieldFilledIn,
      },
      adopAgencyOrLaPhoneNumber: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.adopAgencyPhone,
        value: adopAgency?.adopAgencyOrLaPhoneNumber,
        labelSize: null,
        attributes: {
          maxLength: 14,
        },
        validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
      },
      adopAgencyOrLaContactName: {
        type: 'text',
        classes: 'govuk-label govuk-!-width-two-thirds',
        label: l => l.adopAgencyContactName,
        value: adopAgency?.adopAgencyOrLaContactName,
        labelSize: null,
        validator: isFieldFilledIn,
      },
      adopAgencyOrLaContactEmail: {
        type: 'text',
        classes: 'govuk-label govuk-!-width-two-thirds',
        label: l => l.adopAgencyEmail,
        value: adopAgency?.adopAgencyOrLaContactEmail,
        labelSize: null,
        validator: value => isFieldFilledIn(value) || isEmailValid(value),
      },
    };
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
