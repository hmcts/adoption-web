import { Sibling } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'What is the serial or case number on the order?',
  hint: 'Ask your social worker or adoption agency if you are not sure where to find this.',
  errors: {
    placementOrderNumber: {
      required: 'Enter the serial or case number',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  label: 'What is the serial or case number on the order? (in welsh)',
  hint: 'Ask your social worker or adoption agency if you are not sure where to find this. (in welsh)',
  errors: {
    placementOrderNumber: {
      required: 'Enter the serial or case number (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const placementOrder = (userCase.siblings as Sibling[])?.find(
      item => item.siblingId === userCase.selectedSiblingPoId
    );
    return {
      placementOrderNumber: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.label,
        hint: l => l.hint,
        value: placementOrder?.siblingId,
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
