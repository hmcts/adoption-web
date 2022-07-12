import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
jest.mock('../../../app/form/validation');

const EN = 'en';
const enContent = {
  //section: 'Local authority',
  title: 'Application details',
  label: 'Court case reference number',
  hint: 'This is the 16 digit reference number that was on the email sent to you. Please insert the numbers only, without the hyphens.',
  childNameLabel: 'Child named on the application',
  childNameHint: 'Enter their name as it appears on the email sent to you.',
  childrenDateOfBirth: "Child's date of birth",
  childDateOfBirthHint: 'For example, 31 3 2012.',
  continueButton: 'Continue',
  errors: {
    caseRef: {
      required: 'Enter a case reference',
    },
    childName: {
      required: 'Enter a full name',
    },
    childrenDateOfBirth: {
      required: "Enter the Child's date of birth",
      incompleteDay: 'Date must include a day',
      incompleteMonth: 'Date must include a month',
      incompleteYear: 'Date must include a year',
      invalidDate: 'Enter a real date',
      invalidDateInFuture: 'Date must be in the past',
    },
  },
};

const cyContent = {
  //section: 'Local authority (in welsh)',
  title: 'Application details (in welsh)',
  label: 'Court case reference number (in welsh)',
  hint: 'This is the 16 digit reference number that was on the email sent to you. Please insert the numbers only, without the hyphens. (in welsh)',
  childNameLabel: 'Child named on the application.(in welsh)',
  childNameHint: 'Enter their name exactly as it is on their original birth certificate.(in welsh)',
  childrenDateOfBirth: "Child's date of birth (in welsh)",
  childDateOfBirthHint: 'For example, 31 3 2012.',
  continueButton: 'Continue (in welsh)',
  errors: {
    caseRef: {
      required: 'Enter a case reference (in welsh)',
    },
    childName: {
      required: 'Enter a full name (in welsh)',
    },
    childrenDateOfBirth: {
      required: 'Enter the placement order date',
      incompleteDay: 'Date must include a day',
      incompleteMonth: 'Date must include a month',
      incompleteYear: 'Date must include a year',
      invalidDate: 'Enter a real date',
      invalidDateInFuture: 'Date must be in the past',
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
    const field = fields.caseRef;

    expect(field.type).toBe('text');
    expect((field.label as Function)(generateContent(commonContent))).toBe(enContent.label);
    expect((field.hint as Function)(generateContent(commonContent))).toBe(enContent.hint);
    expect(field.labelSize).toBe('m');
    expect(field.validator).toBe(isFieldFilledIn);
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
