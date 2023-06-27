import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isGovUkEmail, isPhoneNoValid } from '../../../app/form/validation';

const getLocalAuthorityListItems = (localAuthorityList, selectedLocalAuthority) =>
  localAuthorityList
    .filter(item => item.value !== selectedLocalAuthority)
    .map(item => ({ text: item.name, value: item.name }));

const en = content => ({
  section: 'Application details',
  title: "Child's social worker details",
  line1: 'You can get these details from your local authority or adoption agency.',
  childSocialWorkerName: "Name of child's social worker",
  childSocialWorkerPhoneNumber: 'Phone number',
  childSocialWorkerEmail: 'Email address (if known)',
  childSocialWorkerEmailHint: 'The email address should be an official government email.',
  childLocalAuthorityLabel: "Child's local authority",
  childLocalAuthorityEmail: 'Local authority email address',
  childLocalAuthorityEmailHint:
    'This will be used to send a notification to the local authority to progress your application so it is important that it is accurate.',
  childLocalAuthorityHint:
    'This is the local authority with parental responsibility for the child. It may be different to your own local authority. They will be named on the placement order if you are not sure',
  options: [
    ...getLocalAuthorityListItems(content.localAuthorityList, content.userCase.childLocalAuthority),
    { text: content.userCase.childLocalAuthority, value: content.userCase.childLocalAuthority, selected: true },
  ],
  errors: {
    childSocialWorkerName: {
      required: 'Enter name of child’s social worker',
    },
    childSocialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    childSocialWorkerEmail: {
      invalid:
        'You have not entered an email address, please contact your social worker or representative to confirm the correct email for use.',
      invalidGovUkEmail:
        'The email address provided is not an approved email address, please contact your social worker or representative to confirm the correct email for use',
    },
    childLocalAuthority: {
      required: 'Enter name of local authority',
    },
    childLocalAuthorityEmail: {
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
  title: 'Manylion gweithiwr cymdeithasol y plentyn',
  line1: 'Gallwch gael y manylion hyn gan eich awdurdod lleol neu asiantaeth fabwysiadu.',
  childSocialWorkerName: 'Enw gweithiwr cymdeithasol y plentyn',
  childSocialWorkerPhoneNumber: 'Rhif ffôn',
  childSocialWorkerEmail: "Cyfeiriad e-bost (os yw'n hysbys)",
  childSocialWorkerEmailHint: "Dylai'r cyfeiriad e-bost fod yn e-bost swyddogol gan y llywodraeth.",
  childLocalAuthorityLabel: 'Awdurdod lleol y plentyn',
  childLocalAuthorityEmail: 'Cyfeiriad e-bost yr awdurdod lleol',
  childLocalAuthorityEmailHint:
    'Defnyddir hwn i anfon hysbysiad i’r awdurdod lleol i symud eich cais yn eiflaen, felly mae’n bwysig ei fod yn gywir.',
  childLocalAuthorityHint:
    "Dyma'r awdurdod lleol sydd â chyfrifoldeb rhiant dros y plentyn. Gall fod yn wahanol i'ch awdurdod lleol eich hun. Bydd wedi’i enwi ar y gorchymyn lleoli os nad ydych yn siŵr.",
  options: [
    ...getLocalAuthorityListItems(content.localAuthorityList, content.userCase.childLocalAuthority),
    { text: content.userCase.childLocalAuthority, value: content.userCase.childLocalAuthority, selected: true },
  ],
  errors: {
    childSocialWorkerName: {
      required: 'Rhowch enw gweithiwr cymdeithasol y plentyn',
    },
    childSocialWorkerPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    childSocialWorkerEmail: {
      invalid:
        'Nid ydych wedi nodi cyfeiriad e-bost. Cysylltwch â’ch gweithiwr cymdeithasol neu’ch cynrychiolydd i gadarnhau beth yw’r cyfeiriad e-bost cywir i ddefnyddio.',
      invalidGovUkEmail:
        'Nid yw’r cyfeiriad e-bost a ddarparwyd yn gyfeiriad e-bost cymeradwy. Cysylltwch â’ch gweithiwr cymdeithasol neu gynrychiolydd i gadarnhau’r cyfeiriad e-bost cywir',
    },
    childLocalAuthority: {
      required: 'Rhowch enw’r awdurdod lleol',
    },
    childLocalAuthorityEmail: {
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
    childSocialWorkerName: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.childSocialWorkerName,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    childSocialWorkerPhoneNumber: {
      type: 'text',
      classes: 'govuk-label govuk-input--width-10',
      label: l => l.childSocialWorkerPhoneNumber,
      labelSize: null,
      attributes: {
        maxLength: 14,
      },
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    childSocialWorkerEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.childSocialWorkerEmail,
      hint: l => l.childSocialWorkerEmailHint,
      labelSize: null,
      validator: value => {
        if (!isFieldFilledIn(value)) {
          return isEmailValid(value) || isGovUkEmail(value);
        }
      },
    },
    childLocalAuthorityLabelHint: {
      type: 'hint',
      label: l => l.childLocalAuthorityLabel,
      hint: l => l.childLocalAuthorityHint,
    },
    childLocalAuthority: {
      type: 'select-dropdown',
      id: 'location-picker',
      options: l => l.options,
      label: l => l.label,
      classes: 'l',
      labelSize: 'l',
    },
    childLocalAuthorityEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      hint: l => l.childLocalAuthorityEmailHint,
      label: l => l.childLocalAuthorityEmail,
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
