import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../common.content';

import { generateContent } from './full-name';

jest.mock('../../../app/form/validation');

const enContent = {
  firstNames: 'First names',
  firstNamesHint: '(Include any given or middle names)',
  lastNames: 'Last names',
  lastNamesHint: '(Include surname or family names)',
};

const cyContent = {
  firstNames: 'First names (in Welsh)',
  firstNamesHint: '(Include any given or middle names) (in Welsh)',
  lastNames: 'Last names (in Welsh)',
  lastNamesHint: '(Include surname or family names) (in Welsh)',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('common > components > full-name', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.firstNames).toEqual(enContent.firstNames);
    expect(generatedContent.firstNamesHint).toEqual(enContent.firstNamesHint);
    expect(generatedContent.lastNames).toEqual(enContent.lastNames);
    expect(generatedContent.lastNamesHint).toEqual(enContent.lastNamesHint);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.firstNames).toEqual(cyContent.firstNames);
    expect(generatedContent.firstNamesHint).toEqual(cyContent.firstNamesHint);
    expect(generatedContent.lastNames).toEqual(cyContent.lastNames);
    expect(generatedContent.lastNamesHint).toEqual(cyContent.lastNamesHint);
  });

  test('should contain firstNames field', () => {
    const firstNamesField = fields.firstNames as FormOptions;
    expect(firstNamesField.type).toBe('input');
    expect(firstNamesField.classes).toBe('govuk-label');
    expect((firstNamesField.label as Function)(generatedContent)).toBe(enContent.firstNames);
    expect(((firstNamesField as FormInput).hint as Function)(generatedContent)).toBe(enContent.firstNamesHint);
    expect(firstNamesField.labelSize).toBe(null);
    expect(firstNamesField.validator).toBe(isFieldFilledIn);
  });

  test('should contain lastNames field', () => {
    const lastNamesField = fields.lastNames as FormOptions;
    expect(lastNamesField.type).toBe('input');
    expect(lastNamesField.classes).toBe('govuk-label');
    expect((lastNamesField.label as Function)(generatedContent)).toBe(enContent.lastNames);
    expect(((lastNamesField as FormInput).hint as Function)(generatedContent)).toBe(enContent.lastNamesHint);
    expect(lastNamesField.labelSize).toBe(null);
    expect(lastNamesField.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
