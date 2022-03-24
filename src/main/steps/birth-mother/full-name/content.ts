import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';

export const en = (): Record<string, unknown> => ({
  section: "Birth mother's details",
  title: "What is the full name of the child's birth mother?",
  line1:
    "This will be on the child's full birth certificate. Ask the adoption agency or social worker if you're not sure.",
  errors: {
    birthMotherFirstNames: {
      required: 'Enter their first names',
    },
    birthMotherLastNames: {
      required: 'Enter their last names',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Manylion y fam fiolegol',
  title: 'Beth yw enw llawn mam fiolegol y plentyn?',
  line1:
    'Bydd y rhain ar dystysgrif geni llawn y plentyn. Gofynnwch i’r asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol os nad ydych yn siŵr.',
  errors: {
    birthMotherFirstNames: {
      required: 'Nac ydwdwch eu henw(au) cyntaf',
    },
    birthMotherLastNames: {
      required: 'Nac ydwdwch eu cyfenw(au)',
    },
  },
});

const fullNameFormFields = fullNameForm.fields as FormFields;
export const form: FormContent = {
  ...fullNameForm,
  fields: {
    birthMotherFirstNames: fullNameFormFields.firstNames,
    birthMotherLastNames: fullNameFormFields.lastNames,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const fullNameContent = fullNameGenerateContent(content);
  return {
    ...fullNameContent,
    ...languages[content.language](),
    form,
  };
};
