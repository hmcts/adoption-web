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
  section: 'Second applicant',
  title: "What's your full name?",
  firstNames: 'First names',
  firstHint: '(Include any given or middle names)',
  lastNames: 'Last names',
  lastHint: '(Include surname or family names)',
  errors: {
    applicant2FirstNames: {
      required: 'Enter your first names',
    },
    applicant2LastNames: {
      required: 'Enter your last names',
    },
  },
};
const cyContent = {
  section: 'Second applicant (in Welsh)',
  title: "What's your full name? (in Welsh)",
  firstNames: 'First names (in Welsh)',
  firstHint: '(Include any given or middle names) (in Welsh)',
  lastNames: 'Last names (in Welsh)',
  lastHint: '(Include surname or family names) (in Welsh)',
  errors: {
    applicant2FirstNames: {
      required: 'Enter your first names (in Welsh)',
    },
    applicant2LastNames: {
      required: 'Enter your last names (in Welsh)',
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

describe('applicant2 > full-name content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent, generateContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent, generateContent);
  });

  it('should contain applicant2FirstNames text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const firstNames = fields.applicant2FirstNames;

    expect(firstNames.type).toBe('text');
    expect((firstNames.label as Function)(generateContent(commonContent))).toBe(enContent.firstNames);
    expect((firstNames.hint as Function)(generateContent(commonContent))).toBe(enContent.firstHint);
    expect(firstNames.labelSize).toBe('normal');

    (firstNames.validator as Function)('MockFirstName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockFirstName');
  });

  it('should contain applicant2LastNames text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const lastNames = fields.applicant2LastNames;

    expect(lastNames.type).toBe('text');
    expect((lastNames.label as Function)(generateContent(commonContent))).toBe(enContent.lastNames);
    expect((lastNames.hint as Function)(generateContent(commonContent))).toBe(enContent.lastHint);
    expect(lastNames.labelSize).toBe('normal');

    (lastNames.validator as Function)('MockFirstName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockFirstName');
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
