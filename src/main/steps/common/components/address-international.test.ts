import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './address-international';
import { generateContent as generateManualAddressContent, form as manualAddressForm } from './address-manual';

jest.mock('../../../app/form/validation');

const enContent = {
  addressLine1: 'Address line 1',
  addressLine2: 'Address line 2 (Optional)',
  addressLine3: 'Address line 3 (Optional)',
  town: 'Town or city (Optional)',
  county: 'County, district, state or province (Optional)',
  postcode: 'Postcode, zip code or area code (Optional)',
  country: 'Country',
};

const cyContent = {
  addressLine1: 'Address line 1 (in welsh)',
  addressLine2: 'Address line 2 (Optional) (in welsh)',
  addressLine3: 'Address line 3 (Optional) (in welsh)',
  town: 'Town or city (Optional) (in welsh)',
  county: 'County, district, state or province (Optional) (in welsh)',
  postcode: 'Postcode, zip code or area code (Optional) (in welsh)',
  country: 'Country (in Welsh)',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('common > components > address-international > content', () => {
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
    expect(generatedContent.addressLine1).toEqual(enContent.addressLine1);
    expect(generatedContent.addressLine2).toEqual(enContent.addressLine2);
    expect(generatedContent.addressLine3).toEqual(enContent.addressLine3);
    expect(generatedContent.town).toEqual(enContent.town);
    expect(generatedContent.county).toEqual(enContent.county);
    expect(generatedContent.postcode).toEqual(enContent.postcode);
    expect(generatedContent.country).toEqual(enContent.country);
    expect(generatedContent.errors).toEqual({
      address1: (manualAddressContent.errors as any).address1,
      addressCountry: { required: 'Enter the country' },
    });
  });

  test('should return correct welsh content', () => {
    const manualAddressContent = generateManualAddressContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.addressLine1).toEqual(cyContent.addressLine1);
    expect(generatedContent.addressLine2).toEqual(cyContent.addressLine2);
    expect(generatedContent.addressLine3).toEqual(cyContent.addressLine3);
    expect(generatedContent.town).toEqual(cyContent.town);
    expect(generatedContent.county).toEqual(cyContent.county);
    expect(generatedContent.postcode).toEqual(cyContent.postcode);
    expect(generatedContent.country).toEqual(cyContent.country);
    expect(generatedContent.errors).toEqual({
      address1: (manualAddressContent.errors as any).address1,
      addressCountry: { required: 'Enter the country (in welsh)' },
    });
  });

  test('should contain address1 field', () => {
    const address1Field = fields.address1 as FormOptions;
    expect(address1Field).toEqual(manualAddressFormFields.address1);
  });

  test('should contain address2 field', () => {
    const address2Field = fields.address2 as FormOptions;
    expect(address2Field).toEqual(manualAddressFormFields.address2);
  });

  test('should contain address3 field', () => {
    const address3Field = fields.address3 as FormOptions;
    expect(address3Field.type).toBe('text');
    expect(address3Field.classes).toBe('govuk-label');
    expect((address3Field.label as Function)(generatedContent)).toBe(enContent.addressLine3);
    expect(address3Field.labelSize).toBe(null);
  });

  test('should contain addressTown field', () => {
    const addressTownField = fields.addressTown as FormOptions;
    expect(addressTownField).toMatchObject({ ...manualAddressFormFields.addressTown, validator: undefined });
  });

  test('should contain addressCounty field', () => {
    const addressCountyField = fields.addressCounty as FormOptions;
    expect(addressCountyField).toEqual(manualAddressFormFields.addressCounty);
  });

  test('should contain addressPostcode field', () => {
    const addressPostcodeField = fields.addressPostcode as FormOptions;
    expect(addressPostcodeField).toMatchObject({ ...manualAddressFormFields.addressPostcode, validator: undefined });
  });

  test('should contain addressCountry field', () => {
    const addressCountryField = fields.addressCountry as FormOptions;
    expect(addressCountryField.type).toBe('text');
    expect(addressCountryField.classes).toBe('govuk-label');
    expect(addressCountryField.labelSize).toBe(null);
    expect(addressCountryField.validator).toBe(isFieldFilledIn);
    expect((addressCountryField.label as Function)(generatedContent)).toBe(enContent.country);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
