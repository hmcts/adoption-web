import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateManualAddressContent,
  form as manualAddressForm,
} from '../../../common/components/address-manual';

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
describe('applicant2 > address > manual > content', () => {
  const commonContent = { language: 'en', userCase: { applicant2Address1: 'address line 1' } } as CommonContent;
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
      applicant2Address1: (manualAddressContent.errors as any).address1,
      applicant2AddressTown: (manualAddressContent.errors as any).addressTown,
      applicant2AddressPostcode: (manualAddressContent.errors as any).addressPostcode,
    });
  });

  test('should return correct welsh content', () => {
    const manualAddressContent = generateManualAddressContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.errors).toEqual({
      applicant2Address1: (manualAddressContent.errors as any).address1,
      applicant2AddressTown: (manualAddressContent.errors as any).addressTown,
      applicant2AddressPostcode: (manualAddressContent.errors as any).addressPostcode,
    });
  });

  test('should contain applicant2Address1 field', () => {
    const applicant2Address1Field = fields.applicant2Address1 as FormOptions;
    expect(applicant2Address1Field).toEqual(manualAddressFormFields.address1);
  });

  test('should contain applicant2Address2 field', () => {
    const applicant2Address2Field = fields.applicant2Address2 as FormOptions;
    expect(applicant2Address2Field).toEqual(manualAddressFormFields.address2);
  });

  test('should contain applicant2AddressTown field', () => {
    const applicant2AddressTownField = fields.applicant2AddressTown as FormOptions;
    expect(applicant2AddressTownField).toEqual(manualAddressFormFields.addressTown);
  });

  test('should contain applicant2AddressCounty field', () => {
    const applicant2AddressCountyField = fields.applicant2AddressCounty as FormOptions;
    expect(applicant2AddressCountyField).toEqual(manualAddressFormFields.addressCounty);
  });

  test('should contain applicant2AddressPostcode field', () => {
    const applicant2AddressPostcodeField = fields.applicant2AddressPostcode as FormOptions;
    expect(applicant2AddressPostcodeField).toEqual(manualAddressFormFields.addressPostcode);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
