import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  title: "What will the child's full name be after adoption?",
  line1: 'This will be on the adoption certificate so enter all their names as accurately as possible.',
  firstName: 'First names',
  firstNameHint: '(Include any given or middle names)',
  lastName: 'Last names',
  lastNameHint: '(Include surname or family names)',
  errors: {
    childrenFirstNameAfterAdoption: {
      required: 'Enter their first names',
    },
    childrenLastNameAfterAdoption: {
      required: 'Enter their last names',
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  title: "What will the child's full name be after adoption? (in welsh)",
  line1: 'This will be on the adoption certificate so enter all their names as accurately as possible. (in welsh)',
  firstName: 'First names (in welsh)',
  firstNameHint: '(Include any given or middle names) (in welsh)',
  lastName: 'Last names (in welsh)',
  lastNameHint: '(Include surname or family names) (in welsh)',
  errors: {
    childrenFirstNameAfterAdoption: {
      required: 'Enter their first names (in welsh)',
    },
    childrenLastNameAfterAdoption: {
      required: 'Enter their last names (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    childrenFirstNameAfterAdoption: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.firstName,
      hint: l => l.firstNameHint,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    childrenLastNameAfterAdoption: {
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
