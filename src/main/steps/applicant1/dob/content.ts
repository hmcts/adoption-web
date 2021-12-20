import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: 'Primary applicant',
  title: "What's your date of birth?",
  hint: 'For example, 28 6 1997',
  errors: {
    dateOfBirth: {
      required: 'You have not entered a date. Enter a date to continue.',
      invalidDate: 'You have entered an invalid date. Enter the date using the following format: 28 6 1997.',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002.',
      invalidDateInFuture:
        'You have entered a date that is in the future. Enter a date that is in the past before continuing.',
      invalidDateTooFarInPast: 'You have entered a year which is too far in the past.',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Primary applicant (in Welsh)',
  title: "What's your date of birth? (in Welsh)",
  hint: 'For example, 28 6 1997 (in Welsh)',
  errors: {
    dateOfBirth: {
      required: 'You have not entered a date. Enter a date to continue. (in Welsh)',
      invalidDate: 'You have entered an invalid date. Enter the date using the following format: 28 6 1997. (in Welsh)',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002. (in Welsh)',
      invalidDateInFuture:
        'You have entered a date that is in the future. Enter a date that is in the past before continuing. (in Welsh)',
      invalidDateTooFarInPast: 'You have entered a year which is too far in the past. (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    dateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.title,
      labelHidden: true,
      hint: l => l.hint,
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
      parser: body => covertToDateObject('dateOfBirth', body as Record<string, unknown>),
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate),
    },
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

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](),
  form,
});
