import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Check you're eligible to adopt",
  title:
    'Have you and any other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for at least 12 months?',
  one: 'Yes',
  two: 'No',
  livedUKNo: 'You cannot apply to adopt a child unless you have a permanent home here.',
  errors: {
    livedUKEligible: {
      required: 'Select whether you have lived in the UK, Channel Islands or Isle of Man for at least 12 months',
    },
  },
});

const cy = () => ({
  section: "Check you're eligible to adopt (in welsh)",
  title:
    'Have you and any other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for at least 12 months? (in welsh)',
  one: 'Yes (in welsh)',
  two: 'No (in welsh)',
  livedUKNo: 'You cannot apply to adopt a child unless you have a permanent home here. (in welsh)',
  errors: {
    livedUKEligible: {
      required:
        'Select whether you have lived in the UK, Channel Islands or Isle of Man for at least 12 months (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    livedUKEligible: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      labelHidden: false,
      values: [
        { label: l => l.one, value: YesOrNo.YES },
        { label: l => l.two, value: YesOrNo.NO, conditionalText: l => `<p class="govuk-label">${l.livedUKNo}</p>` },
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
