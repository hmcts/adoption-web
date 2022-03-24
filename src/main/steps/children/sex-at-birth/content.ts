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
  section: 'Manylion y plentyn',
  label: 'Beth oedd rhyw’r plentyn pan gafodd ei (g)eni?',
  male: 'Gwryw',
  female: 'Benyw',
  other: 'Arall',
  childrenOtherSexAtBirth:
    'Er enghraifft, os mai rhyngrywiol oedd rhyw y plentyn pan gafodd ei eni, dylech nodi’n union yr hyn sydd wedi’i restru ar y dystysgrif geni.',
  errors: {
    childrenSexAtBirth: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
    childrenOtherSexAtBirth: {
      required: 'Nac ydwdwch yr hyn sydd wedi’i ysgrifennu ar y dystysgrif geni.',
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
