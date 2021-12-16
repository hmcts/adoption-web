import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('dob-content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });
    expect(generatedContent.title).toEqual("What's your date of birth?");
    expect(generatedContent.section).toEqual('Primary applicant');
    expect(generatedContent.hint).toEqual('For example, 28 6 1997');
  });

  test("should return correct welsh content for cannot adopt page because they're 18 or over", () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: 'cy',
    });
    expect(generatedContent.title).toEqual("What's your date of birth? (in Welsh)");
    expect(generatedContent.section).toEqual('Primary applicant (in Welsh)');
    expect(generatedContent.hint).toEqual('For example, 28 6 1997 (in Welsh)');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });

  test('should contain dateOfBirth field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const dobField = fields.dateOfBirth as FormOptions;
    expect(dobField.type).toBe('date');
    expect(dobField.classes).toBe('govuk-date-input');
    expect((dobField.label as Function)(generatedContent)).toBe("What's your date of birth?");
    // expect((dobField.values[0].label as DateConstructor)).toBe('day');
    // expect((dobField.values[1].label as Function)(generatedContent)).toBe(
    //   "I'm applying with my spouse or civil partner"
    // );
    // expect((dobField.values[2].label as Function)(generatedContent)).toBe(
    //   "I'm applying with someone who is not my spouse or civil partner"
    // );
    // expect(dobField.validator).toBe(validator);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
