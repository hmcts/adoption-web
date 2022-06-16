import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
jest.mock('../../../app/form/validation');

const EN = 'en';
const enContent = {
  section: 'Local authority',
  label: 'What is the adoption case reference number?',
  hint: 'Some hint text here',
  errors: {
    caseRef: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: 'Local authority (in welsh)',
  label: 'What is the adoption case reference number? (in welsh)',
  hint: 'Some hint text here (in welsh)',
  errors: {
    caseRef: {
      required: 'Please answer the question (in welsh)',
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
    expect(field.labelSize).toBe('l');
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
