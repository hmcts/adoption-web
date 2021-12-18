import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  label: 'What date is on the placement order?',
  hint: 'For example, 31 3 2020',
  errors: {
    placementOrderNumber: {
      required: 'Enter the serial or case number',
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  label: 'What date is on the placement order? (in welsh)',
  hint: 'For example, 31 3 2020 (in welsh)',
  errors: {
    placementOrderDate: {
      required: 'Enter the serial or case number (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    return {
      placementOrderDate: {
        type: 'date',
        classes: 'govuk-date-input',
        label: l => l.label,
        hint: l => l.hint,
        value: userCase.placementOrders?.find(item => item.placementOrderId === userCase.selectedPlacementOrderId)
          ?.placementOrderDate,
        labelSize: 'l',
        attributes: {
          spellcheck: false,
        },
        values: [
          {
            label: l => l.dateFormat['day'],
            name: 'day',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2 },
          },
          {
            label: l => l.dateFormat['month'],
            name: 'month',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2 },
          },
          {
            label: l => l.dateFormat['year'],
            name: 'year',
            classes: 'govuk-input--width-4',
            attributes: { maxLength: 4 },
          },
        ],
        parser: body => covertToDateObject('placementOrderDate', body as Record<string, unknown>),
        validator: value =>
          areDateFieldsFilledIn(value as CaseDate) ||
          isDateInputInvalid(value as CaseDate) ||
          isFutureDate(value as CaseDate),
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
