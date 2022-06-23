import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  label: 'What date is on the order?',
  hint: 'For example, 31 3 2020',
  errors: {
    placementOrderDate: {
      required: 'Enter the placement order date',
      incompleteDay: 'Date must include a day',
      incompleteMonth: 'Date must include a month',
      incompleteYear: 'Date must include a year',
      invalidDate: 'Enter a real date',
      invalidDateInFuture: 'Date must be in the past',
    },
  },
};

const cyContent = {
  section: 'Manylion y plentyn',
  label: 'Pa ddyddiad sydd ar y gorchymyn lleoli?',
  hint: 'Er enghraifft, 31 3 2020',
  errors: {
    placementOrderDate: {
      required: 'Nac ydwdwch ddyddiad y gorchymyn lleoli',
      incompleteDay: 'Rhaid i’r dyddiad gynnwys diwrnod',
      incompleteMonth: 'Rhaid i’r dyddiad gynnwys mis',
      incompleteYear: 'Rhaid i’r dyddiad gynnwys blwyddyn',
      invalidDate: 'Nac ydwdwch ddyddiad dilys',
      invalidDateInFuture: 'Rhaid i’r dyddiad fod yn y gorffennol',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > placement-order-date > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      placementOrders: [
        { placementOrderId: 'MOCK_PLACEMENT_ORDER_ID', placementOrderDate: { day: '21', month: '12', year: '2018' } },
      ],
      selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
    },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain placementOrderDate field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const placementOrderDateField = fields.placementOrderDate as FormOptions;

    expect(placementOrderDateField.type).toBe('date');
    expect(placementOrderDateField.classes).toBe('govuk-date-input');
    expect((placementOrderDateField.label as Function)(generatedContent)).toBe(enContent.label);
    expect(((placementOrderDateField as FormInput).hint as Function)(generatedContent)).toBe(enContent.hint);
    expect(placementOrderDateField.labelSize).toBe('l');
    expect(placementOrderDateField.attributes).toEqual({ spellcheck: false });

    (placementOrderDateField.validator as Function)({ day: '21', month: '12', year: '2018' });
    expect(areDateFieldsFilledIn).toHaveBeenCalled();
    expect(isDateInputInvalid).toHaveBeenCalled();
    expect(isFutureDate).toHaveBeenCalled();

    const values = placementOrderDateField.values;
    expect((values[0].label as Function)({ dateFormat: { day: 'Day' } })).toBe('Day');
    expect(values[0].name).toBe('day');
    expect(values[0].classes).toBe('govuk-input--width-2');
    expect(values[0].attributes).toEqual({ maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' });
    expect(values[0].value).toBe('21');

    expect((values[1].label as Function)({ dateFormat: { month: 'Month' } })).toBe('Month');
    expect(values[1].name).toBe('month');
    expect(values[1].classes).toBe('govuk-input--width-2');
    expect(values[1].attributes).toEqual({ maxLength: 2, pattern: '[0-9]*', inputMode: 'numeric' });
    expect(values[1].value).toBe('12');

    expect((values[2].label as Function)({ dateFormat: { year: 'Year' } })).toBe('Year');
    expect(values[2].name).toBe('year');
    expect(values[2].classes).toBe('govuk-input--width-4');
    expect(values[2].attributes).toEqual({ maxLength: 4, pattern: '[0-9]*', inputMode: 'numeric' });
    expect(values[2].value).toBe('2018');

    expect(
      (placementOrderDateField.parser as Function)({
        'placementOrderDate-day': '21',
        'placementOrderDate-month': '12',
        'placementOrderDate-year': '2018',
      })
    ).toEqual({ day: '21', month: '12', year: '2018' });
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent({ ...commonContent, userCase: undefined });
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
