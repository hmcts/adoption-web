import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'What is the serial or case number on the order?',
  errors: {
    siblingPoNumber: {
      required: 'Enter the order’s serial or case number',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Beth yw’r rhif cyfresol neu rif yr achos ar y gorchymyn?',
  errors: {
    siblingPoNumber: {
      required: 'Nodwch y rhif cyfresol y gorchymyn neu rif yr achos',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
    return {
      siblingPoNumber: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.title,
        value: sibling?.siblingPoNumber,
        labelSize: 'l',
        labelHidden: true,
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
