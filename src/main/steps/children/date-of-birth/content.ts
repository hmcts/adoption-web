import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFutureDate,
  isMoreThan18Years,
} from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  title: "What is the child's date of birth?",
  hint: "For example, 31 3 2012. This should be on their birth certificate. Ask the adoption agency or social worker if you're not sure.",
  day: '',
  month: '',
  year: '',
  errors: {
    childrenDateOfBirth: {
      required: 'Enter their date of birth',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDate: 'Date of birth must be a real date',
      invalidDateInFuture: 'Date of birth must be in the past',
      invalidDateOver18: 'Child is 18 or over and cannot be adopted',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y plentyn',
  title: 'Beth yw dyddiad geni’r plentyn?',
  hint: 'Er enghraifft, 31 3 2012. Dylai hyn fod wedi’i nodi ar eu tystysgrif geni. Holwch gyda’r asiantaeth fabwysiadu neu’r gweithiwr cymdeithasol os nad ydych yn siŵr.',
  day: '',
  month: '',
  year: '',
  errors: {
    childrenDateOfBirth: {
      required: 'Rhowch eu dyddiad geni',
      incompleteDay: 'Mae’n rhaid i’r dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Mae’n rhaid i’r dyddiad geni gynnwys mis',
      incompleteYear: 'Mae’n rhaid i’r dyddiad geni gynnwys blwyddyn',
      invalidDate: 'Mae’n rhaid i’r dyddiad geni fod yn ddyddiad go iawn',
      invalidDateInFuture: 'Rhaid i’r dyddiad geni fod yn y gorffennol',
      invalidDateOver18: 'Mae’r plentyn yn 18 oed neu’n hŷn ac ni ellir ei fabwysiadu',
    },
  },
});

export const form: FormContent = {
  fields: {
    childrenDateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.title,
      hint: l => l.hint,
      labelSize: 'l',
      labelHidden: true,
      attributes: {
        spellcheck: false,
      },
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
      parser: body => covertToDateObject('childrenDateOfBirth', body as Record<string, unknown>),
      validator: value =>
        areDateFieldsFilledIn(value as CaseDate) ||
        isDateInputInvalid(value as CaseDate) ||
        isFutureDate(value as CaseDate) ||
        isMoreThan18Years(value as CaseDate),
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
