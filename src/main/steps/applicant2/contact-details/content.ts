import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Second applicant',
  title: 'What are your contact details?',
  line1: 'We need both a contact email and telephone number for you.',
  line2:
    'We will email you updates and information about your application to adopt. You will only be contacted by telephone if the social worker or court staff need to contact you quickly.',
  emailAddress: 'Email address',
  phoneNumber: 'UK Phone number',
  applicant2ContactDetailsConsent:
    'The court may want to use your email to serve you court orders. Are you happy to be served court orders by email?',
  errors: {
    applicant2ContactDetailsConsent: {
      required: 'Please answer the question',
    },
    applicant2EmailAddress: {
      required: 'Enter your email address',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    applicant2PhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a valid UK telephone number',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Ail geisydd',
  title: 'Beth yw eich manylion cyswllt?',
  line1: 'Mae arnom angen cyfeiriad e-bost cyswllt a rhif ffôn cyswllt ar eich cyfer.',
  line2:
    'Byddwn yn anfon diweddariadau a gwybodaeth am eich cais i fabwysiadu trwy e-bost. Cysylltir â chi dros y ffôn dim ond os yw’r gweithiwr cymdeithasol neu staff y llys eisiau cysylltu â chi ar frys.',
  emailAddress: 'Cyfeiriad e-bost',
  phoneNumber: 'Rhif ffôn yn y DU',
  applicant2ContactDetailsConsent:
    'Efallai bydd y llys eisiau defnyddio eich cyfeiriad e-bost i gyflwyno gorchmynion llys arnoch, A ydych yn hapus i neuchmynion llys gael eu cyflwyno arnoch drwy e-bost?',
  errors: {
    applicant2ContactDetailsConsent: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
    applicant2EmailAddress: {
      required: 'Nac ydwdwch eich cyfeiriad e-bost',
      invalid: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel name@example.com',
    },
    applicant2PhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn dilys yn y DU',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2EmailAddress: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.emailAddress,
      labelSize: null,
      autocomplete: 'email',
      validator: value => isFieldFilledIn(value) || isEmailValid(value),
    },
    applicant2PhoneNumber: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.phoneNumber,
      labelSize: null,
      autocomplete: 'tel',
      validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
    },
    applicant2ContactDetailsConsent: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      labelHidden: true,
      label: l => l.applicant2ContactDetailsConsent,
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
