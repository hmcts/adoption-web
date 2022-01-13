import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { form as manualAddressForm } from '../../../common/components/address-manual';
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
describe('birth-father > address > manual > content', () => {
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
    languageAssertions('en', enContent, generateContent);
  });

  test('should return correct Welsh content', () => {
    languageAssertions('cy', cyContent, generateContent);
  });

  test('should contain birthFatherAddress1 field', () => {
    const birthFatherAddress1Field = fields.birthFatherAddress1 as FormOptions;
    expect(birthFatherAddress1Field).toEqual(manualAddressFormFields.address1);
  });

  test('should contain birthFatherAddress2 field', () => {
    const birthFatherAddress2Field = fields.birthFatherAddress2 as FormOptions;
    expect(birthFatherAddress2Field).toEqual(manualAddressFormFields.address2);
  });

  test('should contain birthFatherAddressTown field', () => {
    const birthFatherAddressTownField = fields.birthFatherAddressTown as FormOptions;
    expect(birthFatherAddressTownField).toEqual(manualAddressFormFields.addressTown);
  });

  test('should contain birthFatherAddressCounty field', () => {
    const birthFatherAddressCountyField = fields.birthFatherAddressCounty as FormOptions;
    expect(birthFatherAddressCountyField).toEqual(manualAddressFormFields.addressCounty);
  });

  test('should contain birthFatherAddressPostcode field', () => {
    const birthFatherAddressPostcodeField = fields.birthFatherAddressPostcode as FormOptions;
    expect(birthFatherAddressPostcodeField).toEqual(manualAddressFormFields.addressPostcode);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
