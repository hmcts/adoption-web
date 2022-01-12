import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateInternationalAddressContent,
  form as internationalAddressForm,
} from '../../../common/components/address-international';

import { generateContent } from './content';

const enContent = {
  section: "Birth mother's details",
  title: "What is the birth mother's last known address?",
};

const cyContent = {
  section: "Birth mother's details (in welsh)",
  title: "What is the birth mother's last known address? (in welsh)",
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('birth-mother > address > international > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  const internationalAddressFormFields = internationalAddressForm.fields as FormFields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    const internationalAddressContent = generateInternationalAddressContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.errors).toEqual({
      birthMotherAddress1: (internationalAddressContent.errors as any).address1,
      birthMotherAddressCountry: (internationalAddressContent.errors as any).addressCountry,
    });
  });

  test('should return correct welsh content', () => {
    const internationalAddressContent = generateInternationalAddressContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.errors).toEqual({
      birthMotherAddress1: (internationalAddressContent.errors as any).address1,
      birthMotherAddressCountry: (internationalAddressContent.errors as any).addressCountry,
    });
  });

  test('should contain birthMotherAddress1 field', () => {
    const birthMotherAddress1Field = fields.birthMotherAddress1 as FormOptions;
    expect(birthMotherAddress1Field).toEqual(internationalAddressFormFields.address1);
  });

  test('should contain birthMotherAddress2 field', () => {
    const birthMotherAddress2Field = fields.birthMotherAddress2 as FormOptions;
    expect(birthMotherAddress2Field).toEqual(internationalAddressFormFields.address2);
  });

  test('should contain birthMotherAddress3 field', () => {
    const birthMotherAddress3Field = fields.birthMotherAddress3 as FormOptions;
    expect(birthMotherAddress3Field).toEqual(internationalAddressFormFields.address3);
  });

  test('should contain birthMotherAddressTown field', () => {
    const birthMotherAddressTownField = fields.birthMotherAddressTown as FormOptions;
    expect(birthMotherAddressTownField).toEqual({
      ...internationalAddressFormFields.addressTown,
      validator: undefined,
    });
  });

  test('should contain birthMotherAddressCounty field', () => {
    const birthMotherAddressCountyField = fields.birthMotherAddressCounty as FormOptions;
    expect(birthMotherAddressCountyField).toEqual(internationalAddressFormFields.addressCounty);
  });

  test('should contain birthMotherAddressPostcode field', () => {
    const birthMotherAddressPostcodeField = fields.birthMotherAddressPostcode as FormOptions;
    expect(birthMotherAddressPostcodeField).toEqual({
      ...internationalAddressFormFields.addressPostcode,
      validator: undefined,
    });
  });

  test('should contain birthMotherAddressCountry field', () => {
    const birthMotherAddressCountryField = fields.birthMotherAddressCountry as FormOptions;
    expect(birthMotherAddressCountryField).toEqual(internationalAddressFormFields.addressCountry);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
