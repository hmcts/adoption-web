import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: 'Applicant details',
  title: 'Are you applying on your own, or with someone else?',
  one: "I'm applying on my own",
  two: "I'm applying with my spouse or civil partner",
  three: "I'm applying with someone who is not my spouse or civil partner",
  errors: {
    noOfApplicants: {
      required: 'Select the number of people applying to adopt',
    },
  },
});

const cy = () => ({
  section: 'Applicant details (in welsh)',
  title: 'Are you applying on your own, or with someone else?(in welsh)',
  one: "I'm applying on my own (in welsh)",
  two: "I'm applying with my spouse or civil partner (in welsh)",
  three: "I'm applying with someone who is not my spouse or civil partner (in welsh)",
  errors: {
    noOfApplicants: {
      required: 'Select the number of people applying to adopt (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    noOfApplicants: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      labelHidden: false,
      values: [
        { label: l => l.one, value: 'alone' },
        { label: l => l.two, value: 'withSpouseOrCivilPartner' },
        { label: l => l.three, value: 'withSomeoneElse' },
      ],
      validator: value => isFieldFilledIn(value),
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
