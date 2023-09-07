import { ApplyingWith } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

const en = content => ({
  section: content.userCase.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant',
  title: 'What are your contact details?',
  line1: 'We need both a contact email and telephone number for you.',
  line2:
    'Some courts will email you updates and information about your application to adopt. You will only be contacted by telephone if the social worker or court staff need to contact you quickly.',
  emailAddress: 'Email address',
  phoneNumber: 'UK phone number',
  line3: 'The court will send all court orders and notices by post to your home address.',
  applicant1ContactDetailsConsent:
    'The court may want to use your email to serve you court orders. Are you happy to be served court orders by email?',
  contactDetailsConsentNo: 'You will be served all court orders by post.',
  errors: {
    applicant1ContactDetailsConsent: {
      required: 'Select whether you are happy to be served court orders by email.',
    },
    applicant1EmailAddress: {
      required: 'Enter your email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    applicant1PhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a valid UK telephone number',
    },
  },
});

const cy: typeof en = content => ({
  section: content.userCase.applyingWith === ApplyingWith.ALONE ? 'Ceisydd' : 'Ceisydd cyntaf',
  title: 'Beth yw eich manylion cyswllt?',
  line1: 'Mae arnom angen e-bost a rhif ffôn i gysylltu â chi.',
  line2:
    'Bydd rhai llysoedd yn e-bostio diweddariadau a gwybodaeth ichi am eich cais i fabwysiadu. Dim ond os bydd y gweithiwr cymdeithasol neu staff y llys angen cysylltu â chi ar fyrder y byddant yn eich ffonio.',
  emailAddress: 'Cyfeiriad e-bost',
  phoneNumber: 'Rhif ffôn yn y DU',
  line3: 'Bydd y llys yn anfon pob hysbysiad a gorchymyn llys drwy’r post i’ch cyfeiriad cartref.',
  applicant1ContactDetailsConsent:
    'Efallai bydd y llys eisiau defnyddio eich cyfeiriad e-bost i gyflwyno gorchmynion llys arnoch, A ydych yn hapus i neuchmynion llys gael eu cyflwyno arnoch drwy e-bost?',
  contactDetailsConsentNo: 'Fe gyflwynir yr holl orchmynion llys arnoch drwy’r post.',
  errors: {
    applicant1ContactDetailsConsent: {
      required: 'Dewiswch a ydych yn hapus i gael eich gorchmynion llys drwy e-bost.',
    },
    applicant1EmailAddress: {
      required: 'Nac ydwdwch eich cyfeiriad e-bost',
      invalid: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
    },
    applicant1PhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1EmailAddress: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.emailAddress,
      labelSize: null,
      attributes: {
        autocomplete: 'email',
      },
      validator: value => isFieldFilledIn(value) || isEmailValid(value),
    },
    applicant1PhoneNumber: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.phoneNumber,
      labelSize: null,
      attributes: {
        autocomplete: 'tel',
      },
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    applicant1ContactDetailsConsent: {
      type: 'label',
      classes: 'govuk-input--width-20',
      label: l => l.line3,
      labelSize: null,
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
