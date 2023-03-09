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
  childSocialWorkerEmailHint: 'The email address should be an official government email that ends in gov.uk.',
  childLocalAuthorityLabel: "Child's local authority",
  childLocalAuthorityEmail: 'Local authority email address',
  childLocalAuthorityEmailHint:
    'This will be used to send a notification to the local authority to progress your application so it is important that it is accurate. It should end in gov.uk.',
  childLocalAuthorityHint:
    'This is the local authority with parental responsibility for the child. It may be different to your own local authority.',
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
      invalid: 'Enter an email address that ends in gov.uk',
      invalidGovUkEmail: 'Enter an email address that ends in gov.uk',
    },
    childLocalAuthority: {
      required: 'Enter name of local authority',
    },
    childLocalAuthorityEmail: {
      required: 'Enter an email address in the correct format, like name@gov.uk',
      invalid: 'Enter an email address that ends in gov.uk',
      invalidGovUkEmail: 'Enter an email address that ends in gov.uk',
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
  childSocialWorkerEmailHint:
    "Dylai'r cyfeiriad e-bost fod yn e-bost swyddogol gan y llywodraeth sy'n terfynu â gov.uk.",
  childLocalAuthorityLabel: 'Awdurdod lleol y plentyn',
  childLocalAuthorityEmail: 'Cyfeiriad e-bost yr awdurdod lleol',
  childLocalAuthorityEmailHint:
    'Defnyddir hwn i anfon hysbysiad i’r awdurdod lleol i symud eich cais yn eiflaen, felly mae’n bwysig ei fod yn gywir. Dylai ddiweddu gyda gov.uk.',
  childLocalAuthorityHint:
    "Dyma'r awdurdod lleol sydd â chyfrifoldeb rhiant dros y plentyn. Gall fod yn wahanol i'ch awdurdod lleol eich hun.",
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
      invalid: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
      invalidGovUkEmail: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
    },
    childLocalAuthority: {
      required: 'Rhowch enw’r awdurdod lleol',
    },
    childLocalAuthorityEmail: {
      required: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel enw@gov.uk',
      invalid: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
      invalidGovUkEmail: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
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
