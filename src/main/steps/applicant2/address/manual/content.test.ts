import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn, isInvalidPostcode } from '../../../../app/form/validation';
// import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant2 > address > manual > content', () => {
  const commonContent = { language: 'en', userCase: { applicant2Address1: 'address line 1' } } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual('Second applicant');
    expect(generatedContent.title).toEqual("What's your home address?");
    expect(generatedContent.buildingStreet).toEqual('Building and street');
    expect(generatedContent.town).toEqual('Town or city');
    expect(generatedContent.county).toEqual('County');
    expect((generatedContent.errors as any).applicant2Address1.required).toEqual('Enter the first line of the address');
    expect((generatedContent.errors as any).applicant2AddressTown.required).toEqual('Enter the town or city');
    expect((generatedContent.errors as any).applicant2AddressPostcode.required).toEqual('Enter a valid postcode');
    expect((generatedContent.errors as any).applicant2AddressPostcode.invalid).toEqual('Enter a valid postcode');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual('Second applicant (in welsh)');
    expect(generatedContent.title).toEqual("What's your home address? (in welsh)");
    expect(generatedContent.buildingStreet).toEqual('Building and street (in welsh)');
    expect(generatedContent.town).toEqual('Town or city (in welsh)');
    expect(generatedContent.county).toEqual('County (in welsh)');
    expect((generatedContent.errors as any).applicant2Address1.required).toEqual(
      'Enter the first line of the address (in welsh)'
    );
    expect((generatedContent.errors as any).applicant2AddressTown.required).toEqual(
      'Enter the town or city (in welsh)'
    );
    expect((generatedContent.errors as any).applicant2AddressPostcode.required).toEqual(
      'Enter a valid postcode (in welsh)'
    );
    expect((generatedContent.errors as any).applicant2AddressPostcode.invalid).toEqual(
      'Enter a valid postcode (in welsh)'
    );
  });

  test('should contain applicant2Address1 field', () => {
    const applicant2Address1Field = fields.applicant2Address1 as FormOptions;
    expect(applicant2Address1Field.type).toBe('text');
    expect(applicant2Address1Field.classes).toBe('govuk-label');
    expect((applicant2Address1Field.label as Function)(generatedContent)).toBe('Building and street');
    expect(applicant2Address1Field.labelSize).toBe(null);
    expect(applicant2Address1Field.validator).toBe(isFieldFilledIn);
  });

  test('should contain applicant2Address2 field', () => {
    const applicant2Address2Field = fields.applicant2Address2 as FormOptions;
    expect(applicant2Address2Field.type).toBe('text');
    expect(applicant2Address2Field.classes).toBe('govuk-label');
    expect(applicant2Address2Field.label).toBe('');
    expect(applicant2Address2Field.labelSize).toBe(null);
  });

  test('should contain applicant2AddressTown field', () => {
    const applicant2AddressTownField = fields.applicant2AddressTown as FormOptions;
    expect(applicant2AddressTownField.type).toBe('text');
    expect(applicant2AddressTownField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((applicant2AddressTownField.label as Function)(generatedContent)).toBe('Town or city');
    expect(applicant2AddressTownField.labelSize).toBe(null);
    expect(applicant2AddressTownField.validator).toBe(isFieldFilledIn);
  });

  test('should contain applicant2AddressCounty field', () => {
    const applicant2AddressCountyField = fields.applicant2AddressCounty as FormOptions;
    expect(applicant2AddressCountyField.type).toBe('text');
    expect(applicant2AddressCountyField.classes).toBe('govuk-label govuk-!-width-two-thirds');
    expect((applicant2AddressCountyField.label as Function)(generatedContent)).toBe('County');
    expect(applicant2AddressCountyField.labelSize).toBe(null);
  });

  test('should contain applicant2AddressPostcode field', () => {
    const applicant2AddressPostcodeField = fields.applicant2AddressPostcode as FormOptions;
    expect(applicant2AddressPostcodeField.type).toBe('text');
    expect(applicant2AddressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((applicant2AddressPostcodeField.label as Function)(generatedContent)).toBe('Postcode');
    expect(applicant2AddressPostcodeField.labelSize).toBe(null);
    expect(applicant2AddressPostcodeField.validator).toBe(isInvalidPostcode);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
