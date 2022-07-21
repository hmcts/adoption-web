import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isGovUkEmail, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  title: 'Your social worker details',
  line1: 'This is the social worker attached to your local authority.',
  applicantSocialWorkerName: 'Name of your social worker',
  applicantSocialWorkerNameHint: 'If you do not yet have a social worker, insert the name of your contact.',
  applicantSocialWorkerPhoneNumber: 'Phone number',
  applicantSocialWorkerEmail: 'Email address (if known)',
  applicantSocialWorkerEmailHint: 'The email address should be an official government email that ends in gov.uk.',
  applicantLocalAuthority: 'Name of local authority',
  applicantLocalAuthorityEmail: 'Your local authority email address',
  applicantLocalAuthorityEmailHint:
    'This will be used to send a notification to the local authority to progress your application so it is important that it is accurate. It should end in gov.uk.',
  applicantLocalAuthorityHint:
    'This is the local authority that your social worker works for. They will be named on the placement order if you are not sure.',
  errors: {
    applicantSocialWorkerName: {
      required: 'Enter a name',
    },
    applicantSocialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    applicantSocialWorkerEmail: {
      invalid: 'Enter an email address in the correct format, like name@gov.uk',
      invalidGovUkEmail: 'Enter an email address that ends in gov.uk',
    },
    applicantLocalAuthority: {
      required: 'Enter a name',
    },
    applicantLocalAuthorityEmail: {
      required: 'Enter an email address in the correct format, like name@gov.uk',
      invalid: 'Enter an email address in the correct format, like name@gov.uk',
      invalidGovUkEmail: 'Enter an email address that ends in gov.uk',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y cais',
  title: 'Manylion eich gweithiwr cymdeithasol',
  line1: "Dyma'r gweithiwr cymdeithasol sydd yn gweithio i’ch awdurdod lleol.",
  applicantSocialWorkerName: 'Enw eich gweithiwr cymdeithasol',
  applicantSocialWorkerNameHint: 'Os nad oes gennych weithiwr cymdeithasol eto, rhowch enw eich cyswllt.',
  applicantSocialWorkerPhoneNumber: 'Rhif ffôn',
  applicantSocialWorkerEmail: "Cyfeiriad e-bost (os yw'n hysbys)",
  applicantSocialWorkerEmailHint:
    "Dylai'r cyfeiriad e-bost fod yn e-bost swyddogol gan y llywodraeth sy'n terfynu â gov.uk.",
  applicantLocalAuthority: "Enw'r awdurdod lleol",
  applicantLocalAuthorityEmail: 'Cyfeiriad e-bost eich awdurdod lleol',
  applicantLocalAuthorityEmailHint:
    'This will be used to send a notification to the local authority to progress your application so it is important that it is accurate. It should end in gov.uk. (in welsh)',
  applicantLocalAuthorityHint:
    "Dyma'r awdurdod lleol y mae eich gweithiwr cymdeithasol yn gweithio iddo. Bydd wedi’i enwi ar y gorchymyn lleoli os nad ydych yn siŵr.",
  errors: {
    applicantSocialWorkerName: {
      required: 'Rhowch enw',
    },
    applicantSocialWorkerPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    applicantSocialWorkerEmail: {
      invalid: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
      invalidGovUkEmail: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
    },
    applicantLocalAuthority: {
      required: 'Rhowch enw',
    },
    applicantLocalAuthorityEmail: {
      required: 'Enter an email address in the correct format, like name@gov.uk (In Welsh)',
      invalid: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
      invalidGovUkEmail: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
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
    applicantLocalAuthority: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.applicantLocalAuthority,
      hint: l => l.applicantLocalAuthorityHint,
      labelSize: null,
      validator: isFieldFilledIn,
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
