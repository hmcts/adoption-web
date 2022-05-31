import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: 'Local authority',
  label: 'What is the adoption case reference number?',
  hint: 'Some hint text here',
  errors: {
    caseRef: {
      required: 'Please answer the question',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Local authority (in welsh)',
  label: 'What is the adoption case reference number? (in welsh)',
  hint: 'Some hint text here (in welsh)',
  errors: {
    caseRef: {
      required: 'Please answer the question (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    caseRef: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.label,
      hint: l => l.hint,
      labelSize: 'l',
      attributes: {
        spellcheck: false,
      },
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
