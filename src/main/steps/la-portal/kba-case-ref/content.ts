import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
  isMoreThan18Years,
} from '../../../app/form/validation';

const en = () => ({
  //section: 'Local authority',
  title: 'Application details',
  label: 'Court case reference number',
  hint: 'This is the 16 digit reference number that was on the email sent to you. Please insert the numbers only, without the hyphens.',
  childNameLabel: 'Child named on the application',
  childNameHint: 'Enter their name as it appears on the email sent to you.',
  childrenDateOfBirth: "Child's date of birth",
  childDateOfBirthHint: 'For example, 31 3 2012.',
  continueButton: 'Continue',
  errors: {
    caseRef: {
      required: 'Enter a case reference',
    },
    childName: {
      required: 'Enter a full name',
    },
    childrenDateOfBirth: {
      required: "Enter the Child's date of birth",
      incompleteDay: 'Date must include a day',
      incompleteMonth: 'Date must include a month',
      incompleteYear: 'Date must include a year',
      invalidDate: 'Enter a real date',
      invalidDateInFuture: 'Date must be in the past',
    },
  },
});

const cy: typeof en = () => ({
  //section: 'Local authority (in welsh)',
  title: 'Application details (in welsh)',
  label: 'Court case reference number (in welsh)',
  hint: 'This is the 16 digit reference number that was on the email sent to you. Please insert the numbers only, without the hyphens. (in welsh)',
  childNameLabel: 'Child named on the application.(in welsh)',
  childNameHint: 'Enter their name exactly as it is on their original birth certificate.(in welsh)',
  childrenDateOfBirth: "Child's date of birth (in welsh)",
  childDateOfBirthHint: 'For example, 31 3 2012.',
  continueButton: 'Continue (in welsh)',
  errors: {
    caseRef: {
      required: 'Enter a case reference (in welsh)',
    },
    childName: {
      required: 'Enter a full name (in welsh)',
    },
    childrenDateOfBirth: {
      required: 'Enter the placement order date',
      incompleteDay: 'Date must include a day',
      incompleteMonth: 'Date must include a month',
      incompleteYear: 'Date must include a year',
      invalidDate: 'Enter a real date',
      invalidDateInFuture: 'Date must be in the past',
    },
  },
});

export const form: FormContent = {
  fields: {
    caseRef: {
      type: 'text',
      classes: 'govuk-label',
      //section: l => l.section,
      label: l => l.label,
      hint: l => l.hint,
      labelSize: 'm',
      attributes: {
        spellcheck: false,
      },
      validator: isFieldFilledIn,
    },

    childName: {
      type: 'text',
      classes: 'govuk-heading-m govuk-!-margin-bottom-1',
      label: l => l.childNameLabel,
      hint: l => l.childNameHint,
      labelSize: 'm',
      validator: isFieldFilledIn,
    },
    /* name123:{
      type: 'label',
      classes: 'govuk-date-input',
      label: l => l.childDateOfBirth,
      labelSize: 'l',
    }, */

    childrenDateOfBirth: {
      type: 'date',
      //classes: 'govuk-heading-s',
      classes: 'govuk-date-input',
      //classes: 'govuk-fieldset__legend govuk-fieldset__legend--m',
      label: l => l.childrenDateOfBirth,
      hint: l => l.childDateOfBirthHint,
      labelSize: 's',
      labelHidden: false,
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
    text: '',
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
