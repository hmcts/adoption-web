import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: 'Second applicant',
  title: "What's your date of birth?",
  hint: 'For example, 28 6 1997',
  errors: {
    applicant2DateOfBirth: {
      required: 'Enter your date of birth',
      invalidDate: 'Date of birth must be a real date',
      incompleteDay: 'Your date of birth must include a day',
      incompleteMonth: 'Your date of birth must include a month',
      incompleteYear: 'Your date of birth must include a year',
      invalidDateInFuture: 'Your date of birth must be in the past',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Second applicant (in Welsh)',
  title: "What's your date of birth? (in Welsh)",
  hint: 'For example, 28 6 1997 (in Welsh)',
  errors: {
    applicant2DateOfBirth: {
      required: 'Enter your date of birth (in Welsh)',
      invalidDate: 'Date of birth must be a real date (in Welsh)',
      incompleteDay: 'Your date of birth must include a day (in Welsh)',
      incompleteMonth: 'Your date of birth must include a month (in Welsh)',
      incompleteYear: 'Your date of birth must include a year (in Welsh)',
      invalidDateInFuture: 'Your date of birth must be in the past (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2DateOfBirth: {
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
      parser: body => covertToDateObject('applicant2DateOfBirth', body as Record<string, unknown>),
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
