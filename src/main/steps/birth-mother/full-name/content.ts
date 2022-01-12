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
  section: "Birth mother's details (in welsh)",
  title: "What is the full name of the child's birth mother? (in welsh)",
  line1:
    "This will be on the child's full birth certificate. Ask the adoption agency or social worker if you're not sure. (in welsh)",
  errors: {
    birthMotherFirstNames: {
      required: 'Enter their first names (in welsh)',
    },
    birthMotherLastNames: {
      required: 'Enter their last names (in welsh)',
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
