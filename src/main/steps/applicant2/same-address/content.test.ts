import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applying-with content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      applyingWith: 'alone',
      applicant1Address1: 'MOCK_ADDRESS_LINE_1',
      applicant1AddressTown: 'MOCK_ADDRESS_TOWN',
      applicant1AddressPostcode: 'MOCK_ADDRESS_POSTCODE',
    },
  } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toBe('Second applicant');
    expect(generatedContent.label).toBe('Do you also live at this address?');
    expect(generatedContent.yes).toBe('Yes');
    expect(generatedContent.no).toBe('No');
    expect((generatedContent.errors as any).applicant2AddressSameAsApplicant1.required).toEqual(
      'Please answer the question'
    );
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toBe('Second applicant (in welsh)');
    expect(generatedContent.label).toBe('Do you also live at this address? (in welsh)');
    expect(generatedContent.yes).toBe('Yes (in welsh)');
    expect(generatedContent.no).toBe('No (in welsh)');
    expect((generatedContent.errors as any).applicant2AddressSameAsApplicant1.required).toEqual(
      'Please answer the question (in welsh)'
    );
  });

  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant2AddressSameAsApplicant1Field = fields.applicant2AddressSameAsApplicant1 as FormOptions;
    expect(applicant2AddressSameAsApplicant1Field.type).toBe('radios');
    expect(applicant2AddressSameAsApplicant1Field.classes).toBe('govuk-radios');
    expect((applicant2AddressSameAsApplicant1Field.label as Function)(generatedContent)).toBe(
      'Do you also live at this address?'
    );
    expect((applicant2AddressSameAsApplicant1Field.section as Function)(generatedContent)).toBe('Second applicant');
    expect(((applicant2AddressSameAsApplicant1Field as FormInput).hint as Function)(generatedContent)).toBe(
      '<div class="govuk-inset-text">MOCK_ADDRESS_LINE_1<br>MOCK_ADDRESS_TOWN<br>MOCK_ADDRESS_POSTCODE</div>'
    );
    expect((applicant2AddressSameAsApplicant1Field.values[0].label as Function)(generatedContent)).toBe('Yes');
    expect((applicant2AddressSameAsApplicant1Field.values[1].label as Function)(generatedContent)).toBe('No');
    expect(applicant2AddressSameAsApplicant1Field.validator).toBe(isFieldFilledIn);
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
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
