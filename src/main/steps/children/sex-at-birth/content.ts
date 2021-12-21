import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  label: "What was the child's sex at birth?",
  hint: "You should state exactly what is listed on the birth certificate. If the child's sex is listed as 'diverse', which means their biological sex could not be determined, you should choose the 'intersex' option.",
  male: 'Male',
  female: 'Female',
  intersex: 'Intersex',
  errors: {
    childrenSexAtBirth: {
      required: 'Select the number of people applying to adopt',
    },
  },
});

const cy = () => ({
  section: 'Applicant details (in welsh)',
  label: "What was the child's sex at birth? (in welsh)",
  male: "I'm applying on my own (in welsh)",
  two: "I'm applying with my spouse or civil partner (in welsh)",
  three: "I'm applying with someone who is not my spouse or civil partner (in welsh)",
  errors: {
    childrenSexAtBirth: {
      required: 'Select the number of people applying to adopt (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    childrenSexAtBirth: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [
        { label: l => l.male, value: 'male' },
        { label: l => l.female, value: 'female' },
        { label: l => l.intersex, value: 'intersex' },
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