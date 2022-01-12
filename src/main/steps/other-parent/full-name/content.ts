import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';
import { SECTION, SECTION_IN_WELSH } from '../constants';

export const en = (): Record<string, unknown> => ({
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

export const cy = (): Record<string, unknown> => ({
  section: SECTION_IN_WELSH,
  title: 'What is the full name of the other person with parental responsibility? (in Welsh)',
  line1: 'If you are not sure, ask your social worker or adoption agency for help. (in Welsh)',
  errors: {
    otherParentFirstNames: {
      required: 'Enter their first names (in Welsh)',
    },
    otherParentLastNames: {
      required: 'Enter their last names (in Welsh)',
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
