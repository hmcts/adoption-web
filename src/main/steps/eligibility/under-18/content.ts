import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Check you're eligible to adopt",
  title: 'Will the child be under 18 years old on the date you submit your application?',
  one: 'Yes',
  two: 'No',
  errors: {
    under18Eligible: {
      required: 'Select whether the child will be under 18 when you submit the application',
    },
  },
});

const cy = () => ({
  section: "Check you're eligible to adopt (in welsh)",
  title: 'Will the child be under 18 years old on the date you submit your application? (in welsh)',
  one: 'Yes (in welsh)',
  two: 'No (in welsh)',
  errors: {
    under18Eligible: {
      required: 'Select whether the child will be under 18 when you submit the application (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    under18Eligible: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      labelHidden: false,
      values: [
        { label: l => l.one, value: 'yes' },
        { label: l => l.two, value: 'no' },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: '',
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
