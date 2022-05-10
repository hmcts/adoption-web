import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'What is their relationship to the child being adopted?',
  hint: 'For instance, brother or half sister',
  errors: {
    siblingRelation: {
      required: 'Placeholder error message',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  label: 'What is their relationship to the child being adopted? (in welsh)',
  hint: 'For instance, brother or half sister (in welsh)',
  errors: {
    siblingRelation: {
      required: 'Placeholder error message (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
    return {
      siblingRelation: {
        type: 'text',
        classes: 'govuk-input govuk-input--width-20',
        label: l => l.label,
        labelSize: 'l',
        hint: l => l.hint,
        value: sibling?.siblingRelation,
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
