import { ApplyingWith } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: 'Applicant details',
  label: 'Are you applying on your own, or with someone else?',
  one: "I'm applying on my own",
  two: "I'm applying with my spouse or civil partner",
  three: "I'm applying with someone who is not my spouse or civil partner",
  errors: {
    applyingWith: {
      required: 'Select the number of people applying to adopt',
    },
  },
});

const cy = () => ({
  section: 'Applicant details (in welsh)',
  label: 'Are you applying on your own, or with someone else?(in welsh)',
  one: "I'm applying on my own (in welsh)",
  two: "I'm applying with my spouse or civil partner (in welsh)",
  three: "I'm applying with someone who is not my spouse or civil partner (in welsh)",
  errors: {
    applyingWith: {
      required: 'Select the number of people applying to adopt (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applyingWith: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        { label: l => l.one, value: ApplyingWith.ALONE },
        { label: l => l.two, value: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
        { label: l => l.three, value: ApplyingWith.WITH_SOME_ONE_ELSE },
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
