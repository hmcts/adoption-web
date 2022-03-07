import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: "Birth mother's details",
  label: "What is the occupation of the child's birth mother?",
  hint: "Ask the adoption agency or social worker if you're not sure. If the occupation is not known, you can type 'unknown'.",
  errors: {
    birthMotherOccupation: {
      required: 'Enter an occupation',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: "Birth mother's details (in welsh)",
  label: "What is the occupation of the child's birth mother? (in welsh)",
  hint: "Ask the adoption agency or social worker if you're not sure. If the occupation is not known, you can type 'unknown'. (in welsh)",
  errors: {
    birthMotherOccupation: {
      required: 'Enter an occupation (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthMotherOccupation: {
      type: 'text',
      label: l => l.label,
      labelSize: 'l',
      hint: l => l.hint,
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

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](),
  form,
});
