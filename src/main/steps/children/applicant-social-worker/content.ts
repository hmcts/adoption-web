import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isGovUkEmail, isPhoneNoValid } from '../../../app/form/validation';

const getLocalAuthorityListItems = (localAuthorityList, selectedLocalAuthority) =>
  localAuthorityList
    .filter(item => item.value !== selectedLocalAuthority)
    .map(item => ({ text: item.name, value: item.name }));

const en = content => ({
  section: 'Application details',
  title: 'Your social worker details',
  line1: 'This is the social worker attached to your local authority.',
  applicantSocialWorkerName: 'Name of your social worker',
  applicantSocialWorkerNameHint: 'If you do not yet have a social worker, insert the name of your contact.',
  applicantSocialWorkerPhoneNumber: 'Phone number',
  applicantSocialWorkerEmail: 'Email address (if known)',
  applicantSocialWorkerEmailHint: 'The email address should be an official government email',
  applicantLocalAuthorityLabel: 'Name of local authority',
  applicantLocalAuthorityEmail: 'Your local authority email address',
  applicantLocalAuthorityEmailHint:
    'This will be used to send a notification to the local authority to progress your application so it is important that it is accurate.',
  applicantLocalAuthorityHint: 'This is the local authority that your social worker works for.',
  options: [
    ...getLocalAuthorityListItems(content.localAuthorityList, content.userCase.applicantLocalAuthority),
    { text: content.userCase.applicantLocalAuthority, value: content.userCase.applicantLocalAuthority, selected: true },
  ],
  errors: {
    applicantSocialWorkerName: {
      required: 'Enter a name',
    },
    applicantSocialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    applicantSocialWorkerEmail: {
      invalid:
        'You have not entered an email address, please contact your social worker or representative to confirm the correct email for use.',
      invalidGovUkEmail:
        'The email address provided is not an approved email address, please contact your social worker or representative to confirm the correct email for use',
    },
    applicantLocalAuthority: {
      required: 'Enter a name',
    },
    applicantLocalAuthorityEmail: {
      required:
        'You have not entered an email address, please contact your social worker or representative to confirm the correct email for use.',
      invalid:
        'You have not entered an email address, please contact your social worker or representative to confirm the correct email for use.',
      invalidGovUkEmail:
        'The email address provided is not an approved email address, please contact your social worker or representative to confirm the correct email for use',
    },
  },
});

const cy: typeof en = content => ({
  section: 'Manylion y cais',
  title: 'Manylion eich gweithiwr cymdeithasol',
  line1: "Dyma'r gweithiwr cymdeithasol sydd yn gweithio i’ch awdurdod lleol.",
  applicantSocialWorkerName: 'Enw eich gweithiwr cymdeithasol',
  applicantSocialWorkerNameHint: 'Os nad oes gennych weithiwr cymdeithasol eto, rhowch enw eich cyswllt.',
  applicantSocialWorkerPhoneNumber: 'Rhif ffôn',
  applicantSocialWorkerEmail: "Cyfeiriad e-bost (os yw'n hysbys)",
  applicantSocialWorkerEmailHint: "Dylai'r cyfeiriad e-bost fod yn e-bost swyddogol gan y llywodraeth.",
  applicantLocalAuthorityLabel: "Enw'r awdurdod lleol",
  applicantLocalAuthorityEmail: 'Cyfeiriad e-bost eich awdurdod lleol',
  applicantLocalAuthorityEmailHint:
    'Defnyddir hwn i anfon hysbysiad i’r awdurdod lleol i symud eich cais yn ei flaen, felly mae’n bwysig ei fod yn gywir.',
  applicantLocalAuthorityHint: "Dyma'r awdurdod lleol y mae eich gweithiwr cymdeithasol yn gweithio iddo.",
  options: [
    ...getLocalAuthorityListItems(content.localAuthorityList, content.userCase.applicantLocalAuthority),
    { text: content.userCase.applicantLocalAuthority, value: content.userCase.applicantLocalAuthority, selected: true },
  ],
  errors: {
    applicantSocialWorkerName: {
      required: 'Rhowch enw',
    },
    applicantSocialWorkerPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    applicantSocialWorkerEmail: {
      invalid:
        'Nid ydych wedi nodi cyfeiriad e-bost. Cysylltwch â’ch gweithiwr cymdeithasol neu’ch cynrychiolydd i gadarnhau beth yw’r cyfeiriad e-bost cywir i ddefnyddio.',
      invalidGovUkEmail:
        'Nid yw’r cyfeiriad e-bost a ddarparwyd yn gyfeiriad e-bost cymeradwy. Cysylltwch â’ch gweithiwr cymdeithasol neu gynrychiolydd i gadarnhau’r cyfeiriad e-bost cywir',
    },
    applicantLocalAuthority: {
      required: 'Rhowch enw',
    },
    applicantLocalAuthorityEmail: {
      required:
        'Nid ydych wedi nodi cyfeiriad e-bost. Cysylltwch â’ch gweithiwr cymdeithasol neu’ch cynrychiolydd i gadarnhau beth yw’r cyfeiriad e-bost cywir i ddefnyddio.',
      invalid:
        'Nid ydych wedi nodi cyfeiriad e-bost. Cysylltwch â’ch gweithiwr cymdeithasol neu’ch cynrychiolydd i gadarnhau beth yw’r cyfeiriad e-bost cywir i ddefnyddio.',
      invalidGovUkEmail:
        'Nid yw’r cyfeiriad e-bost a ddarparwyd yn gyfeiriad e-bost cymeradwy. Cysylltwch â’ch gweithiwr cymdeithasol neu gynrychiolydd i gadarnhau’r cyfeiriad e-bost cywir',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicantSocialWorkerName: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.applicantSocialWorkerName,
      hint: l => l.applicantSocialWorkerNameHint,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    applicantSocialWorkerPhoneNumber: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.applicantSocialWorkerPhoneNumber,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    applicantSocialWorkerEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.applicantSocialWorkerEmail,
      hint: l => l.applicantSocialWorkerEmailHint,
      labelSize: null,
      validator: value => {
        if (!isFieldFilledIn(value)) {
          return isEmailValid(value) || isGovUkEmail(value);
        }
      },
    },
    applicantLocalAuthorityHint: {
      type: 'hint',
      label: l => l.applicantLocalAuthorityLabel,
      hint: l => l.applicantLocalAuthorityHint,
    },
    applicantLocalAuthority: {
      type: 'select-dropdown',
      id: 'location-picker',
      options: l => l.options,
      label: l => l.label,
      classes: 'l',
      labelSize: 'l',
    },
    applicantLocalAuthorityEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      hint: l => l.applicantLocalAuthorityEmailHint,
      label: l => l.applicantLocalAuthorityEmail,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isEmailValid(value) || isGovUkEmail(value),
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
