import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';

const en = () => ({
  section: "Birth mother's details",
  title: "What's your date of birth?",
  hint: 'For example, 27 3 2007',
  errors: {
    birthMotherLastAddressDate: {
      required: 'Enter your date of birth',
      invalidDate: 'Date of birth must be a real date',
      incompleteDay: 'Your date of birth must include a day',
      incompleteMonth: 'Your date of birth must include a month',
      incompleteYear: 'Your date of birth must include a year',
      invalidDateInFuture: 'Your date of birth must be in the past',
    },
  },
});

const cy = () => ({
  section: 'Manylion y fam fiolegol',
  title: 'Beth yw eich dyddiad geni?',
  hint: 'Er enghraifft, 27 3 2007',
  errors: {
    birthMotherLastAddressDate: {
      required: 'Nodwch eich dyddiad geni',
      invalidDate: 'Rhaid i’r dyddiad geni fod yn ddyddiad dilys',
      incompleteDay: 'Rhaid i’ch dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’ch dyddiad geni gynnwys mis',
      incompleteYear: 'Rhaid i’ch dyddiad geni gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’ch dyddiad geni fod yn y gorffennol',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthMotherLastAddressDate: {
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
      parser: body => covertToDateObject('birthMotherLastAddressDate', body as Record<string, unknown>),
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
