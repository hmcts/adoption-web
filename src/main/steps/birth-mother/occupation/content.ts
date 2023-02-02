import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Birth mother's details",
  label: "What is the occupation of the child's birth mother?",
  errors: {
    birthMotherOccupation: {
      required: 'Enter an occupation',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y fam fiolegol',
  label: 'Beth yw galwedigaeth mam fiolegol y plentyn?',
  errors: {
    birthMotherOccupation: {
      required: 'Nac ydwdwch alwedigaeth',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthMotherOccupation: {
      type: 'text',
      label: l => l.label,
      labelSize: 'l',
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
