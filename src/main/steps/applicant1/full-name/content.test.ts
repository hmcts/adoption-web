/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const CY = 'cy';
const EN = 'en';
const enContent = {
  section: 'Primary applicant',
  title: "What's your full name?",
  applicant1FullName: 'Your full name',
  errors: {
    applicant1FullName: {
      required: 'Enter your full name',
    },
  },
};
const cyContent = {
  section: 'Primary applicant (in Welsh)',
  title: "What's your full name? (in Welsh)",
  applicant1FullName: 'Your full name (in Welsh)',
  errors: {
    applicant1FullName: {
      required: 'Enter your full name (in Welsh)',
    },
  },
};

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
  const { section, title, applicant1FullName, errors } = content;

  expect(generatedContent.section).toEqual(section);
  expect(generatedContent.title).toEqual(title);
  expect(generatedContent.applicant1FullName).toEqual(applicant1FullName);
  expect(generatedContent.errors).toEqual(errors);
};

const commonContent = { language: EN } as CommonContent;

describe('applicant1 > full-name content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent);
  });

  it('should have an full name text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const fullName = fields.applicant1FullName;

    expect(fullName.type).toBe('input');
    expect((fullName.label as Function)(generateContent(commonContent))).toBe(enContent.applicant1FullName);
    expect((fullName as FormOptions).labelSize).toBe('normal');
    expect(fullName.classes).toBe('govuk-input--width-20');

    (fullName.validator as Function)('MockName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName');
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});
