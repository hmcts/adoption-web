import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';

const en = () => ({
  section: 'Second applicant',
  title: "What's your date of birth?",
  hint: 'For example, 28 6 1997',
  errors: {
    applicant2DateOfBirth: {
      required: 'Enter your date of birth',
      invalidDate: 'Date of birth must be a real date',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDateInFuture: 'Date of birth must be in the past',
      incompleteDayAndMonth: 'Date of birth must include a day and month',
      incompleteDayAndYear: 'Date of birth must include a day and year',
      incompleteMonthAndYear: 'Date of birth must include a month and year ',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Ail geisydd',
  title: 'Beth yw eich dyddiad geni?',
  hint: 'Er enghraifft, 28 6 1997',
  errors: {
    applicant2DateOfBirth: {
      required: 'Nac ydwdwch eich dyddiad geni',
      invalidDate: 'Rhaid i’r dyddiad geni fod yn ddyddiad dilys',
      incompleteDay: 'Rhaid i’r dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad geni gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad geni gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’ch dyddiad geni fod yn y gorffennol',
      incompleteDayAndMonth: 'Rhaid i’r dyddiad geni gynnwys diwrnod a mis',
      incompleteDayAndYear: 'Rhaid i’r dyddiad geni gynnwys diwrnod a blwyddyn',
      incompleteMonthAndYear: 'Rhaid i’r dyddiad geni gynnwys mis a blwyddyn',
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
