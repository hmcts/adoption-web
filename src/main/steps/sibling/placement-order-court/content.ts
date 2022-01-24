import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  label: 'Which court made the order?',
  errors: {
    placementOrderCourt: {
      required: 'Enter the name of the court',
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  label: 'Which court made the order? (in welsh)',
  errors: {
    placementOrderCourt: {
      required: 'Enter the name of the court (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const placementOrder = userCase.placementOrders?.find(
      item => item.placementOrderId === userCase.selectedPlacementOrderId
    );
    return {
      placementOrderCourt: {
        type: 'text',
        classes: 'govuk-label',
        label: l => l.label,
        value: placementOrder?.placementOrderCourt,
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
