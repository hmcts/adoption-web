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
  title: 'Manylion yr awdurdod lleol',
  line1:
    "Rydym angen manylion yr awdurdod lleol a osododd y plentyn gyda chi. Dylai'r rhain fod ar y gorchymyn lleoli.",
  localAuthorityName: 'Enw’r asiantaeth fabwysiadu neu’r awdurdod lleol',
  localAuthorityContactName: 'Enw eich cyswllt',
  localAuthorityContactNameHint:
    'Fel arfer, eich gweithiwr cymdeithasol fydd hwn. Os nad oes gennych weithiwr cymdeithasol eto, dyma’r unigolyn y mae gennych y mwyaf o gyswllt ag ef/hi yn yr awdurdod lleol.',
  localAuthorityPhoneNumber: 'Rhif ffôn',
  localAuthorityPhoneNumberHint: 'Rhif y sawl dan sylw dylai hwn fod.',
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
      invalid: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
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
