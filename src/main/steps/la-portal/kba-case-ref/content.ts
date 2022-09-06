import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import {
  areDateFieldsFilledIn,
  isCaseRefNumeric,
  isCaseRefTooShort,
  isDateInputInvalid,
  isFieldFilledIn,
  isFutureDate,
  isMoreThan18Years,
} from '../../../app/form/validation';

const en = () => ({
  title: 'Application details',
  label: 'Court Case reference number',
  hint: 'This is the 16 digit reference number that was on the email sent to you. Please insert the numbers only, without the hyphens.',
  childNameLabel: 'Child named on the application',
  childNameHint: 'Enter their name as it appears on the email sent to you.',
  childrenDateOfBirth: "Child's date of birth",
  childDateOfBirthHint: 'For example, 31 3 2012.',
  continueButton: 'Continue',
  errors: {
    kbaCaseRef: {
      required: 'Enter the 16 digit court case reference number',
      numberTooShort: 'The number entered is too short',
      isNotNumeric: 'Enter a case reference number in the correct format',
    },
    kbaChildName: {
      required: 'Enter the full name',
    },
    kbaChildrenDateOfBirth: {
      required: 'Enter their date of birth',
      incompleteDay: 'Date of birth must include a day',
      incompleteMonth: 'Date of birth must include a month',
      incompleteYear: 'Date of birth must include a year',
      invalidDate: 'Date of birth must be a real date',
      invalidDateInFuture: 'Date of birth must be in the past',
    },
  },
});

const cy: typeof en = () => ({
  title: 'Manylion y cais',
  label: 'Cyfeirnod yr achos llys',
  hint: "Dyma'r cyfeirnod 16 digid oedd ar yr e-bost a anfonwyd atoch. Rhowch y rhifau yn unig, heb y cysylltnodau.",
  childNameLabel: "Plentyn wedi'i enwi ar y cais",
  childNameHint: "Rhowch ei enw fel mae'n ymddangos ar yr e-bost a anfonwyd atoch.",
  childrenDateOfBirth: 'Dyddiad geni’r plentyn',
  childDateOfBirthHint: 'Er enghraifft, 31 3 2012.',
  continueButton: 'Pharhau',
  errors: {
    kbaCaseRef: {
      required: 'Enter the 16 digit court case reference number (in welsh)',
      numberTooShort: 'The number entered is too short (in welsh)',
      isNotNumeric: 'Nodwch gyfeirnod yr achos yn y fformat cywir',
    },
    kbaChildName: {
      required: 'Nodwch enw llawn',
    },
    kbaChildrenDateOfBirth: {
      required: 'Nodwch eu dyddiad geni',
      incompleteDay: 'Mae’n rhaid i’r dyddiad geni gynnwys diwrnod',
      incompleteMonth: 'Mae’n rhaid i’r dyddiad geni gynnwys mis',
      incompleteYear: 'Mae’n rhaid i’r dyddiad geni gynnwys blwyddyn',
      invalidDate: 'Mae’n rhaid i’r dyddiad geni fod yn ddyddiad go iawn',
      invalidDateInFuture: 'Rhaid i’r dyddiad geni fod yn y gorffennol',
    },
  },
});

export const form: FormContent = {
  fields: {
    kbaCaseRef: {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.label,
      hint: l => l.hint,
      labelSize: 'm',
      attributes: {
        spellcheck: false,
        maxLength: 16,
        pattern: '[0-9]*',
        inputMode: 'numeric',
      },
      validator: value => isFieldFilledIn(value) || isCaseRefTooShort(value) || isCaseRefNumeric(value),
    },

    kbaChildName: {
      type: 'text',
      classes: 'govuk-heading-m govuk-!-margin-bottom-1',
      label: l => l.childNameLabel,
      hint: l => l.childNameHint,
      labelSize: 'm',
      validator: isFieldFilledIn,
    },
    kbaChildrenDateOfBirth: {
      type: 'date',
      classes: 'govuk-date-input',
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
      parser: body => covertToDateObject('kbaChildrenDateOfBirth', body as Record<string, unknown>),
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
