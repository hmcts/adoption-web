import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, ValidationCheck } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
jest.mock('../../../app/form/validation');

const EN = 'en';
const enContent = {
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
};

const cyContent = {
  title: 'Application details (in welsh)',
  label: 'Court Case reference number (in welsh)',
  hint: 'This is the 16 digit reference number that was on the email sent to you. Please insert the numbers only, without the hyphens. (in welsh)',
  childNameLabel: 'Child named on the application.(in welsh)',
  childNameHint: 'Enter their name as it appears on the email sent to you. (in welsh)',
  childrenDateOfBirth: "Child's date of birth (in welsh)",
  childDateOfBirthHint: 'For example, 31 3 2012.',
  continueButton: 'Continue (in welsh)',
  errors: {
    kbaCaseRef: {
      required: 'Enter the 16 digit court case reference number (in welsh)',
      numberTooShort: 'The number entered is too short (in welsh)',
      isNotNumeric: 'Enter a case reference number in the correct format (in welsh)',
    },
    kbaChildName: {
      required: 'Enter the full name (in welsh)',
    },
    kbaChildrenDateOfBirth: {
      required: 'Enter their date of birth (in welsh)',
      incompleteDay: 'Date of birth must include a day (in welsh)',
      incompleteMonth: 'Date of birth must include a month (in welsh)',
      incompleteYear: 'Date of birth must include a year (in welsh)',
      invalidDate: 'Date of birth must be a real date (in welsh)',
      invalidDateInFuture: 'Date of birth must be in the past (in welsh)',
    },
  },
};

const commonContent = { language: EN } as CommonContent;

/* eslint-disable @typescript-eslint/ban-types */
describe('la-portal > kba-case-ref > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an caseRef text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const field = fields.kbaCaseRef;

    expect(field.type).toBe('text');
    expect((field.label as Function)(generateContent(commonContent))).toBe(enContent.label);
    expect((field.hint as Function)(generateContent(commonContent))).toBe(enContent.hint);
    expect(field.labelSize).toBe('m');
    expect((field.validator as ValidationCheck)('1234567891234567', {})).toBe(undefined);
  });

  it('should have an kbaChildName text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const field = fields.kbaChildName;

    expect(field.type).toBe('text');
    //expect((field.label as Function)(generateContent(commonContent))).toBe(enContent.label);
    expect((field.hint as Function)(generateContent(commonContent))).toBe(enContent.childNameHint);
    expect(field.labelSize).toBe('m');
    expect((field.validator as ValidationCheck)('1234567891234567', {})).toBe(undefined);
  });

  test('should contain dateOfBirth field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const dobField = fields.kbaChildrenDateOfBirth as FormOptions;

    expect(dobField.type).toBe('date');
    expect(dobField.classes).toBe('govuk-date-input');
    expect((dobField.hint as Function)(generatedContent)).toBe(enContent.childDateOfBirthHint);

    //expect((dobField.values[0].label as Function)(commonContent)).toBe('Day');
    expect(dobField.values[0].name).toBe('day');
    expect(dobField.values[0].classes).toBe('govuk-input--width-2');
    expect(dobField.values[0].attributes?.maxLength).toBe(2);

    expect(dobField.values[1].name).toBe('month');
    expect(dobField.values[1].classes).toBe('govuk-input--width-2');
    expect(dobField.values[1].attributes?.maxLength).toBe(2);

    expect(dobField.values[2].name).toBe('year');
    expect(dobField.values[2].classes).toBe('govuk-input--width-4');
    expect(dobField.values[2].attributes?.maxLength).toBe(4);

    expect(
      (dobField.parser as Function)({
        'kbaChildrenDateOfBirth-day': '21',
        'kbaChildrenDateOfBirth-month': '12',
        'kbaChildrenDateOfBirth-year': '2018',
      })
    ).toEqual({ day: '21', month: '12', year: '2018' });
    expect((dobField.validator as Function)({ day: '21', month: '12', year: '2018' })).toBe(undefined);
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect(form.saveAsDraft?.text).toBe('');
  });
});
