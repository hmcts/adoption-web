import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateManualAddressContent,
  form as manualAddressForm,
} from '../../../common/components/address-manual';

import { generateContent } from './content';

const enContent = {
  section: 'First applicant',
  title: "What's your home address?",
};

const cyContent = {
  section: 'First applicant (in welsh)',
  title: "What's your home address? (in welsh)",
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
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.errors).toEqual({
      applicant1Address1: (manualAddressContent.errors as any).address1,
      applicant1AddressTown: (manualAddressContent.errors as any).addressTown,
      applicant1AddressPostcode: (manualAddressContent.errors as any).addressPostcode,
    });
  });

  test('should return correct welsh content', () => {
    const manualAddressContent = generateManualAddressContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.errors).toEqual({
      applicant1Address1: (manualAddressContent.errors as any).address1,
      applicant1AddressTown: (manualAddressContent.errors as any).addressTown,
      applicant1AddressPostcode: (manualAddressContent.errors as any).addressPostcode,
    });
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

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
