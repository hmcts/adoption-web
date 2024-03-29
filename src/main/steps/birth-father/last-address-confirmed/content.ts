import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';

const en = () => ({
  section: "Birth father's details",
  title: 'When was the last date this address was confirmed?',
  errors: {
    birthFatherLastAddressDate: {
      required: 'Enter the last date the birth father’s address was confirmed',
      invalidDate: 'Date must be a real date',
      invalidDateInFuture: 'Date must be in the past',
      incompleteDay: 'Enter a day',
      incompleteMonth: 'Enter a month',
      incompleteYear: 'Enter a year',
      incompleteDayAndMonth: 'Enter a day and month',
      incompleteMonthAndYear: 'Enter a month and year',
      incompleteDayAndYear: 'Enter a day and year',
    },
  },
});

const cy = () => ({
  section: 'Manylion y tad genedigol',
  title: 'Beth oedd y dyddiad gafodd y cyfeiriad hwn ei gadarnhau ddiwethaf?',
  errors: {
    birthFatherLastAddressDate: {
      required: 'Nodwch y dyddiad diwethaf y cafwyd cadarnhad o gyfeiriad y tad biolegol',
      invalidDate: 'Rhaid i’r dyddiad fod yn ddyddiad dilys',
      invalidDateInFuture: 'Rhaid i’r dyddiad fod yn y gorffennol',
      incompleteDay: 'Nodwch ddiwrnod',
      incompleteMonth: 'Nodwch fis',
      incompleteYear: 'Nodwch flwyddyn',
      incompleteDayAndMonth: 'Nodwch ddiwrnod a blwyddyn',
      incompleteMonthAndYear: 'Nodwch fis a blwyddyn',
      incompleteDayAndYear: 'Nodwch ddiwrnod a blwyddyn',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthFatherLastAddressDate: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.title,
      labelHidden: true,
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
      parser: body => covertToDateObject('birthFatherLastAddressDate', body as Record<string, unknown>),
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
