import { PlacementOrder } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'What type of order is it?',
  errors: {
    placementOrderType: {
      required: 'Please answer the question',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  label: 'What type of order is it? (in Welsh)',
  errors: {
    placementOrderType: {
      required: 'Please answer the question (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const siblings = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
    const siblingPlacementOrders = siblings?.siblingPlacementOrders?.find(
      item => (item as PlacementOrder).placementOrderId === userCase.selectedSiblingPoId
    );
    return {
      placementOrderType: {
        type: 'text',
        classes: 'govuk-label',
        label: l => l.label,
        value: (siblingPlacementOrders as PlacementOrder)?.placementOrderType,
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
