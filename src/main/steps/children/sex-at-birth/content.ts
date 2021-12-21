import { Gender } from '../../../app/case/definition';
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
      required: 'Please select an answer',
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  label: "What was the child's sex at birth? (in welsh)",
  hint: "You should state exactly what is listed on the birth certificate. If the child's sex is listed as 'diverse', which means their biological sex could not be determined, you should choose the 'intersex' option. (in welsh)",
  male: 'Male (in welsh)',
  female: 'Female (in welsh)',
  intersex: 'Intersex (in welsh)',
  errors: {
    childrenSexAtBirth: {
      required: 'Please select an answer (in welsh)',
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
        { label: l => l.male, value: Gender.MALE },
        { label: l => l.female, value: Gender.FEMALE },
        { label: l => l.intersex, value: Gender.INTERSEX },
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
