/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
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
  section: 'Application details',
  title: 'When did the child move in with you?',
  hint: 'Enter the date when they started living with you continuously. For example, 31 3 2020.',
  warning:
    'You can begin your application at any time, but you can only submit 10 weeks after the date the child started living continuously with you.',
  errors: {
    dateChildMovedIn: {
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
  section: 'Application details (in Welsh)',
  title: 'When did the child move in with you? (in Welsh)',
  hint: 'Enter the date when they started living with you continuously. For example, 31 3 2020. (in Welsh)',
  warning:
    'You can begin your application at any time, but you can only submit 10 weeks after the date the child started living continuously with you. (in Welsh)',
  errors: {
    dateChildMovedIn: {
      required: 'Enter your date of birth (in Welsh)',
      invalidDate: 'Date of birth must be a real date (in Welsh)',
      incompleteDay: 'Your date of birth must include a day (in Welsh)',
      incompleteMonth: 'Your date of birth must include a month (in Welsh)',
      incompleteYear: 'Your date of birth must include a year (in Welsh)',
      invalidDateInFuture: 'Your date of birth must be in the past (in Welsh)',
    },
  },
};

describe('applicant1 > date-child-moved-in-content', () => {
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });

    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.hint).toEqual(enContent.hint);
    expect(generatedContent.warning).toEqual(enContent.warning);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content for page', () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: CY,
    });

    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.hint).toEqual(cyContent.hint);
    expect(generatedContent.warning).toEqual(cyContent.warning);
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

  test('should contain dateChildMovedIn field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const dateChildMovedIn = fields.dateChildMovedIn as FormOptions;

    expect(dateChildMovedIn.type).toBe('date');
    expect(dateChildMovedIn.classes).toBe('govuk-date-input');
    expect((dateChildMovedIn.label as Function)(generatedContent)).toBe('When did the child move in with you?');
    expect(dateChildMovedIn.labelHidden).toBe(true);
    expect((dateChildMovedIn.hint as Function)(generatedContent)).toBe(
      'Enter the date when they started living with you continuously. For example, 31 3 2020.'
    );
    expect(((dateChildMovedIn as FormInput).warning as Function)(generatedContent)).toBe(
      'You can begin your application at any time, but you can only submit 10 weeks after the date the child started living continuously with you.'
    );

    expect((dateChildMovedIn.values[0].label as Function)(commonContent)).toBe('Day');
    expect(dateChildMovedIn.values[0].name).toBe('day');
    expect(dateChildMovedIn.values[0].classes).toBe('govuk-input--width-2');
    expect(dateChildMovedIn.values[0].attributes?.maxLength).toBe(2);

    expect((dateChildMovedIn.values[1].label as Function)(commonContent)).toBe('Month');
    expect(dateChildMovedIn.values[1].name).toBe('month');
    expect(dateChildMovedIn.values[1].classes).toBe('govuk-input--width-2');
    expect(dateChildMovedIn.values[1].attributes?.maxLength).toBe(2);

    expect((dateChildMovedIn.values[2].label as Function)(commonContent)).toBe('Year');
    expect(dateChildMovedIn.values[2].name).toBe('year');
    expect(dateChildMovedIn.values[2].classes).toBe('govuk-input--width-4');
    expect(dateChildMovedIn.values[2].attributes?.maxLength).toBe(4);

    expect(
      (dateChildMovedIn.parser as Function)({
        'dateChildMovedIn-day': '21',
        'dateChildMovedIn-month': '12',
        'dateChildMovedIn-year': '2018',
      })
    ).toEqual({ day: '21', month: '12', year: '2018' });
    expect((dateChildMovedIn.validator as Function)({ day: '21', month: '12', year: '2018' })).toBe(undefined);
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
