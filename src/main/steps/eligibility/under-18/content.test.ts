import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('eligibility content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.label).toEqual(
      'Will the child be under 18 years old on the date you submit your application?'
    );
    expect(generatedContent.section).toEqual("Check you're eligible to adopt");
    expect(generatedContent.under18No).toEqual(
      'You can only apply to adopt a child if they are under 18 years old on the date your application is submitted.'
    );
    expect(generatedContent.one).toEqual('Yes');
    expect(generatedContent.two).toEqual('No');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.label).toEqual(
      'Will the child be under 18 years old on the date you submit your application? (in welsh)'
    );
    expect(generatedContent.section).toEqual("Check you're eligible to adopt (in welsh)");
    expect(generatedContent.under18No).toEqual(
      'You can only apply to adopt a child if they are under 18 years old on the date your application is submitted. (in welsh)'
    );
    expect(generatedContent.one).toEqual('Yes (in welsh)');
    expect(generatedContent.two).toEqual('No (in welsh)');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain under18Eligible field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const under18Eligible = fields.under18Eligible as FormOptions;
    expect(under18Eligible.type).toBe('radios');
    expect((under18Eligible as FormInput).classes).toBe('govuk-radios');
    expect((under18Eligible.label as Function)(generatedContent)).toBe(
      'Will the child be under 18 years old on the date you submit your application?'
    );
    expect((under18Eligible.section as Function)(generatedContent)).toBe("Check you're eligible to adopt");
    expect((under18Eligible.values[0].label as Function)(generatedContent)).toBe(YesOrNo.YES);
    expect((under18Eligible.values[1].label as Function)(generatedContent)).toBe(YesOrNo.NO);
    expect((under18Eligible.values[1].conditionalText as Function)(generatedContent)).toBe(
      '<p class="govuk-label">You can only apply to adopt a child if they are under 18 years old on the date your application is submitted.</p>'
    );
    expect(under18Eligible.validator).toBe(isFieldFilledIn);
  });
});
/* eslint-disable @typescript-eslint/ban-types */
