import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isInvalidPostcode } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('find-address content', () => {
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

    expect((generatedContent.errors as any).applicant2AddressPostcode.required).toEqual('Enter a valid postcode');
    expect((generatedContent.errors as any).applicant2AddressPostcode.invalid).toEqual('Enter a valid postcode');

    expect(generatedContent.manualAddressUrl).toEqual('/applicant2/manual-address');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual('Primary applicant (in welsh)');
    expect(generatedContent.title).toEqual("What's your home address? (in welsh)");
    expect(generatedContent.line1).toEqual("We'll send all court papers to this address. (in welsh)");
    expect(generatedContent.postcode).toEqual('Postcode (in welsh)');
    expect(generatedContent.findAddress).toEqual('Find address (in welsh)');
    expect(generatedContent.enterAddressManually).toEqual('Or enter address manually (in welsh)');

    expect((generatedContent.errors as any).applicant2AddressPostcode.required).toEqual(
      'Enter a valid postcode (in welsh)'
    );
    expect((generatedContent.errors as any).applicant2AddressPostcode.invalid).toEqual(
      'Enter a valid postcode (in welsh)'
    );

    expect(generatedContent.manualAddressUrl).toEqual('/applicant2/manual-address');
  });

  test('should contain applicant2AddressPostcode field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant2AddressPostcodeField = fields.applicant2AddressPostcode as FormOptions;

    expect(applicant2AddressPostcodeField.type).toBe('text');
    expect(applicant2AddressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((applicant2AddressPostcodeField.label as Function)(generatedContent)).toBe('Postcode');
    expect(applicant2AddressPostcodeField.labelSize).toBe('m');
    expect(applicant2AddressPostcodeField.attributes!.maxLength).toBe(14);
    expect(applicant2AddressPostcodeField.validator).toBe(isInvalidPostcode);
  });

  test('should contain find address button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatedContent)).toBe('Find address');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
