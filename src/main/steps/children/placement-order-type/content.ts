import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  label: 'What type of order is it?',
  errors: {
    placementOrderType: {
      required: 'Please answer the question',
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  label: 'What type of order is it? (in welsh)',
  errors: {
    placementOrderType: {
      required: 'Please answer the question (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const placementOrder = userCase.placementOrders?.find(
      item => item.placementOrderId === userCase.selectedPlacementOrderId
    );
    return {
      placementOrderType: {
        type: 'text',
        classes: 'govuk-label',
        label: l => l.label,
        value: placementOrder?.placementOrderType,
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
