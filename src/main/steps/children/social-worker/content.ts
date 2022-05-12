import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  title: "Child's social worker details",
  line1: 'You can get these details from your local authority or adoption agency.',
  socialWorkerName: "Name of child's social worker",
  socialWorkerPhoneNumber: 'Phone number',
  socialWorkerEmail: 'Email address',
  childLocalAuthority: "Child's local authority",
  childLocalAuthorityHint:
    'This is the local authority with parental responsibility for the child. It may be different to your own local authority.',
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
    childLocalAuthority: {
      invalid: 'Enter a name',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Application details (in welsh)',
  title: "Child's social worker details (in welsh)",
  line1: 'You can get these details from your local authority or adoption agency. (in welsh)',
  socialWorkerName: "Name of child's social worker (in welsh)",
  socialWorkerPhoneNumber: 'Phone number (in welsh)',
  socialWorkerEmail: 'Email address (in welsh)',
  childLocalAuthority: "Child's local authority (in welsh)",
  childLocalAuthorityHint:
    'This is the local authority with parental responsibility for the child. It may be different to your own local authority. (in welsh)',
  errors: {
    socialWorkerName: {
      required: 'Enter a name (in welsh)',
    },
    socialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number (in welsh)',
      invalid: 'Enter a UK telephone number (in welsh)',
    },
    socialWorkerEmail: {
      required: 'Enter an email address (in welsh)',
      invalid: 'Enter an email address in the correct format, like name@example.com (in welsh)',
    },
    childLocalAuthority: {
      invalid: 'Enter a name (in welsh)',
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
    childLocalAuthority: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.childLocalAuthority,
      hint: l => l.childLocalAuthorityHint,
      labelSize: null,
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
