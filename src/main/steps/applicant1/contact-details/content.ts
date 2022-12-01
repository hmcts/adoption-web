import { ApplyingWith, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

const en = content => ({
  section: content.userCase.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant',
  title: 'What are your contact details?',
  line1: 'We need both a contact email and telephone number for you.',
  line2:
    'We will email you updates and information about your application to adopt. You will only be contacted by telephone if the social worker or court staff need to contact you quickly.',
  emailAddress: 'Email address',
  phoneNumber: 'UK Phone number',
  applicant1ContactDetailsConsent:
    'The court may want to use your email to serve you court orders. Are you happy to be served court orders by email?',
  errors: {
    applicant1ContactDetailsConsent: {
      required: 'Select whether you are happy to be served court orders by email',
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
  line1: 'Mae arnom angen cyfeiriad e-bost cyswllt a rhif ffôn cyswllt ar eich cyfer.',
  line2:
    'Byddwn yn anfon diweddariadau a gwybodaeth am eich cais i fabwysiadu trwy e-bost. Cysylltir â chi dros y ffôn dim ond os yw’r gweithiwr cymdeithasol neu staff y llys eisiau cysylltu â chi ar frys.',
  emailAddress: 'Cyfeiriad e-bost',
  phoneNumber: 'Rhif ffôn yn y DU',
  applicant1ContactDetailsConsent:
    'Efallai bydd y llys eisiau defnyddio eich cyfeiriad e-bost i gyflwyno gorchmynion llys arnoch, A ydych yn hapus i neuchmynion llys gael eu cyflwyno arnoch drwy e-bost?',
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
      validator: value => isFieldFilledIn(value) || isEmailValid(value),
    },
    applicant1PhoneNumber: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.phoneNumber,
      labelSize: null,
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    applicant1ContactDetailsConsent: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.applicant1ContactDetailsConsent,
      section: l => l.section,
      labelHidden: false,
      labelSize: 'small',
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
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
