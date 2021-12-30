import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Check you're eligible to adopt",
  label: 'Will the child be under 18 years old on the date you submit your application?',
  one: 'Yes',
  two: 'No',
  under18No:
    'You can only apply to adopt a child if they are under 18 years old on the date your application is submitted.',
  errors: {
    under18Eligible: {
      required: 'Please answer the question',
    },
  },
});

const cy = () => ({
  section: "Check you're eligible to adopt (in welsh)",
  label: 'Will the child be under 18 years old on the date you submit your application? (in welsh)',
  one: 'Yes (in welsh)',
  two: 'No (in welsh)',
  under18No:
    'You can only apply to adopt a child if they are under 18 years old on the date your application is submitted. (in welsh)',
  errors: {
    under18Eligible: {
      required: 'Please answer the question (in welsh)',
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
        { label: l => l.one, value: YesOrNo.YES },
        { label: l => l.two, value: YesOrNo.NO, conditionalText: l => `<p class="govuk-label">${l.under18No}</p>` },
      ],
      validator: isFieldFilledIn,
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
