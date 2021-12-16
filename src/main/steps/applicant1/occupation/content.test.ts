/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FormContent, FormFields } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { cy as cyFunction, en as enFunction, generateContent } from './content';

const CY = 'cy';
const EN = 'en';
const cyContent = cyFunction();
const enContent = enFunction();

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
  const { section, title, occupation, warningText, details, errors } = content;

  expect(generatedContent.section).toEqual(section);
  expect(generatedContent.title).toEqual(title);
  expect(generatedContent.occupation).toEqual(occupation);
  expect(generatedContent.warningText).toEqual(warningText);
  expect(generatedContent.details).toEqual(details);
  expect(generatedContent.errors).toEqual(errors);
};

describe('occupation content', () => {
  const commonContent = { language: EN } as CommonContent;
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent);
  });

  it('should have an occupation text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const field = fields.applicant1Occupation;

    expect(field.type).toBe('input');
    expect(field.classes).toBe('govuk-input--width-20');
    expect(field).toHaveProperty('label');
    expect(field).toHaveProperty('labelSize');
    expect(field).toHaveProperty('validator');
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
