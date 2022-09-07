import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  title: 'Local authority details',
  line1:
    'We need the details of the local authority that placed the child with you. These should be on the placement order.',
  localAuthorityName: 'Name of local authority',
  localAuthorityContactName: 'Name of your contact',
  localAuthorityContactNameHint:
    'This is usually your social worker. If you do not yet have a social worker, then this is the name of the person you have the most contact with in the local authority.',
  localAuthorityPhoneNumber: 'Phone number',
  localAuthorityPhoneNumberHint: 'This should be the number of your contact.',
  localAuthorityContactEmail: 'Email address of your contact',
  errors: {
    localAuthorityName: {
      required: 'Enter a name',
    },
    localAuthorityContactName: {
      required: 'Enter a name',
    },
    localAuthorityPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    localAuthorityContactEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y cais',
  title: 'Local authority details. (in welsh)',
  line1:
    'We need the details of the local authority that placed the child with you. These should be on the placement order. (in welsh)',
  localAuthorityName: 'Enw’r asiantaeth fabwysiadu neu’r awdurdod lleol',
  localAuthorityContactName: 'Enw eich cyswllt',
  localAuthorityContactNameHint:
    'This is usually your social worker. If you do not yet have a social worker, then this is the name of the person you have the most contact with in the local authority. (in welsh)',
  localAuthorityPhoneNumber: 'Rhif ffôn',
  localAuthorityPhoneNumberHint: 'This should be the number of your contact. (in welsh)',
  localAuthorityContactEmail: 'Cyfeiriad e-bost eich cyswllt',
  errors: {
    localAuthorityName: {
      required: 'Nac ydwdwch enw',
    },
    localAuthorityContactName: {
      required: 'Nac ydwdwch enw',
    },
    localAuthorityPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    localAuthorityContactEmail: {
      required: 'Nac ydwdwch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
  },
});

export const form: FormContent = {
  fields: {
    localAuthorityName: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.localAuthorityName,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    localAuthorityContactName: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.localAuthorityContactName,
      hint: l => l.localAuthorityContactNameHint,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    localAuthorityPhoneNumber: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.localAuthorityPhoneNumber,
      hint: l => l.localAuthorityPhoneNumberHint,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    localAuthorityContactEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.localAuthorityContactEmail,
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
