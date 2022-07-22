import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isGovUkEmail, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  title: "Child's social worker details",
  line1: 'You can get these details from your local authority or adoption agency.',
  childSocialWorkerName: "Name of child's social worker",
  childSocialWorkerPhoneNumber: 'Phone number',
  childSocialWorkerEmail: 'Email address (if known)',
  childSocialWorkerEmailHint: 'The email address should be an official government email that ends in gov.uk.',
  childLocalAuthority: "Child's local authority",
  childLocalAuthorityEmail: 'Local authority email address',
  childLocalAuthorityEmailHint:
    'This will be used to send a notification to the local authority to progress your application so it is important that it is accurate. It should end in gov.uk.',
  childLocalAuthorityHint:
    'This is the local authority with parental responsibility for the child. It may be different to your own local authority.',
  errors: {
    childSocialWorkerName: {
      required: 'Enter a name',
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
      required: 'Enter a name',
    },
    childLocalAuthorityEmail: {
      required: 'Enter an email address in the correct format, like name@gov.uk',
      invalid: 'Enter an email address that ends in gov.uk',
      invalidGovUkEmail: 'Enter an email address that ends in gov.uk',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y cais',
  title: 'Manylion gweithiwr cymdeithasol y plentyn',
  line1: 'Gallwch gael y manylion hyn gan eich awdurdod lleol neu asiantaeth fabwysiadu.',
  childSocialWorkerName: 'Enw gweithiwr cymdeithasol y plentyn',
  childSocialWorkerPhoneNumber: 'Rhif ffôn',
  childSocialWorkerEmail: "Cyfeiriad e-bost (os yw'n hysbys)",
  childSocialWorkerEmailHint:
    "Dylai'r cyfeiriad e-bost fod yn e-bost swyddogol gan y llywodraeth sy'n terfynu â gov.uk.",
  childLocalAuthority: 'Awdurdod lleol y plentyn',
  childLocalAuthorityEmail: 'Cyfeiriad e-bost yr awdurdod lleol',
  childLocalAuthorityEmailHint:
    'This will be used to send a notification to the local authority to progress your application so it is important that it is accurate. It should end in gov.uk. (in welsh)',
  childLocalAuthorityHint:
    "Dyma'r awdurdod lleol sydd â chyfrifoldeb rhiant dros y plentyn. Gall fod yn wahanol i'ch awdurdod lleol eich hun.",
  errors: {
    childSocialWorkerName: {
      required: 'Rhowch enw',
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
      required: 'Rhowch enw',
    },
    childLocalAuthorityEmail: {
      required: 'Enter an email address in the correct format, like name@gov.uk (In Welsh)',
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
    childLocalAuthority: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.childLocalAuthority,
      hint: l => l.childLocalAuthorityHint,
      labelSize: null,
      validator: isFieldFilledIn,
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
