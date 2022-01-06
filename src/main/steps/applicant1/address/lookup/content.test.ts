import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import {
  form as addressLookupForm,
  generateContent as generateAddressLookupContent,
} from '../../../common/components/address-lookup';

import { generateContent } from './content';

const enContent = {
  section: 'Primary applicant',
  title: "What's your home address?",
  line1: "We'll send all court papers to this address.",
};

const cyContent = {
  section: 'Primary applicant (in welsh)',
  title: "What's your home address? (in welsh)",
  line1: "We'll send all court papers to this address. (in welsh)",
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > address > lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    const addressLookupContent = generateAddressLookupContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.line1).toEqual(enContent.line1);
    expect(generatedContent.errors).toEqual({
      applicant1AddressPostcode: (addressLookupContent.errors as any).adressPostcode,
    });
    expect(generatedContent.manualAddressUrl).toEqual('/applicant1/address/manual');
  });

  test('should return correct welsh content', () => {
    const addressLookupContent = generateAddressLookupContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.line1).toEqual(cyContent.line1);
    expect(generatedContent.errors).toEqual({
      applicant1AddressPostcode: (addressLookupContent.errors as any).adressPostcode,
    });
    expect(generatedContent.manualAddressUrl).toEqual('/applicant1/address/manual');
  });

  test('should contain applicant1AddressPostcode field', () => {
    const addressLookupFormFields = addressLookupForm.fields as FormFields;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1AddressPostcodeField = fields.applicant1AddressPostcode as FormOptions;
    expect(applicant1AddressPostcodeField).toEqual(addressLookupFormFields.addressPostcode);
  });

  test('should contain find address button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatedContent)).toBe('Find address');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
