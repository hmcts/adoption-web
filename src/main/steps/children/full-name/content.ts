import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  title: "What is the child's full name?",
  line1:
    "Enter the child's full name, as it's written on their birth certificate. Ask the adoption agency or social worker if you're not sure.",
  firstName: 'First names',
  firstNameHint: '(Include any given or middle names)',
  lastName: 'Last names',
  lastNameHint: '(Include surname or family names)',
  errors: {
    childrenFirstName: {
      required: "Enter the child's first names",
    },
    childrenLastName: {
      required: "Enter the child's last names",
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  title: "What is the child's full name? (in welsh)",
  line1:
    "Enter the child's full name, as it's written on their birth certificate. Ask the adoption agency or social worker if you're not sure. (in welsh)",
  firstName: 'First names (in welsh)',
  firstNameHint: '(Include any given or middle names) (in welsh)',
  lastName: 'Last names (in welsh)',
  lastNameHint: '(Include surname or family names) (in welsh)',
  errors: {
    childrenFirstName: {
      required: "Enter the child's first names (in welsh)",
    },
    childrenLastName: {
      required: "Enter the child's last names (in welsh)",
    },
  },
});

export const form: FormContent = {
  fields: {
    childrenFirstName: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.firstName,
      hint: l => l.firstNameHint,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    childrenLastName: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.lastName,
      hint: l => l.lastNameHint,
      labelSize: null,
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};