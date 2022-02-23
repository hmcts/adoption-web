/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const CY = 'cy';
const EN = 'en';
const enContent = {
  section: 'First applicant',
  label: "What's your occupation?",
  hint: 'Enter your full occupation. For example, ‘Secondary school teacher’ rather than just ‘Teacher’. If you’re self employed, say so. For example, ‘Self employed carpenter’.',
  warningText: {
    text: 'This information will appear on the adoption certificate.',
    iconFallbackText: 'Warning',
  },
  details: {
    summaryText: "I'm not working at the moment",
    html: `If you’re unemployed, say what your occupation was when you were working. For example, 'Unemployed administrative assistant'.
  <br>
  <br>
  If you’re retired, say that you’re retired and what your occupation was when you were working. For example, ‘Retired hairdresser’.
  <br>
  <br>
  If you’re a full time parent, enter ‘Full time parent’.`,
  },
  errors: {
    applicant1Occupation: {
      required: 'Enter your occupation',
    },
  },
};
const cyContent = {
  section: 'First applicant (in Welsh)',
  label: "What's your occupation? (in Welsh)",
  hint: 'Enter your full occupation. For example, ‘Secondary school teacher’ rather than just ‘Teacher’. If you’re self employed, say so. For example, ‘Self employed carpenter’. (in Welsh)',
  warningText: {
    text: 'This information will appear on the adoption certificate. (in Welsh)',
    iconFallbackText: 'Warning (in Welsh)',
  },
  details: {
    summaryText: "I'm not working at the moment (in Welsh)",
    html: `If you’re unemployed, say what your occupation was when you were working. For example, 'Unemployed administrative assistant'.
    <br>
    <br>
    If you’re retired, say that you’re retired and what your occupation was when you were working. For example, ‘Retired hairdresser’.
    <br>
    <br>
    If you’re a full time parent, enter ‘Full time parent’. (in Welsh)`,
  },
  errors: {
    applicant1Occupation: {
      required: 'Enter your occupation (in Welsh)',
    },
  },
};

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

const commonContent = { language: EN } as CommonContent;

describe('occupation content', () => {
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
    const applicant1Occupation = fields.applicant1Occupation;

    expect(applicant1Occupation.type).toBe('input');
    expect((applicant1Occupation.label as Function)(generateContent(commonContent))).toBe(enContent.label);
    expect((applicant1Occupation.hint as Function)(generateContent(commonContent))).toBe(enContent.hint);
    expect(applicant1Occupation.labelSize).toBe('l');

    (applicant1Occupation.validator as Function)('MockOccupation');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockOccupation');
  });

  it('should have an occupation label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    const form1 = generatedContent1.form as FormContent;
    const fields1 = form1.fields as FormFields;
    const applicant1Occupation = fields1.applicant1Occupation;
    expect((applicant1Occupation.label as Function)(generateContent(commonContent1))).toBe(enContent.label);
  });

  it('should have an occupation label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    const form1 = generatedContent1.form as FormContent;
    const fields1 = form1.fields as FormFields;
    const applicant1Occupation = fields1.applicant1Occupation;
    expect((applicant1Occupation.label as Function)(generateContent(commonContent1))).toBe(cyContent.label);
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
