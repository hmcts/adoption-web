/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FormContent, FormFields } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { cy, en, generateContent } from './content';

const CY = 'cy';
const EN = 'en';
const cyContent = cy();
const enContent = en();

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
  const { section, title, fullName, errors } = content;

  expect(generatedContent.section).toEqual(section);
  expect(generatedContent.title).toEqual(title);
  expect(generatedContent.fullName).toEqual(fullName);
  expect(generatedContent.errors).toEqual(errors);
};

const commonContent = { language: EN } as CommonContent;

describe('occupation content', () => {
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
    const fullName = fields.applicantFullName;

    expect(fullName.type).toBe('input');
    expect((fullName.label as Function)(generateContent(commonContent))).toBe(enContent.fullName);
    expect(fullName.labelSize).toBe('normal');
    expect(fullName.classes).toBe('govuk-input--width-20');
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
