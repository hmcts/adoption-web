import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateSelectAddressContent,
  form as selectAddressForm,
} from '../../../common/components/address-select';
import { APPLICANT_1_FIND_ADDRESS, APPLICANT_1_MANUAL_ADDRESS } from '../../../urls';

import { generateContent } from './content';

const enContent = {
  section: 'First applicant',
  title: "What's your home address?",
  changePostCodeUrl: APPLICANT_1_FIND_ADDRESS,
  cantFindAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
};

const cyContent = {
  section: 'Ceisydd cyntaf',
  title: 'Beth yw eich cyfeiriad cartref?',
  changePostCodeUrl: APPLICANT_1_FIND_ADDRESS,
  cantFindAddressUrl: APPLICANT_1_MANUAL_ADDRESS,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('applicant1 > address > select > content', () => {
  const commonContent = { language: 'en', userCase: {}, addresses: [] as any[] } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    const selectAddressContent = generateSelectAddressContent(commonContent);
    const selectAddressErrors = selectAddressContent.errors as Record<string, unknown>;
    languageAssertions(
      'en',
      {
        ...enContent,
        errors: {
          applicant1SelectAddress: selectAddressErrors.selectAddress,
        },
      },
      () => generateContent(commonContent)
    );
  });

  test('should return correct welsh content', () => {
    const selectAddressContent = generateSelectAddressContent({ ...commonContent, language: 'cy' });
    const selectAddressErrors = selectAddressContent.errors as Record<string, unknown>;
    languageAssertions(
      'cy',
      {
        ...cyContent,
        errors: {
          applicant1SelectAddress: selectAddressErrors.selectAddress,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain applicant1SelectAddress field', () => {
    const selectAddressFormFields = selectAddressForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.applicant1SelectAddress).toEqual(selectAddressFormFields.selectAddress);
  });

  it('should have applicant1SelectAddress label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Applicant');
  });

  it('should have applicant1SelectAddress label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Ceisydd');
  });

  test('should contain submit button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)).toBe(
      'Save and continue'
    );
  });

  test('should contain saveAsDraft button', () => {
    const form = generatedContent.form as FormContent;
    expect(
      (form.saveAsDraft?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save as draft');
  });
});
