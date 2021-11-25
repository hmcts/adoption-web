import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ required }) => ({
  title: 'Are you applying on your own, or with someone else?',
  one: "I'm applying on my own",
  two: "I'm applying with my spouse or civil partner",
  three: "I'm applying with someone who is not my spouse or civil partner",
  errors: {
    noOfApplicants: {
      required,
    },
  },
});

const cy = ({ required }) => ({
  title: 'Are you applying on your own, or with someone else?(in welsh)',
  one: "I'm applying on my own",
  two: "I'm applying with my spouse or civil partner",
  three: "I'm applying with someone who is not my spouse or civil partner",
  errors: {
    noOfApplicants: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    noOfApplicants: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.one, value: "I'm applying on my own" },
        { label: l => l.two, value: "I'm applying with my spouse or civil partner" },
        { label: l => l.three, value: "I'm applying with someone who is not my spouse or civil partner" },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
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
