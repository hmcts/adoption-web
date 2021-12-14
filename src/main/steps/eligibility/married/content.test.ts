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
    expect(generatedContent.label).toEqual('Has the child ever been married or in a civil partnership?');
    expect(generatedContent.section).toEqual("Check you're eligible to adopt");
    expect(generatedContent.marriedYes).toEqual(
      "You can only apply to adopt a child if they've not been married or in a civil partnership."
    );
    expect(generatedContent.one).toEqual('Yes');
    expect(generatedContent.two).toEqual('No');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.label).toEqual('Has the child ever been married or in a civil partnership? (in welsh)');
    expect(generatedContent.section).toEqual("Check you're eligible to adopt (in welsh)");
    expect(generatedContent.marriedYes).toEqual(
      "You can only apply to adopt a child if they've not been married or in a civil partnership. (in welsh)"
    );
    expect(generatedContent.one).toEqual('Yes (in welsh)');
    expect(generatedContent.two).toEqual('No (in welsh)');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain marriedEligible field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const marriedEligibleField = fields.marriedEligible as FormOptions;
    expect(marriedEligibleField.type).toBe('radios');
    expect((marriedEligibleField as FormInput).classes).toBe('govuk-radios');
    expect((marriedEligibleField.label as Function)(generatedContent)).toBe(
      'Has the child ever been married or in a civil partnership?'
    );
    expect((marriedEligibleField.section as Function)(generatedContent)).toBe("Check you're eligible to adopt");
    expect((marriedEligibleField.values[0].label as Function)(generatedContent)).toBe(YesOrNo.YES);
    expect((marriedEligibleField.values[1].label as Function)(generatedContent)).toBe(YesOrNo.NO);
    expect(marriedEligibleField.validator).toBe(isFieldFilledIn);
    expect((marriedEligibleField.values[0].conditionalText as Function)(generatedContent)).toEqual(
      '<p class="govuk-label">You can only apply to adopt a child if they\'ve not been married or in a civil partnership.</p>'
    );
  });
});
/* eslint-disable @typescript-eslint/ban-types */
