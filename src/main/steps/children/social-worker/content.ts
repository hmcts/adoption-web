import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Your adoption agency or local authority details',
  title: "Details about the child's social worker",
  line1: 'You can get these details from your adoption agency or local authority.',
  socialWorkerName: "Social worker's name",
  socialWorkerPhoneNumber: "Social worker's phone number",
  socialWorkerEmail: "Social worker's email address",
  socialWorkerTeamEmail: "Social worker's team email address (if known)",
  errors: {
    socialWorkerName: {
      required: 'Enter a name',
    },
    socialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    socialWorkerEmail: {
      required: 'Enter an email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    socialWorkerTeamEmail: {
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion eich asiantaeth fabwysiadu neu’ch awdurdod lleol',
  title: 'Manylion am weithiwr cymdeithasol y plentyn',
  line1: 'Gallwch gael y manylion hyn gan eich asiantaeth fabwysiadau neu’ch awdurdod lleol.',
  socialWorkerName: "Enw'r gweithiwr cymdeithasol",
  socialWorkerPhoneNumber: 'Rhif ffôn y gweithiwr cymdeithasol',
  socialWorkerEmail: 'Cyfeiriad e-bost y gweithiwr cymdeithasol',
  socialWorkerTeamEmail: 'Cyfeiriad e-bost tîm y gweithiwr cymdeithasol (os yw’n hysbys)',
  errors: {
    socialWorkerName: {
      required: 'Nac ydwdwch enw',
    },
    socialWorkerPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    socialWorkerEmail: {
      required: 'Nac ydwdwch gyfeiriad e-bost',
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
    socialWorkerTeamEmail: {
      invalid: 'Rhowch gyfeiriad e-bost yn y fformat cywir, er enghraifft enw@enghraifft.com',
    },
  },
});

export const form: FormContent = {
  fields: {
    socialWorkerName: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.socialWorkerName,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    socialWorkerPhoneNumber: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.socialWorkerPhoneNumber,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    socialWorkerEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.socialWorkerEmail,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isEmailValid(value),
    },
    socialWorkerTeamEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.socialWorkerTeamEmail,
      labelSize: null,
      validator: value => (value ? isEmailValid(value) : undefined),
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
