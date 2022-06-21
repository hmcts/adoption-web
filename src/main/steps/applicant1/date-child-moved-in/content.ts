import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  title: 'When did the child move in with you?',
  hint: 'Enter the date when they started living with you continuously. For example, 31 3 2020.',
  warning:
    'You can begin your application at any time, but you can only submit 10 weeks after the date the child started living continuously with you.',
  errors: {
    dateChildMovedIn: {
      required: 'Enter the date the child moved in with you',
      invalidDate: 'Must be a real date',
      incompleteDay: 'Date must include a [day/month/year]',
      incompleteMonth: 'Date must include a [day/month/year]',
      incompleteYear: 'Date must include a [day/month/year]',
      invalidDateInFuture: 'Date must be in the past',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y cais',
  title: 'Pryd wnaeth y plentyn symud i fyw gyda chi?',
  hint: 'Nac ydwdwch y dyddiad wnaethon nhw ddechrau byw gyda chi yn barhaus. Er enghraifft, 31 3 2020.',
  warning:
    'Gallwch gychwyn eich cais unrhyw dro, ond gallwch ond cyflwyno’ch cais 10 wythnos ar ôl y dyddiad wnaeth y plentyn ddechrau byw gyda chi’n barhaus. ',
  errors: {
    dateChildMovedIn: {
      required: 'Rhowch y dyddiad y daeth y plentyn i fyw atoch',
      invalidDate: 'Rhaid iddo fod yn ddyddiad go iawn',
      incompleteDay: 'Mae’n rhaid i’r dyddiad gynnwys [diwrnod/mis/blwyddyn]',
      incompleteMonth: 'Mae’n rhaid i’r dyddiad gynnwys [diwrnod/mis/blwyddyn]',
      incompleteYear: 'Mae’n rhaid i’r dyddiad gynnwys [diwrnod/mis/blwyddyn]',
      invalidDateInFuture: 'Rhaid i’r dyddiad fod yn y gorffennol',
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
