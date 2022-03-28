import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Your adoption agency or local authority details',
  title: 'Adoption agency or local authority details',
  adopAgencyName: 'Name of adoption agency or local authority',
  adopAgencyPhone: 'Phone number',
  adopAgencyContactName: 'Name of your contact',
  adopAgencyContactEmail: 'Email address of your contact',
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

const cy: typeof en = () => ({
  section: 'Manylion eich asiantaeth fabwysiadu neu’ch awdurdod lleol',
  title: 'Manylion yr asiantaeth fabwysiadu neu’r awdurdod lleol',
  adopAgencyName: 'Enw’r asiantaeth fabwysiadu neu’r awdurdod lleol',
  adopAgencyPhone: 'Rhif ffôn',
  adopAgencyContactName: 'Enw eich cyswllt',
  adopAgencyContactEmail: 'Cyfeiriad e-bost eich cyswllt',
  errors: {
    adopAgencyOrLaName: {
      required: 'Nac ydwdwch enw',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    adopAgencyOrLaContactName: {
      required: 'Nac ydwdwch enw',
    },
    adopAgencyOrLaContactEmail: {
      required: 'Nac ydwdwch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
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
        label: l => l.adopAgencyContactEmail,
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
