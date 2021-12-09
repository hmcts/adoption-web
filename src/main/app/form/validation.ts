import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { validate as isValidEmail } from 'email-validator';

import { Case, CaseDate } from '../case/case';

dayjs.extend(customParseFormat);

export type Validator = (value: string | string[] | CaseDate | Partial<Case> | undefined) => void | string;
export type DateValidator = (value: CaseDate | undefined) => void | string;

export const isFieldFilledIn: Validator = value => {
  if (!value || (value as string).trim?.().length === 0) {
    return 'required';
  }
};

export const atLeastOneFieldIsChecked: Validator = fields => {
  if (!fields || (fields as []).length === 0) {
    return 'required';
  }
};

export const areDateFieldsFilledIn: DateValidator = fields => {
  if (typeof fields !== 'object' || Object.keys(fields).length !== 3) {
    return 'required';
  }

  for (const field in fields) {
    if (!fields[field]) {
      return 'required';
    }
  }
};

export const isDateInputInvalid: DateValidator = date => {
  const invalid = 'invalidDate';
  if (!date) {
    return invalid;
  }

  for (const value in date) {
    if (isNaN(+date[value])) {
      return invalid;
    }
  }

  const year = parseInt(date.year, 10) || 0;
  const month = parseInt(date.month, 10) || 0;
  const day = parseInt(date.day, 10) || 0;
  if (!dayjs(`${year}-${month}-${day}`, 'YYYY-M-D', true).isValid()) {
    if (year < 1000) {
      return 'invalidYear';
    } else {
      return invalid;
    }
  }

  if (year < 1900) {
    return 'invalidDateTooFarInPast';
  }
};

export const isFutureDate: DateValidator = date => {
  if (!date) {
    return;
  }

  const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
  if (new Date() < enteredDate) {
    return 'invalidDateInFuture';
  }
};

export const isLessThanAYear: DateValidator = date => {
  if (!date) {
    return;
  }

  const enteredDate = new Date(+date.year, +date.month - 1, +date.day);
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  if (!(enteredDate < oneYearAgo)) {
    return 'lessThanAYear';
  }
};

export const isInvalidHelpWithFeesRef: Validator = value => {
  const fieldNotFilledIn = isFieldFilledIn(value);
  if (fieldNotFilledIn) {
    return fieldNotFilledIn;
  }

  if (typeof value === 'string') {
    if (!value.match(/^HWF-[A-Z0-9]{3}-[A-Z0-9]{3}$/i)) {
      return 'invalid';
    }

    if (value.toUpperCase() === 'HWF-A1B-23C') {
      return 'invalidUsedExample';
    }
  }
};

export const isInvalidPostcode: Validator = value => {
  const fieldNotFilledIn = isFieldFilledIn(value);
  if (fieldNotFilledIn) {
    return fieldNotFilledIn;
  }

  if (!(value as string).match(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i)) {
    return 'invalid';
  }
};

export const isPhoneNoValid: Validator = value => {
  if (typeof value === 'string') {
    return !value.match(/^$|^[0-9 +().-]{9,}$/) ? 'invalid' : undefined;
  }
};

export const isEmailValid: Validator = value => {
  if (!isValidEmail(value as string)) {
    return 'invalid';
  }
};

export const isFieldLetters: Validator = value => {
  if (!(value as string).match(/^[\p{Script=Latin}'’\-\s]*$/gu)) {
    return 'invalid';
  }
};

export const isValidCaseReference: Validator = value => {
  if (!(value as string).match(/^\d{16}$/) && !(value as string).match(/^\d{4}-\d{4}-\d{4}-\d{4}$/)) {
    return 'invalid';
  }
};

export const isValidAccessCode: Validator = value => {
  if ((value as string).trim().length !== 8) {
    return 'invalid';
  }
};

export const isAddressSelected: Validator = value => {
  if ((value as string).trim() === '-1') {
    return 'notSelected';
  }
};
