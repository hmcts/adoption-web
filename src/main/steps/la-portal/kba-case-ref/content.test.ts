import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, ValidationCheck } from '../../../app/form/Form';
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
