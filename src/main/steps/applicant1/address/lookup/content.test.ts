import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isInvalidPostcode } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > find-address > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual('Primary applicant');
    expect(generatedContent.title).toEqual("What's your home address?");
    expect(generatedContent.line1).toEqual("We'll send all court papers to this address.");
    expect(generatedContent.postcode).toEqual('Postcode');
    expect(generatedContent.findAddress).toEqual('Find address');
    expect(generatedContent.enterAddressManually).toEqual('Or enter address manually');

    expect((generatedContent.errors as any).applicant1AddressPostcode.required).toEqual('Enter a valid postcode');
    expect((generatedContent.errors as any).applicant1AddressPostcode.invalid).toEqual('Enter a valid postcode');

    expect(generatedContent.manualAddressUrl).toEqual('/applicant1/address/manual');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual('Primary applicant (in welsh)');
    expect(generatedContent.title).toEqual("What's your home address? (in welsh)");
    expect(generatedContent.line1).toEqual("We'll send all court papers to this address. (in welsh)");
    expect(generatedContent.postcode).toEqual('Postcode (in welsh)');
    expect(generatedContent.findAddress).toEqual('Find address (in welsh)');
    expect(generatedContent.enterAddressManually).toEqual('Or enter address manually (in welsh)');

    expect((generatedContent.errors as any).applicant1AddressPostcode.required).toEqual(
      'Enter a valid postcode (in welsh)'
    );
    expect((generatedContent.errors as any).applicant1AddressPostcode.invalid).toEqual(
      'Enter a valid postcode (in welsh)'
    );

    expect(generatedContent.manualAddressUrl).toEqual('/applicant1/address/manual');
  });

  test('should contain applicant1AddressPostcode field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1AddressPostcodeField = fields.applicant1AddressPostcode as FormOptions;

    expect(applicant1AddressPostcodeField.type).toBe('text');
    expect(applicant1AddressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((applicant1AddressPostcodeField.label as Function)(generatedContent)).toBe('Postcode');
    expect(applicant1AddressPostcodeField.labelSize).toBe('m');
    expect(applicant1AddressPostcodeField.attributes!.maxLength).toBe(14);
    expect(applicant1AddressPostcodeField.validator).toBe(isInvalidPostcode);
  });

  test('should contain find address button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatedContent)).toBe('Find address');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
