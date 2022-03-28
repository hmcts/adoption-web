/* eslint-disable jest/expect-expect */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import {
  form as addressLookupForm,
  generateContent as generateAddressLookupContent,
} from '../../../common/components/address-lookup';
import { BIRTH_FATHER_MANUAL_ADDRESS } from '../../../urls';

import { generateContent } from './content';

const enContent = {
  section: "Birth father's details",
  title: "What is the birth father's last known address?",
  manualAddressUrl: BIRTH_FATHER_MANUAL_ADDRESS,
};

const cyContent = {
  section: 'Manylion y tad biolegol',
  title: 'Beth yw cyfeiriad olaf hysbys y tad biolegol?',
  manualAddressUrl: BIRTH_FATHER_MANUAL_ADDRESS,
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('birthFather > address > lookup > content', () => {
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
        errors: { birthFatherAddressPostcode: addressLookupErrors.addressPostcode },
      },
      () => generateContent(commonContent)
    );
  });

  test('should return correct Welsh content', () => {
    const addressLookupContent = generateAddressLookupContent({ ...commonContent, language: 'cy' });
    const addressLookupErrors = addressLookupContent.errors as Record<string, unknown>;
    languageAssertions(
      'cy',
      {
        ...cyContent,
        errors: { birthFatherAddressPostcode: addressLookupErrors.addressPostcode },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain birthFatherAddressPostcode field', () => {
    const addressLookupFormFields = addressLookupForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.birthFatherAddressPostcode).toEqual(addressLookupFormFields.addressPostcode);
  });

  test('should contain find address button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatedContent)).toBe('Find address');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
