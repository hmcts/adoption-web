import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isInvalidPostcode } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const enContent = {
  section: 'Primary applicant',
  title: "What's your home address?",
  line1: "We'll send all court papers to this address.",
  postcode: 'Postcode',
  findAddress: 'Find address',
  enterAddressManually: 'Or enter address manually',
  errors: {
    applicant1AddressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
};

const cyContent = {
  section: 'Primary applicant (in welsh)',
  title: "What's your home address? (in welsh)",
  line1: "We'll send all court papers to this address. (in welsh)",
  postcode: 'Postcode (in welsh)',
  findAddress: 'Find address (in welsh)',
  enterAddressManually: 'Or enter address manually (in welsh)',
  errors: {
    applicant1AddressPostcode: {
      required: 'Enter a valid postcode (in welsh)',
      invalid: 'Enter a valid postcode (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant1 > address > lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.line1).toEqual(enContent.line1);
    expect(generatedContent.postcode).toEqual(enContent.postcode);
    expect(generatedContent.findAddress).toEqual(enContent.findAddress);
    expect(generatedContent.enterAddressManually).toEqual(enContent.enterAddressManually);
    expect(generatedContent.errors).toEqual(enContent.errors);
    expect(generatedContent.manualAddressUrl).toEqual('/applicant1/address/manual');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.line1).toEqual(cyContent.line1);
    expect(generatedContent.postcode).toEqual(cyContent.postcode);
    expect(generatedContent.findAddress).toEqual(cyContent.findAddress);
    expect(generatedContent.enterAddressManually).toEqual(cyContent.enterAddressManually);
    expect(generatedContent.errors).toEqual(cyContent.errors);
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
/* eslint-enable @typescript-eslint/ban-types */
