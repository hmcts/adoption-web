import { FormContent, FormFields } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import {
  form as addressLookupForm,
  generateContent as generateAddressLookupContent,
} from '../../../common/components/address-lookup';

import { generateContent } from './content';

const enContent = {
  section: "Other parent's details",
  title: "What's their address?",
};

const cyContent = {
  section: "Other parent's details (in Welsh)",
  title: "What's their address? (in Welsh)",
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('otherParent > address > lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    const addressLookupContent = generateAddressLookupContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.errors).toEqual({
      otherParentAddressPostcode: (addressLookupContent.errors as any).addressPostcode,
    });
    expect(generatedContent.manualAddressUrl).toEqual('/other-parent/address/manual');
  });

  test('should return correct welsh content', () => {
    const addressLookupContent = generateAddressLookupContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.errors).toEqual({
      otherParentAddressPostcode: (addressLookupContent.errors as any).addressPostcode,
    });
    expect(generatedContent.manualAddressUrl).toEqual('/other-parent/address/manual');
  });

  test('should contain otherParentAddressPostcode field', () => {
    const addressLookupFormFields = addressLookupForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.otherParentAddressPostcode).toEqual(addressLookupFormFields.addressPostcode);
  });

  test('should contain find address button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatedContent)).toBe('Find address');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
