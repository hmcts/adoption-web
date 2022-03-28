import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: "What is the full name of the child's birth father?",
  line1:
    "This will be on the child's full birth certificate. Ask the adoption agency or social worker if you're not sure.",
  errors: {
    birthFatherFirstNames: {
      required: 'Enter their first names',
    },
    birthFatherLastNames: {
      required: 'Enter their last names',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Beth yw enw llawn tad biolegol y plentyn?',
  line1:
    'Bydd y rhain ar dystysgrif geni llawn y plentyn. Gofynnwch i’r asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol os nad ydych yn siŵr.',
  errors: {
    birthFatherFirstNames: {
      required: 'Nac ydwdwch eu henw(au) cyntaf',
    },
    birthFatherLastNames: {
      required: 'Nac ydwdwch eu cyfenw(au)',
    },
  },
});

const fullNameFormFields = fullNameForm.fields as FormFields;
export const form: FormContent = {
  ...fullNameForm,
  fields: {
    birthFatherFirstNames: fullNameFormFields.firstNames,
    birthFatherLastNames: fullNameFormFields.lastNames,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...fullNameGenerateContent(content),
  ...languages[content.language](),
  form,
});
