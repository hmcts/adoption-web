import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'Which siblings or half siblings have a court order in place?',
  line1:
    'We need details of all siblings or half siblings with a court order in place. You will be asked to complete details for each of them in turn.',
  firstName: 'First names',
  firstNameHint: '(Include any given or middle names)',
  lastName: 'Last names',
  lastNameHint: '(Include surname or family names)',
  errors: {
    siblingFirstName: {
      required: "Enter the child's first names",
    },
    siblingLastNames: {
      required: "Enter the child's last names",
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  title: 'Which siblings or half siblings have a court order in place? (in welsh)',
  line1:
    "Enter the child's full name, as it's written on their birth certificate. Ask the adoption agency or social worker if you're not sure. (in welsh)",
  firstName: 'First names (in welsh)',
  firstNameHint: '(Include any given or middle names) (in welsh)',
  lastName: 'Last names (in welsh)',
  lastNameHint: '(Include surname or family names) (in welsh)',
  errors: {
    siblingFirstName: {
      required: "Enter the child's first names (in welsh)",
    },
    siblingLastNames: {
      required: "Enter the child's last names (in welsh)",
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const siblings = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
    return {
      siblingFirstName: {
        type: 'text',
        classes: 'govuk-label',
        label: l => l.firstName,
        value: siblings?.siblingFirstName,
        hint: l => l.firstNameHint,
        validator: isFieldFilledIn,
      },
      siblingLastNames: {
        type: 'text',
        classes: 'govuk-label',
        label: l => l.lastName,
        value: siblings?.siblingLastNames,
        hint: l => l.lastNameHint,
        validator: isFieldFilledIn,
      },
    };
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
