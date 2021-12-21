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
  label: "What is the child's date of birth?",
  hint: "For example, 31 3 2012. This should be on their birth certificate. Ask the adoption agency or social worker if you're not sure.",
  errors: {
    childrenDateOfBirth: {
      required: 'Enter their date of birth',
      incomplete: 'Date of birth must include a [day/month/year]',
      invalidDate: 'Date of birth must be a real date',
      invalidDateInFuture: 'Date of birth must be in the past',
      invalidDateOver18: 'Child is 18 or over and cannot be adopted',
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  label: "What is the child's date of birth? (in welsh)",
  hint: "For example, 31 3 2012. This should be on their birth certificate. Ask the adoption agency or social worker if you're not sure. (in welsh)",
  errors: {
    childrenDateOfBirth: {
      required: 'Enter their date of birth (in welsh)',
      incomplete: 'Date of birth must include a [day/month/year] (in welsh)',
      invalidDate: 'Date of birth must be a real date (in welsh)',
      invalidDateInFuture: 'Date of birth must be in the past (in welsh)',
      invalidDateOver18: 'Child is 18 or over and cannot be adopted (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    childrenDateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
      label: l => l.label,
      hint: l => l.hint,
      labelSize: 'l',
      attributes: {
        spellcheck: false,
      },
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
