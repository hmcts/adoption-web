import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';

const en = ({ isDivorce }) => ({
  title: isDivorce ? 'When did you get married?' : 'When did you form your civil partnership?',
  line1: `Enter the date from your ${isDivorce ? 'marriage certificate' : 'civil partnership certificate'}`,
  hint: 'For example, 31 3 2002',
  errors: {
    relationshipDate: {
      required: 'You have not entered a date. Enter a date to continue.',
      invalidDate: 'You have entered an invalid date. Enter the date using the following format: 31 3 2002.',
      invalidYear: 'You have entered the year in an invalid format. Enter the whole year, for example 2002.',
      invalidDateInFuture:
        'You have entered a date that is in the future. Enter a date that is in the past before continuing.',
      invalidDateTooFarInPast: 'You have entered a year which is too far in the past. Enter the year you got married.',
    },
  },
});

const cy: typeof en = ({ isDivorce }) => ({
  title: `Pryd wnaethoch chi ${isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'}?`,
  line1: `Nodwch y dyddiad sydd ar eich ${isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'}`,
  hint: 'Er enghraifft, 31 3 2002',
  errors: {
    relationshipDate: {
      required: 'Nid ydych wedi nodi dyddiad. Nodwch ddyddiad i barhau.',
      invalidDate: 'Rydych chi wedi rhoi nod annilys. Nodwch y dyddiad gan ddefnyddio rhifau.',
      invalidYear: 'Rydych chi wedi rhoi nod annilys. Nodwch y dyddiad gan ddefnyddio rhifau.',
      invalidDateInFuture:
        'Rydych wedi nodi dyddiad sydd yn y dyfodol. Nodwch ddyddiad sydd yn y gorffennol cyn parhau.',
      invalidDateTooFarInPast: 'Rydych chi wedi rhoi nod annilys. Nodwch y dyddiad gan ddefnyddio rhifau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    relationshipDate: {
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
      parser: body => covertToDateObject('relationshipDate', body as Record<string, unknown>),
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
