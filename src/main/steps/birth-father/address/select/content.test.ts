/* eslint-disable jest/expect-expect */
import { FormContent, FormFields } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { form as selectAddressForm } from '../../../common/components/address-select';
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
describe('birthFather > address > select > content', () => {
  const commonContent = { language: 'en', userCase: {}, addresses: [] as any[] } as CommonContent;
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

  test('should contain birthFatherSelectAddress field', () => {
    const selectAddressFormFields = selectAddressForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.birthFatherSelectAddress).toEqual(selectAddressFormFields.selectAddress);
  });

  test('should contain submit button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
