import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'What is the full name of the other person with parental responsibility?',
  line1: 'If you are not sure, ask your social worker or adoption agency for help.',
  errors: {
    otherParentFirstNames: {
      required: 'Enter their first names',
    },
    otherParentLastNames: {
      required: 'Enter their last names',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Beth yw enw llawn yr unigolyn arall sydd â chyfrifoldeb rhiant?',
  line1: 'Os nad ydych yn siŵr, holwch gyda’ch gweithiwr cymdeithasol, neu’ch asiantaeth fabwysiadu i gael cymorth.',
  errors: {
    otherParentFirstNames: {
      required: 'Nac ydwdwch eu henw(au) cyntaf',
    },
    otherParentLastNames: {
      required: 'Nac ydwdwch eu cyfenw(au)',
    },
  },
});

const fullNameFormFields = fullNameForm.fields as FormFields;
export const form: FormContent = {
  ...fullNameForm,
  fields: {
    otherParentFirstNames: fullNameFormFields.firstNames,
    otherParentLastNames: fullNameFormFields.lastNames,
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
