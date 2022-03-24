import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateManualAddressContent,
  form as manualAddressForm,
} from '../../../common/components/address-manual';

import { generateContent } from './content';

const enContent = {
  section: 'First applicant',
  title: "What's your address?",
};

const cyContent = {
  section: 'Ceisydd cyntaf',
  title: 'Beth yw eich cyfeiriad?',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > address > manual > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  const manualAddressFormFields = manualAddressForm.fields as FormFields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    const manualAddressContent = generateManualAddressContent(commonContent);
    const manualAddressErrors = manualAddressContent.errors as Record<string, unknown>;
    languageAssertions(
      'en',
      {
        ...enContent,
        errors: {
          applicant1Address1: manualAddressErrors.address1,
          applicant1AddressTown: manualAddressErrors.addressTown,
          applicant1AddressPostcode: manualAddressErrors.addressPostcode,
        },
      },
      () => generateContent(commonContent)
    );
  });

  test('should return correct welsh content', () => {
    const manualAddressContent = generateManualAddressContent({ ...commonContent, language: 'cy' });
    const manualAddressErrors = manualAddressContent.errors as Record<string, unknown>;
    languageAssertions(
      'cy',
      {
        ...cyContent,
        errors: {
          applicant1Address1: manualAddressErrors.address1,
          applicant1AddressTown: manualAddressErrors.addressTown,
          applicant1AddressPostcode: manualAddressErrors.addressPostcode,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain applicant1Address1 field', () => {
    const applicant1Address1Field = fields.applicant1Address1 as FormOptions;
    expect(applicant1Address1Field).toEqual(manualAddressFormFields.address1);
  });

  test('should contain applicant1Address2 field', () => {
    const applicant1Address2Field = fields.applicant1Address2 as FormOptions;
    expect(applicant1Address2Field).toEqual(manualAddressFormFields.address2);
  });

  test('should contain applicant1AddressTown field', () => {
    const applicant1AddressTownField = fields.applicant1AddressTown as FormOptions;
    expect(applicant1AddressTownField).toEqual(manualAddressFormFields.addressTown);
  });

  test('should contain applicant1AddressCounty field', () => {
    const applicant1AddressCountyField = fields.applicant1AddressCounty as FormOptions;
    expect(applicant1AddressCountyField).toEqual(manualAddressFormFields.addressCounty);
  });

  test('should contain applicant1AddressPostcode field', () => {
    const applicant1AddressPostcodeField = fields.applicant1AddressPostcode as FormOptions;
    expect(applicant1AddressPostcodeField).toEqual(manualAddressFormFields.addressPostcode);
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

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
