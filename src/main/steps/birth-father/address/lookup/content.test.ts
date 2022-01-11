/* eslint-disable jest/expect-expect */
import { FormContent, FormFields } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';
import { form as addressLookupForm } from '../../../common/components/address-lookup';
import { languageAssertions } from '../../../common/test/languageAssertions';

import { generateContent } from './content';

const enContent = {
  section: "Birth father's details",
  title: "What is the birth father's last known address?",
};

const cyContent = {
  section: "Birth father's details (in Welsh)",
  title: "What is the birth father's last known address? (in Welsh)",
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('birthFather > address > lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, generateContent);
  });

  test('should return correct Welsh content', () => {
    languageAssertions('cy', cyContent, generateContent);
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
