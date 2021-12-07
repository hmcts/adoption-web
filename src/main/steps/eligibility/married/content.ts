import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Check you're eligible to adopt",
  title: 'Has the child ever been married or in a civil partnership?',
  one: 'Yes',
  two: 'No',
  errors: {
    marriedEligible: {
      required: 'Select whether the child has ever been married or in a civil partnership',
    },
  },
});

const cy = () => ({
  section: "Check you're eligible to adopt (in welsh)",
  title: 'Has the child ever been married or in a civil partnership? (in welsh)',
  one: 'Yes (in welsh)',
  two: 'No (in welsh)',
  errors: {
    marriedEligible: {
      required: 'Select whether the child has ever been married or in a civil partnership (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    marriedEligible: {
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
