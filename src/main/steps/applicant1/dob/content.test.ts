/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';
const CY = 'cy';
const commonContent = {
  language: EN,
  dateFormat: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
} as CommonContent;

describe('appllicant1 > dob-content', () => {
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });

    expect(generatedContent.title).toEqual("What's your date of birth?");
    expect(generatedContent.section).toEqual('Primary applicant');
    expect(generatedContent.hint).toEqual('For example, 28 6 1997');

    const errors = generatedContent.errors as any;
    expect(errors.applicant1DateOfBirth.required).toEqual('You have not entered a date. Enter a date to continue.');
    expect(errors.applicant1DateOfBirth.invalidDate).toEqual(
      'You have entered an invalid date. Enter the date using the following format: 28 6 1997.'
    );
    expect(errors.applicant1DateOfBirth.invalidYear).toEqual(
      'You have entered the year in an invalid format. Enter the whole year, for example 2002.'
    );
    expect(errors.applicant1DateOfBirth.invalidDateInFuture).toEqual(
      'You have entered a date that is in the future. Enter a date that is in the past before continuing.'
    );
    expect(errors.applicant1DateOfBirth.invalidDateTooFarInPast).toEqual(
      'You have entered a year which is too far in the past.'
    );
  });

  test("should return correct welsh content for cannot adopt page because they're 18 or over", () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: CY,
    });

    expect(generatedContent.title).toEqual("What's your date of birth? (in Welsh)");
    expect(generatedContent.section).toEqual('Primary applicant (in Welsh)');
    expect(generatedContent.hint).toEqual('For example, 28 6 1997 (in Welsh)');

    const errors = generatedContent.errors as any;
    expect(errors.applicant1DateOfBirth.required).toEqual(
      'You have not entered a date. Enter a date to continue. (in Welsh)'
    );
    expect(errors.applicant1DateOfBirth.invalidDate).toEqual(
      'You have entered an invalid date. Enter the date using the following format: 28 6 1997. (in Welsh)'
    );
    expect(errors.applicant1DateOfBirth.invalidYear).toEqual(
      'You have entered the year in an invalid format. Enter the whole year, for example 2002. (in Welsh)'
    );
    expect(errors.applicant1DateOfBirth.invalidDateInFuture).toEqual(
      'You have entered a date that is in the future. Enter a date that is in the past before continuing. (in Welsh)'
    );
    expect(errors.applicant1DateOfBirth.invalidDateTooFarInPast).toEqual(
      'You have entered a year which is too far in the past. (in Welsh)'
    );
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });

  test('should contain dateOfBirth field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const dobField = fields.applicant1DateOfBirth as FormOptions;

    expect(dobField.type).toBe('date');
    expect(dobField.classes).toBe('govuk-date-input');
    expect((dobField.label as Function)(generatedContent)).toBe("What's your date of birth?");
    expect(dobField.labelHidden).toBe(true);
    expect((dobField.hint as Function)(generatedContent)).toBe('For example, 28 6 1997');

    expect((dobField.values[0].label as Function)(commonContent)).toBe('Day');
    expect(dobField.values[0].name).toBe('day');
    expect(dobField.values[0].classes).toBe('govuk-input--width-2');
    expect(dobField.values[0].attributes?.maxLength).toBe(2);

    expect((dobField.values[1].label as Function)(commonContent)).toBe('Month');
    expect(dobField.values[1].name).toBe('month');
    expect(dobField.values[1].classes).toBe('govuk-input--width-2');
    expect(dobField.values[1].attributes?.maxLength).toBe(2);

    expect((dobField.values[2].label as Function)(commonContent)).toBe('Year');
    expect(dobField.values[2].name).toBe('year');
    expect(dobField.values[2].classes).toBe('govuk-input--width-4');
    expect(dobField.values[2].attributes?.maxLength).toBe(4);

    expect(
      (dobField.parser as Function)({
        'applicant1DateOfBirth-day': '21',
        'applicant1DateOfBirth-month': '12',
        'applicant1DateOfBirth-year': '2018',
      })
    ).toEqual({ day: '21', month: '12', year: '2018' });
    expect((dobField.validator as Function)({ day: '21', month: '12', year: '2018' })).toBe(undefined);
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
