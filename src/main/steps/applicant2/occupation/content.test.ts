/* eslint-disable @typescript-eslint/ban-types, jest/expect-expect */
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
jest.mock('../../../app/form/validation');
const CY = 'cy';
const EN = 'en';
const enContent = {
  section: 'Second applicant',
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
    applicant2Occupation: {
      required: 'Enter your occupation',
    },
  },
};
const cyContent = {
  section: 'Second applicant (in Welsh)',
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
    applicant2Occupation: {
      required: 'Enter your occupation (in Welsh)',
    },
  },
};

const langAssertions = (language, content, generateFn) => {
  const generatedContent = generateFn({ language } as CommonContent);

  Object.entries(content).forEach(([key, value]) => {
    expect(generatedContent[key]).toEqual(value);
  });
};

const commonContent = { language: EN } as CommonContent;

describe('applicant2 > occupation content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent, generateContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent, generateContent);
  });

  it('should have an occupation text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant2Occupation = fields.applicant2Occupation;

    expect(applicant2Occupation.type).toBe('text');
    expect((applicant2Occupation.label as Function)(generateContent(commonContent))).toBe(enContent.label);
    expect((applicant2Occupation.hint as Function)(generateContent(commonContent))).toBe(enContent.hint);
    expect(applicant2Occupation.labelSize).toBe('l');

    (applicant2Occupation.validator as Function)('MockOccupation');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockOccupation');
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
/* eslint-enable @typescript-eslint/ban-types, jest/expect-expect */
