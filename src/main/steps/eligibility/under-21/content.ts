import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Check you're eligible to adopt",
  label: 'Are you, and the other applicant if relevant, both aged 21 or over?',
  one: 'Yes',
  two: 'No',
  under21Yes: 'You must be 21 or over to adopt a child. This includes any other applicant.',
  errors: {
    under21Eligible: {
      required: 'Please answer the question',
    },
  },
});

const cy = () => ({
  section: "Check you're eligible to adopt (in welsh)",
  label: 'Are you, and the other applicant if relevant, both aged 21 or over? (in welsh)',
  one: 'Yes (in welsh)',
  two: 'No (in welsh)',
  under21Yes: 'You must be 21 or over to adopt a child. This includes any other applicant. (in welsh)',
  errors: {
    under21Eligible: {
      required: 'Please answer the question (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    under21Eligible: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      labelHidden: false,
      values: [
        { label: l => l.one, value: YesOrNo.YES },
        { label: l => l.two, value: YesOrNo.NO, conditionalText: l => `<p class="govuk-label">${l.under21Yes}</p>` },
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
