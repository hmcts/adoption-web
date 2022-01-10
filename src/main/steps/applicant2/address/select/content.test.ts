import { FormContent, FormFields } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateSelectAddressContent,
  form as selectAddressForm,
} from '../../../common/components/address-select';

import { generateContent } from './content';

const enContent = {
  section: 'Second applicant',
  title: "What's your home address?",
};

const cyContent = {
  section: 'Second applicant (in welsh)',
  title: "What's your home address? (in welsh)",
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant2 > address > select > content', () => {
  const commonContent = { language: 'en', userCase: {}, addresses: [] as any[] } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    const selectAddressContent = generateSelectAddressContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.errors).toEqual({
      applicant2SelectAddress: (selectAddressContent.errors as any).selectAddress,
    });
    expect(generatedContent.changePostCodeUrl).toEqual('/applicant2/address/lookup');
    expect(generatedContent.cantFindAddressUrl).toEqual('/applicant2/address/manual');
  });

  test('should return correct welsh content', () => {
    const selectAddressContent = generateSelectAddressContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.errors).toEqual({
      applicant2SelectAddress: (selectAddressContent.errors as any).selectAddress,
    });
    expect(generatedContent.changePostCodeUrl).toEqual('/applicant2/address/lookup');
    expect(generatedContent.cantFindAddressUrl).toEqual('/applicant2/address/manual');
  });

  test('should contain applicant2SelectAddress field', () => {
    const selectAddressFormFields = selectAddressForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.applicant2SelectAddress).toEqual(selectAddressFormFields.selectAddress);
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
