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
      required: 'Please answer the question',
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

const cy = content => ({
  section: content?.userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant (in welsh)',
  title: 'What are your contact details? (in welsh)',
  line1: 'We need both a contact email and telephone number for you. (in welsh)',
  line2:
    'We will email you updates and information about your application to adopt. You will only be contacted by telephone if the social worker or court staff need to contact you quickly. (in welsh)',
  emailAddress: 'Email address (in welsh)',
  phoneNumber: 'UK Phone number (in welsh)',
  applicant1ContactDetailsConsent:
    'The court may want to use your email to serve you court orders. Are you happy to be served court orders by email? (in welsh)',
  errors: {
    applicant1ContactDetailsConsent: {
      required: 'Please answer the question (in welsh)',
    },
    applicant1EmailAddress: {
      required: 'Enter your email address (in welsh)',
      invalid: 'Enter an email address in the correct format, like name@example.com (in welsh)',
    },
    applicant1PhoneNumber: {
      required: 'Enter a UK telephone number (in welsh)',
      invalid: 'Enter a valid UK telephone number (in welsh)',
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
