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
    expect(generatedContent.title).toEqual('Are you, and the other applicant if relevant, both aged 21 or over?');
    expect(generatedContent.section).toEqual("Check you're eligible to adopt");
    expect(generatedContent.under21Yes).toEqual(
      'You must be 21 or over to adopt a child. This includes any other applicant.'
    );
    expect(generatedContent.one).toEqual('Yes');
    expect(generatedContent.two).toEqual('No');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.title).toEqual(
      'Are you, and the other applicant if relevant, both aged 21 or over? (in welsh)'
    );
    expect(generatedContent.section).toEqual("Check you're eligible to adopt (in welsh)");
    expect(generatedContent.under21Yes).toEqual(
      'You must be 21 or over to adopt a child. This includes any other applicant. (in welsh)'
    );
    expect(generatedContent.one).toEqual('Yes (in welsh)');
    expect(generatedContent.two).toEqual('No (in welsh)');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain under21Eligible field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const under21Eligible = fields.under21Eligible as FormOptions;
    expect(under21Eligible.type).toBe('radios');
    expect((under21Eligible as FormInput).classes).toBe('govuk-radios');
    expect((under21Eligible.label as Function)(generatedContent)).toBe(
      'Are you, and the other applicant if relevant, both aged 21 or over?'
    );
    expect((under21Eligible.section as Function)(generatedContent)).toBe("Check you're eligible to adopt");
    expect((under21Eligible.values[0].label as Function)(generatedContent)).toBe(YesOrNo.YES);
    expect((under21Eligible.values[1].label as Function)(generatedContent)).toBe(YesOrNo.NO);
    expect((under21Eligible.values[1].conditionalText as Function)(generatedContent)).toBe(
      '<p class="govuk-label">You must be 21 or over to adopt a child. This includes any other applicant.</p>'
    );
    expect(under21Eligible.validator).toBe(isFieldFilledIn);
  });
});
/* eslint-disable @typescript-eslint/ban-types */
