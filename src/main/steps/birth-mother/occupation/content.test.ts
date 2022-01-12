/* eslint-disable @typescript-eslint/ban-types, jest/expect-expect */
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
jest.mock('../../../app/form/validation');
const CY = 'cy';
const EN = 'en';
const enContent = {
  section: "Birth mother's details",
  label: "What is the occupation of the child's birth mother?",
  hint: "Ask the adoption agency or social worker if you're not sure. If the occupation is not known, you can type 'unknown'.",
  errors: {
    birthMotherOccupation: {
      required: 'Enter an occupation',
    },
  },
};

const cyContent = {
  section: "Birth mother's details (in welsh)",
  label: "What is the occupation of the child's birth mother? (in welsh)",
  hint: "Ask the adoption agency or social worker if you're not sure. If the occupation is not known, you can type 'unknown'. (in welsh)",
  errors: {
    birthMotherOccupation: {
      required: 'Enter an occupation (in welsh)',
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

describe('birth mother > occupation content', () => {
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
    const occupationField = fields.birthMotherOccupation;

    expect(occupationField.type).toBe('input');
    expect((occupationField.label as Function)(generateContent(commonContent))).toBe(enContent.label);
    expect((occupationField.hint as Function)(generateContent(commonContent))).toBe(enContent.hint);
    expect(occupationField.labelSize).toBe('l');

    (occupationField.validator as Function)('MockOccupation');
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
