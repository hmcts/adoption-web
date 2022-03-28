import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Birth mother's details",
  label: "What is the occupation of the child's birth mother?",
  hint: "Ask the adoption agency or social worker if you're not sure. If the occupation is not known, you can type 'unknown'.",
  errors: {
    birthMotherOccupation: {
      required: 'Enter an occupation',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y fam fiolegol',
  label: 'Beth yw galwedigaeth mam fiolegol y plentyn?',
  hint: 'Gofynnwch i’ch asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol os nad ydych yn siŵr. Os yw’r galwedigaeth yn anhysbys, gallwch deipio ‘anhysbys’.',
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
