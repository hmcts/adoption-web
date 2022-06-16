import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Birth father's details",
  label: "What is the occupation of the child's birth father?",
  errors: {
    birthFatherOccupation: {
      required: 'Enter an occupation',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y tad biolegol',
  label: 'Beth yw galwedigaeth tad biolegol y plentyn?',
  errors: {
    birthFatherOccupation: {
      required: 'Nac ydwdwch alwedigaeth',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthFatherOccupation: {
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
