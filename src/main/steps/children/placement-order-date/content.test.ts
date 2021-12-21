import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > placement-order-date content', () => {
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
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toEqual("The child's details");
    expect(generatedContent.label).toEqual('What date is on the placement order?');
    expect(generatedContent.hint).toEqual('For example, 31 3 2020');
    expect((generatedContent.errors as any).placementOrderDate.required).toBe('Enter the placement order date');
    expect((generatedContent.errors as any).placementOrderDate.invalidDate).toBe(
      'Date must include a [day/month/year]'
    );
    expect((generatedContent.errors as any).placementOrderDate.invalidYear).toBe(
      'You have entered the year in an invalid format. Enter the whole year, for example 2002.'
    );
    expect((generatedContent.errors as any).placementOrderDate.invalidDateInFuture).toBe('Date must be in the past');
    expect((generatedContent.errors as any).placementOrderDate.invalidDateTooFarInPast).toBe(
      'You have entered a year which is too far in the past. Enter the year you got married.'
    );
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual("The child's details (in welsh)");
    expect(generatedContent.label).toEqual('What date is on the placement order? (in welsh)');
    expect(generatedContent.hint).toEqual('For example, 31 3 2020 (in welsh)');
    expect((generatedContent.errors as any).placementOrderDate.required).toBe(
      'Enter the placement order date (in welsh)'
    );
    expect((generatedContent.errors as any).placementOrderDate.invalidDate).toBe(
      'Date must include a [day/month/year] (in welsh)'
    );
    expect((generatedContent.errors as any).placementOrderDate.invalidYear).toBe(
      'You have entered the year in an invalid format. Enter the whole year, for example 2002. (in welsh)'
    );
    expect((generatedContent.errors as any).placementOrderDate.invalidDateInFuture).toBe(
      'Date must be in the past (in welsh)'
    );
    expect((generatedContent.errors as any).placementOrderDate.invalidDateTooFarInPast).toBe(
      'You have entered a year which is too far in the past. Enter the year you got married. (in welsh)'
    );
  });

  test('should contain placementOrderDate field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const placementOrderDateField = fields.placementOrderDate as FormOptions;

    expect(placementOrderDateField.type).toBe('date');
    expect(placementOrderDateField.classes).toBe('govuk-date-input');
    expect((placementOrderDateField.label as Function)(generatedContent)).toBe('What date is on the placement order?');
    expect(((placementOrderDateField as FormInput).hint as Function)(generatedContent)).toBe('For example, 31 3 2020');
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
    expect(values[0].attributes!.maxLength).toBe(2);
    expect(values[0].value).toBe('21');

    expect((values[1].label as Function)({ dateFormat: { month: 'Month' } })).toBe('Month');
    expect(values[1].name).toBe('month');
    expect(values[1].classes).toBe('govuk-input--width-2');
    expect(values[1].attributes!.maxLength).toBe(2);
    expect(values[1].value).toBe('12');

    expect((values[2].label as Function)({ dateFormat: { year: 'Year' } })).toBe('Year');
    expect(values[2].name).toBe('year');
    expect(values[2].classes).toBe('govuk-input--width-4');
    expect(values[2].attributes!.maxLength).toBe(4);
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
