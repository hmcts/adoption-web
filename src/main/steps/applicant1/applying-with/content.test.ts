import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('applying-with content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toEqual('Application details');
    expect(generatedContent.label).toEqual('Are you applying on your own, or with someone else?');
    expect(generatedContent.one).toEqual("I'm applying on my own");
    expect(generatedContent.two).toEqual("I'm applying with my spouse or civil partner");
    expect(generatedContent.three).toEqual("I'm applying with someone who is not my spouse or civil partner");
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual('Application details (in welsh)');
    expect(generatedContent.label).toEqual('Are you applying on your own, or with someone else?(in welsh)');
    expect(generatedContent.one).toEqual("I'm applying on my own (in welsh)");
    expect(generatedContent.two).toEqual("I'm applying with my spouse or civil partner (in welsh)");
    expect(generatedContent.three).toEqual(
      "I'm applying with someone who is not my spouse or civil partner (in welsh)"
    );
  });

  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.applyingWith as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.label as Function)(generatedContent)).toBe(
      'Are you applying on your own, or with someone else?'
    );
    expect((applyingWithField.section as Function)(generatedContent)).toBe('Application details');
    expect((applyingWithField.values[0].label as Function)(generatedContent)).toBe("I'm applying on my own");
    expect((applyingWithField.values[1].label as Function)(generatedContent)).toBe(
      "I'm applying with my spouse or civil partner"
    );
    expect((applyingWithField.values[2].label as Function)(generatedContent)).toBe(
      "I'm applying with someone who is not my spouse or civil partner"
    );
    expect(applyingWithField.validator).toBe(isFieldFilledIn);
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
});
/* eslint-enable @typescript-eslint/ban-types */
