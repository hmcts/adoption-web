import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';

const en = () => ({
  section: "Birth mother's details",
  title: "What is the full name of the child's birth mother?",
  errors: {
    birthMotherFirstNames: {
      required: 'Enter their first names',
    },
    birthMotherLastNames: {
      required: 'Enter their last names',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y fam fiolegol',
  title: 'Beth yw enw llawn mam fiolegol y plentyn?',
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
