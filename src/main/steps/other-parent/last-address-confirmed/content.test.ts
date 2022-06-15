/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
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

const enContent = {
  section: "Other parent's details",
  title: 'When was the last date this address was confirmed?',
  errors: {
    birthFatherLastAddressDate: {
      required: 'Enter date',
      invalidDate: 'Date must be a real date',
      incompleteDay: 'Date must include a day',
      incompleteMonth: 'Date must include a month',
      incompleteYear: 'Date must include a year',
      invalidDateInFuture: 'Date must be in the past',
    },
  },
};

const cyContent = {
  section: "Other parent's details (in welsh)",
  title: 'When was the last date this address was confirmed?',
  errors: {
    birthFatherLastAddressDate: {
      required: 'Enter date',
      invalidDate: 'Date must be a real date',
      incompleteDay: 'Date must include a day',
      incompleteMonth: 'Date must include a month',
      incompleteYear: 'Date must include a year',
      invalidDateInFuture: 'Date must be in the past',
    },
  },
};

describe('birthFatherLastAddressDate > content', () => {
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test("should return correct welsh content for cannot adopt page because they're 18 or over", () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: CY }));
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
    const dobField = fields.birthFatherLastAddressDate as FormOptions;

    expect(dobField.type).toBe('date');
    expect(dobField.classes).toBe('govuk-date-input');
    expect((dobField.label as Function)(generatedContent)).toBe(enContent.title);
    expect(dobField.labelHidden).toBe(true);

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
        'birthFatherLastAddressDate-day': '21',
        'birthFatherLastAddressDate-month': '12',
        'birthFatherLastAddressDate-year': '2018',
      })
    ).toEqual({ day: '21', month: '12', year: '2018' });
    expect((dobField.validator as Function)({ day: '21', month: '12', year: '2018' })).toBe(undefined);
  });

  it('should have date label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe("Other parent's details");
  });

  it('should have an date label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe("Other parent's details (in welsh)");
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
