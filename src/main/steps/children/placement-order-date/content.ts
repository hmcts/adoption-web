import { CaseDate } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { covertToDateObject } from '../../../app/form/parser';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';

const en = ({ userCase }: CommonContent) => {
  const placementOrder = userCase?.placementOrders?.find(
    item => item.placementOrderId === userCase.selectedPlacementOrderId
  );
  const title =
    placementOrder?.placementOrderType === undefined
      ? 'What date is on the placement order?'
      : 'What date is on the order?';
  return {
    title,
    section: "The child's details",
    hint: 'For example, 31 3 2020',
    errors: {
      placementOrderDate: {
        required: 'Enter the placement order date',
        invalidDate: 'Enter a real date',
        invalidDateInFuture: 'Date must be in the past',
        incompleteDay: 'Enter a day',
        incompleteMonth: 'Enter a month',
        incompleteYear: 'Enter a year',
        incompleteDayAndMonth: 'Enter a day and month',
        incompleteMonthAndYear: 'Enter a month and year',
        incompleteDayAndYear: 'Enter a day and year',
      },
    },
  };
};

const cy: typeof en = ({ userCase }: CommonContent) => {
  const title =
    userCase?.placementOrders?.length === 0
      ? 'Pa ddyddiad sydd ar y gorchymyn lleoli?'
      : 'Pa ddyddiad sydd ar y gorchymyn lleoli?';
  return {
    title,
    section: 'Manylion y plentyn',
    hint: 'Er enghraifft, 31 3 2020',
    errors: {
      placementOrderDate: {
        required: 'Nac ydwdwch ddyddiad y gorchymyn lleoli',
        invalidDate: 'Nac ydwdwch ddyddiad dilys',
        invalidDateInFuture: 'Rhaid i’r dyddiad fod yn y gorffennol',
        incompleteDay: 'Nodwch ddiwrnod',
        incompleteMonth: 'Nodwch fis',
        incompleteYear: 'Nodwch flwyddyn',
        incompleteDayAndMonth: 'Nodwch ddiwrnod a blwyddyn',
        incompleteMonthAndYear: 'Nodwch fis a blwyddyn',
        incompleteDayAndYear: 'Nodwch ddiwrnod a blwyddyn',
      },
    },
  };
};

export const form: FormContent = {
  fields: userCase => {
    const placementOrderDate = userCase.placementOrders?.find(
      item => item.placementOrderId === userCase.selectedPlacementOrderId
    )?.placementOrderDate as CaseDate;
    return {
      placementOrderDate: {
        type: 'date',
        classes: 'govuk-date-input',
        label: l => l.title,
        hint: l => l.hint,
        labelHidden: true,
        labelSize: 'l',
        attributes: {
          spellcheck: false,
        },
        values: [
          {
            label: l => l.dateFormat['day'],
            name: 'day',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
            value: placementOrderDate?.day,
          },
          {
            label: l => l.dateFormat['month'],
            name: 'month',
            classes: 'govuk-input--width-2',
            attributes: { maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' },
            value: placementOrderDate?.month,
          },
          {
            label: l => l.dateFormat['year'],
            name: 'year',
            classes: 'govuk-input--width-4',
            attributes: { maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' },
            value: placementOrderDate?.year,
          },
        ],
        parser: body => covertToDateObject('placementOrderDate', body as Record<string, unknown>),
        validator: value =>
          areDateFieldsFilledIn(value as CaseDate) ||
          isDateInputInvalid(value as CaseDate) ||
          isFutureDate(value as CaseDate),
      },
    };
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
