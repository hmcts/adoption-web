import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../app/form/validation';
// import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > address > manual > content', () => {
  const commonContent = { language: 'en', userCase: { applicant1Address1: 'address line 1' } } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual('Primary applicant');
    expect(generatedContent.title).toEqual("What's your home address?");
    expect(generatedContent.buildingStreet).toEqual('Building and street');
    expect(generatedContent.town).toEqual('Town or city');
    expect(generatedContent.county).toEqual('County');
    expect((generatedContent.errors as any).applicant1Address1.required).toEqual('Enter the first line of the address');
    expect((generatedContent.errors as any).applicant1AddressTown.required).toEqual('Enter the town or city');
    expect((generatedContent.errors as any).applicant1AddressPostcode.required).toEqual('Enter a valid postcode');
    expect((generatedContent.errors as any).applicant1AddressPostcode.invalid).toEqual('Enter a valid postcode');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual('Primary applicant (in welsh)');
    expect(generatedContent.title).toEqual("What's your home address? (in welsh)");
    expect(generatedContent.buildingStreet).toEqual('Building and street (in welsh)');
    expect(generatedContent.town).toEqual('Town or city (in welsh)');
    expect(generatedContent.county).toEqual('County (in welsh)');
    expect((generatedContent.errors as any).applicant1Address1.required).toEqual(
      'Enter the first line of the address (in welsh)'
    );
    expect((generatedContent.errors as any).applicant1AddressTown.required).toEqual(
      'Enter the town or city (in welsh)'
    );
    expect((generatedContent.errors as any).applicant1AddressPostcode.required).toEqual(
      'Enter a valid postcode (in welsh)'
    );
    expect((generatedContent.errors as any).applicant1AddressPostcode.invalid).toEqual(
      'Enter a valid postcode (in welsh)'
    );
  });

  test('should contain applicant1Address1 field', () => {
    const applicant1Address1Field = fields.applicant1Address1 as FormOptions;
    expect(applicant1Address1Field.type).toBe('text');
    expect(applicant1Address1Field.classes).toBe('govuk-label');
    expect((applicant1Address1Field.label as Function)(generatedContent)).toBe('Building and street');
    expect(applicant1Address1Field.labelSize).toBe(null);
    expect(applicant1Address1Field.validator).toBe(isFieldFilledIn);
  });

  test('should contain applicant1Address2 field', () => {
    const applicant1Address2Field = fields.applicant1Address2 as FormOptions;
    expect(applicant1Address2Field.type).toBe('text');
    expect(applicant1Address2Field.classes).toBe('govuk-label');
    expect(applicant1Address2Field.label).toBe('');
    expect(applicant1Address2Field.labelSize).toBe(null);
  });

  test('should contain applicant1AddressTown field', () => {
    const applicant1AddressTownField = fields.applicant1AddressTown as FormOptions;
    expect(applicant1AddressTownField.type).toBe('text');
    expect(applicant1AddressTownField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((applicant1AddressTownField.label as Function)(generatedContent)).toBe('Town or city');
    expect(applicant1AddressTownField.labelSize).toBe(null);
    expect(applicant1AddressTownField.validator).toBe(isFieldFilledIn);
  });

  test('should contain applicant1AddressCounty field', () => {
    const applicant1AddressCountyField = fields.applicant1AddressCounty as FormOptions;
    expect(applicant1AddressCountyField.type).toBe('text');
    expect(applicant1AddressCountyField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((applicant1AddressCountyField.label as Function)(generatedContent)).toBe('County');
    expect(applicant1AddressCountyField.labelSize).toBe(null);
  });

  test('should contain applicant1AddressPostcode field', () => {
    const applicant1AddressPostcodeField = fields.applicant1AddressPostcode as FormOptions;
    expect(applicant1AddressPostcodeField.type).toBe('text');
    expect(applicant1AddressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((applicant1AddressPostcodeField.label as Function)(generatedContent)).toBe('Postcode');
    expect(applicant1AddressPostcodeField.labelSize).toBe(null);
    expect(applicant1AddressPostcodeField.validator).toBe(isInvalidPostcode);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
