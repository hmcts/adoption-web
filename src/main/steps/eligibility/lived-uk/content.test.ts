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
    expect(generatedContent.title).toEqual(
      'Have you and any other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for at least 12 months?'
    );
    expect(generatedContent.section).toEqual("Check you're eligible to adopt");
    expect(generatedContent.livedUKNo).toEqual(
      'You cannot apply to adopt a child unless you have a permanent home here.'
    );
    expect(generatedContent.one).toEqual('Yes');
    expect(generatedContent.two).toEqual('No');
    expect(generatedContent.hint).toEqual('You can answer yes if your permanent home is here.');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.title).toEqual(
      'Have you and any other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for at least 12 months? (in welsh)'
    );
    expect(generatedContent.section).toEqual("Check you're eligible to adopt (in welsh)");
    expect(generatedContent.livedUKNo).toEqual(
      'You cannot apply to adopt a child unless you have a permanent home here. (in welsh)'
    );
    expect(generatedContent.one).toEqual('Yes (in welsh)');
    expect(generatedContent.two).toEqual('No (in welsh)');
    expect(generatedContent.hint).toEqual('You can answer yes if your permanent home is here. (in welsh)');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain livedUKEligible field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const livedUKEligible = fields.livedUKEligible as FormOptions;
    expect(livedUKEligible.type).toBe('radios');
    expect((livedUKEligible as FormInput).classes).toBe('govuk-radios');
    expect((livedUKEligible.label as Function)(generatedContent)).toBe(
      'Have you and any other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for at least 12 months?'
    );
    expect(((livedUKEligible as FormInput).hint as Function)(generatedContent)).toBe(
      'You can answer yes if your permanent home is here.'
    );
    expect((livedUKEligible.section as Function)(generatedContent)).toBe("Check you're eligible to adopt");
    expect((livedUKEligible.values[0].label as Function)(generatedContent)).toBe(YesOrNo.YES);
    expect((livedUKEligible.values[1].label as Function)(generatedContent)).toBe(YesOrNo.NO);
    expect((livedUKEligible.values[1].conditionalText as Function)(generatedContent)).toBe(
      '<p class="govuk-label">You cannot apply to adopt a child unless you have a permanent home here.</p>'
    );
    expect(livedUKEligible.validator).toBe(isFieldFilledIn);
  });
});
/* eslint-disable @typescript-eslint/ban-types */
