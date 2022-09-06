import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';

const en = () => ({
  section: "Other parent's details",
  title: 'When was the last date this address was confirmed?',
  errors: {
    otherParentLastAddressDate: {
      required: 'Enter date',
      invalidDate: 'Date must be a real date',
      incompleteDay: 'Date must include a day',
      incompleteMonth: 'Date must include a month',
      incompleteYear: 'Date must include a year',
      invalidDateInFuture: 'Date must be in the past',
    },
  },
});

const cy = () => ({
  section: 'Manylion y rhiant arall',
  title: "Pryd gafodd y dyddiad diwethaf i'r cyfeiriad yma gael ei gadarnhau?",
  errors: {
    otherParentLastAddressDate: {
      required: 'Nodwch y dyddiad',
      invalidDate: 'Rhaid i’r dyddiad fod yn ddyddiad dilys',
      incompleteDay: 'Rhaid i’r dyddiad gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad gynnwys blwyddyn',
      invalidDateInFuture: 'Rhaid i’r dyddiad fod yn y gorffennol',
    },
  },
});

export const form: FormContent = {
  fields: {
    otherParentLastAddressDate: {
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
      parser: body => covertToDateObject('otherParentLastAddressDate', body as Record<string, unknown>),
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
