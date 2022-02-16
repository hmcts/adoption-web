import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  section: 'Application details',
  title: 'When did the child move in with you?',
  hint: 'Enter the date when they started living with you continuously. For example, 31 3 2020.',
  warning:
    'You can begin your application at any time, but you can only submit 10 weeks after the date the child started living continuously with you.',
  errors: {
    dateChildMovedIn: {
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
  section: 'Application details (in Welsh)',
  title: 'When did the child move in with you? (in Welsh)',
  hint: 'Enter the date when they started living with you continuously. For example, 31 3 2020. (in Welsh)',
  warning:
    'You can begin your application at any time, but you can only submit 10 weeks after the date the child started living continuously with you. (in Welsh)',
  errors: {
    dateChildMovedIn: {
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
    dateChildMovedIn: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.title,
      labelHidden: true,
      hint: l => l.hint,
      warning: l => l.warning,
      values: [
        {
          label: l => l.dateFormat['day'],
          name: 'day',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['month'],
          name: 'month',
          classes: 'govuk-input--width-2',
          attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
        },
        {
          label: l => l.dateFormat['year'],
          name: 'year',
          classes: 'govuk-input--width-4',
          attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
        },
      ],
      parser: body => covertToDateObject('dateChildMovedIn', body as Record<string, unknown>),
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
