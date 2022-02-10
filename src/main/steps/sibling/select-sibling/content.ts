import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { defaultButtons } from '../../../steps/common/components/common/default-buttons';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'What sibling or half-sibling do you want to add a court order for?',
  addAnotherSibling: 'Add a different sibling or half-sibling',
  errors: {
    selectedSiblingId: {
      required: 'Please answer the question',
    },
    siblingFirstName: {
      required: 'Enter their first names',
    },
    siblingLastNames: {
      required: 'Enter their last names',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  label: 'What sibling or half-sibling do you want to add a court order for? (in Welsh)',
  addAnotherSibling: 'Add a different sibling or half-sibling (in Welsh)',
  errors: {
    selectedSiblingId: {
      required: 'Please answer the question (in Welsh)',
    },
    siblingFirstName: {
      required: 'Enter their first names (in Welsh)',
    },
    siblingLastNames: {
      required: 'Enter their last names (in Welsh)',
    },
  },
});

const fullNameFormFields = fullNameForm.fields as FormFields;
export const form: FormContent = {
  fields: userCase => ({
    selectedSiblingId: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        ...(userCase.siblings || []).map(sibling => ({
          label: `${sibling.siblingFirstName} ${sibling.siblingLastNames}`,
          value: sibling.siblingId,
        })),
        {
          label: l => l.addAnotherSibling,
          value: 'addAnotherSibling',
          subFields: {
            siblingFirstName: fullNameFormFields.firstNames,
            siblingLastNames: fullNameFormFields.lastNames,
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  }),
  ...defaultButtons,
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const fullNameContent = fullNameGenerateContent(content);
  const translations = languages[content.language]();
  return {
    ...fullNameContent,
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
