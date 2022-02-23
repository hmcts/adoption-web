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

const enContent = {
  section: 'First applicant',
  title: "What's your date of birth?",
  hint: 'For example, 27 3 2007',
  errors: {
    applicant1DateOfBirth: {
      required: 'Enter your date of birth',
      invalidDate: 'Date of birth must be a real date',
      incompleteDay: 'Your date of birth must include a day',
      incompleteMonth: 'Your date of birth must include a month',
      incompleteYear: 'Your date of birth must include a year',
      invalidDateInFuture: 'Your date of birth must be in the past',
    },
  },
};

const cyContent = {
  section: 'First applicant (in Welsh)',
  title: "What's your date of birth? (in Welsh)",
  hint: 'For example, 27 3 2007 (in Welsh)',
  errors: {
    applicant1DateOfBirth: {
      required: 'Enter your date of birth (in Welsh)',
      invalidDate: 'Date of birth must be a real date (in Welsh)',
      incompleteDay: 'Your date of birth must include a day (in Welsh)',
      incompleteMonth: 'Your date of birth must include a month (in Welsh)',
      incompleteYear: 'Your date of birth must include a year (in Welsh)',
      invalidDateInFuture: 'Your date of birth must be in the past (in Welsh)',
    },
  },
};

describe('appllicant1 > dob-content', () => {
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });

    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.hint).toEqual(enContent.hint);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test("should return correct welsh content for cannot adopt page because they're 18 or over", () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: CY,
    });

    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.hint).toEqual(cyContent.hint);
    expect(generatedContent.errors).toEqual(cyContent.errors);
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
    expect((dobField.hint as Function)(generatedContent)).toBe('For example, 27 3 2007');

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

  it('should have dateOfBirth label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Applicant');
  });

  it('should have an dateOfBirth label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Applicant (in Welsh)');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
