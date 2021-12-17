import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  label: 'What is the serial or case number on the placement order?',
  hint: "This is on the top right of the order. Ask the adoption agency or social worker if you're not sure.",
  errors: {
    placementOrderNumber: {
      required: 'Enter the serial or case number',
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  label: 'What is the serial or case number on the placement order? (in welsh)',
  hint: "This is on the top right of the order. Ask the adoption agency or social worker if you're not sure. (in welsh)",
  errors: {
    placementOrderNumber: {
      required: 'Enter the serial or case number (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    return {
      placementOrderNumber: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.label,
        hint: l => l.hint,
        value: userCase.placementOrders?.find(item => item.placementOrderId === userCase.selectedPlacementOrderId)
          ?.placementOrderNumber,
        labelSize: 'l',
        attributes: {
          spellcheck: false,
        },
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
