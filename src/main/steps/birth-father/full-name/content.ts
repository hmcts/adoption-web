import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';
import { SECTION, SECTION_IN_WELSH } from '../constants';

export const en = (): Record<string, unknown> => ({
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

export const cy = (): Record<string, unknown> => ({
  section: SECTION_IN_WELSH,
  title: "What is the full name of the child's birth father? (in welsh)",
  line1:
    "This will be on the child's full birth certificate. Ask the adoption agency or social worker if you're not sure. (in welsh)",
  errors: {
    birthFatherFirstNames: {
      required: 'Enter their first names (in welsh)',
    },
    birthFatherLastNames: {
      required: 'Enter their last names (in welsh)',
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
