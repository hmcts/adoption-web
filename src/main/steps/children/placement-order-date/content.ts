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
    placementOrderDate: {
      required: 'Enter the placement order date',
      invalidDate: 'Date must include a [day/month/year]',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002.',
      invalidDateInFuture: 'Date must be in the past',
      invalidDateTooFarInPast: 'You have entered a year which is too far in the past. Enter the year you got married.',
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  label: 'What date is on the placement order? (in welsh)',
  hint: 'For example, 31 3 2020 (in welsh)',
  errors: {
    placementOrderDate: {
      required: 'Enter the placement order date (in welsh)',
      invalidDate: 'Date must include a [day/month/year] (in welsh)',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002. (in welsh)',
      invalidDateInFuture: 'Date must be in the past (in welsh)',
      invalidDateTooFarInPast:
        'You have entered a year which is too far in the past. Enter the year you got married. (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const placementOrderDate = userCase.placementOrders?.find(
      item => item.placementOrderId === userCase.selectedPlacementOrderId
    )?.placementOrderDate;
    return {
      placementOrderDate: {
        type: 'date',
        classes: 'govuk-date-input',
        label: l => l.label,
        hint: l => l.hint,
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
            value: placementOrderDate?.day,
          },
          {
            label: l => l.dateFormat['month'],
            name: 'month',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2 },
            value: placementOrderDate?.month,
          },
          {
            label: l => l.dateFormat['year'],
            name: 'year',
            classes: 'govuk-input--width-4',
            attributes: { maxLength: 4 },
            value: placementOrderDate?.year,
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
