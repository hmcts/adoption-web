import { Gender } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  label: "What was the child's sex at birth?",
  male: 'Male',
  female: 'Female',
  other: 'Other',
  childrenOtherSexAtBirth:
    "For example, if the child's sex was intersex when they were born, you should enter exactly what is listed on the birth certificate.",
  errors: {
    childrenSexAtBirth: {
      required: 'Please select an answer',
    },
    childrenOtherSexAtBirth: {
      required: 'Enter what is written on the birth certificate',
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  label: "What was the child's sex at birth? (in welsh)",
  male: 'Male (in welsh)',
  female: 'Female (in welsh)',
  other: 'Other (in welsh)',
  childrenOtherSexAtBirth:
    "For example, if the child's sex was intersex when they were born, you should enter exactly what is listed on the birth certificate. (in welsh)",
  errors: {
    childrenSexAtBirth: {
      required: 'Please select an answer (in welsh)',
    },
    childrenOtherSexAtBirth: {
      required: 'Enter what is written on the birth certificate (in welsh)',
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
      values: [
        { label: l => l.male, value: Gender.MALE },
        { label: l => l.female, value: Gender.FEMALE },
        {
          label: l => l.other,
          value: Gender.OTHER,
          subFields: {
            childrenOtherSexAtBirth: {
              type: 'text',
              label: l => l.childrenOtherSexAtBirth,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
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
