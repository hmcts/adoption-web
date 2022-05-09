import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  title: 'Local authority details',
  line1:
    'We need the details of the local authority that placed the child with you. These should be on the placement order.',
  adopAgencyName: 'Name of local authority',
  adopAgencyContactName: 'Name of your contact',
  adopAgencyContactNameHint:
    'This is usually your social worker. If you do not yet have a social worker, then this is the name of the person you have the most contact with in the local authority.',
  adopAgencyPhone: 'Phone number',
  adopAgencyPhoneHint: 'This should be the number of your contact.',
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
    adopAgencyOrLaContactEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Application details. (in welsh)',
  title: 'Local authority details. (in welsh)',
  line1:
    'We need the details of the local authority that placed the child with you. These should be on the placement order. (in welsh)',
  adopAgencyName: 'Enw’r asiantaeth fabwysiadu neu’r awdurdod lleol',
  adopAgencyContactName: 'Enw eich cyswllt',
  adopAgencyContactNameHint:
    'This is usually your social worker. If you do not yet have a social worker, then this is the name of the person you have the most contact with in the local authority. (in welsh)',
  adopAgencyPhone: 'Rhif ffôn',
  adopAgencyPhoneHint: 'This should be the number of your contact. (in welsh)',
  adopAgencyContactEmail: 'Cyfeiriad e-bost eich cyswllt',
  errors: {
    adopAgencyOrLaName: {
      required: 'Nac ydwdwch enw',
    },
    adopAgencyOrLaContactName: {
      required: 'Nac ydwdwch enw',
    },
    adopAgencyOrLaPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
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
      adopAgencyOrLaContactName: {
        type: 'text',
        classes: 'govuk-label govuk-!-width-two-thirds',
        label: l => l.adopAgencyContactName,
        hint: l => l.adopAgencyContactNameHint,
        value: adopAgency?.adopAgencyOrLaContactName,
        labelSize: null,
        validator: isFieldFilledIn,
      },
      adopAgencyOrLaPhoneNumber: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.adopAgencyPhone,
        hint: l => l.adopAgencyPhoneHint,
        value: adopAgency?.adopAgencyOrLaPhoneNumber,
        labelSize: null,
        attributes: {
          maxLength: 14,
        },
        validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
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
