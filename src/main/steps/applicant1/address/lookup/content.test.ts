import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import {
  form as addressLookupForm,
  generateContent as generateAddressLookupContent,
} from '../../../common/components/address-lookup';
import { APPLICANT_1_MANUAL_ADDRESS } from '../../../urls';

import { generateContent } from './content';

const enContent = {
  section: 'First applicant',
  title: "What's your home address?",
  manualAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
};

const cyContent = {
  section: 'Ceisydd cyntaf',
  title: 'Beth yw eich cyfeiriad cartref?',
  manualAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
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
    const addressLookupErrors = addressLookupContent.errors as Record<string, unknown>;
    languageAssertions(
      'en',
      {
        ...enContent,
        errors: { applicant1AddressPostcode: addressLookupErrors.addressPostcode },
      },
      () => generateContent(commonContent)
    );
  });

  test('should return correct welsh content', () => {
    const addressLookupContent = generateAddressLookupContent({ ...commonContent, language: 'cy' });
    const addressLookupErrors = addressLookupContent.errors as Record<string, unknown>;
    languageAssertions(
      'cy',
      {
        ...cyContent,
        errors: { applicant1AddressPostcode: addressLookupErrors.addressPostcode },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  it('should have applicant1AddressPostcode label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Applicant');
  });

  it('should have an applicant1AddressPostcode label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Ceisydd');
  });

  test('should contain applicant1AddressPostcode field', () => {
    const addressLookupFormFields = addressLookupForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.applicant1AddressPostcode).toEqual(addressLookupFormFields.addressPostcode);
  });

  test('should contain find address button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatedContent)).toBe('Find address');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
