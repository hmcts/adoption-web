import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './address-international';
import { form as manualAddressForm } from './address-manual';

jest.mock('../../../app/form/validation');

const enContent = {
  addressLine1: 'Address line 1',
  addressLine2: 'Address line 2 (optional)',
  addressLine3: 'Address line 3 (optional)',
  town: 'Town or city (optional)',
  county: 'County, district, state or province (optional)',
  postcode: 'Postcode, zip code or area code (optional)',
  country: 'Country',
};

const cyContent = {
  addressLine1: 'Llinell cyfeiriad 1',
  addressLine2: 'Llinell cyfeiriad 2 (dewisol)',
  addressLine3: 'Llinell cyfeiriad 3 (dewisol)',
  town: 'Tref neu ddinas (dewisol)',
  county: 'Sir, rhanbarth, gwladwriaeth neu dalaith (dewisol)',
  postcode: 'Cod post, cod zip neu god rhanbarth (dewisol)',
  country: 'Gwlad',
  errors: {
    address1: {
      required: 'Nac ydwdwch linell gyntaf y cyfeiriad',
    },
    addressCountry: {
      required: 'Nac ydwdwch y wlad',
    },
  },
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
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
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
