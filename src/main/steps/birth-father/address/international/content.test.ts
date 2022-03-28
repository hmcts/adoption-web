/* eslint-disable jest/expect-expect */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateInternationalAddressContent,
  form as internationalAddressForm,
} from '../../../common/components/address-international';

import { generateContent } from './content';

const enContent = {
  section: "Birth father's details",
  title: "What is the birth father's last known address?",
};

const cyContent = {
  section: 'Manylion y tad biolegol',
  title: 'Beth yw cyfeiriad olaf hysbys y tad biolegol?',
};

describe('birth-father > address > international > content', () => {
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
    const internationalAddressErrors = internationalAddressContent.errors as Record<string, unknown>;
    languageAssertions(
      'en',
      {
        ...enContent,
        errors: {
          birthFatherAddress1: internationalAddressErrors.address1,
          birthFatherAddressCountry: internationalAddressErrors.addressCountry,
        },
      },
      () => generateContent(commonContent)
    );
  });

  test('should return correct Welsh content', () => {
    const internationalAddressContent = generateInternationalAddressContent({ ...commonContent, language: 'cy' });
    const internationalAddressErrors = internationalAddressContent.errors as Record<string, unknown>;
    languageAssertions(
      'cy',
      {
        ...cyContent,
        errors: {
          birthFatherAddress1: internationalAddressErrors.address1,
          birthFatherAddressCountry: internationalAddressErrors.addressCountry,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain birthFatherAddress1 field', () => {
    const birthFatherAddress1Field = fields.birthFatherAddress1 as FormOptions;
    expect(birthFatherAddress1Field).toEqual(internationalAddressFormFields.address1);
  });

  test('should contain birthFatherAddress2 field', () => {
    const birthFatherAddress2Field = fields.birthFatherAddress2 as FormOptions;
    expect(birthFatherAddress2Field).toEqual(internationalAddressFormFields.address2);
  });

  test('should contain birthFatherAddress3 field', () => {
    const birthFatherAddress3Field = fields.birthFatherAddress3 as FormOptions;
    expect(birthFatherAddress3Field).toEqual(internationalAddressFormFields.address3);
  });

  test('should contain birthFatherAddressTown field', () => {
    const birthFatherAddressTownField = fields.birthFatherAddressTown as FormOptions;
    expect(birthFatherAddressTownField).toEqual({
      ...internationalAddressFormFields.addressTown,
      validator: undefined,
    });
  });

  test('should contain birthFatherAddressCounty field', () => {
    const birthFatherAddressCountyField = fields.birthFatherAddressCounty as FormOptions;
    expect(birthFatherAddressCountyField).toEqual(internationalAddressFormFields.addressCounty);
  });

  test('should contain birthFatherAddressPostcode field', () => {
    const birthFatherAddressPostcodeField = fields.birthFatherAddressPostcode as FormOptions;
    expect(birthFatherAddressPostcodeField).toEqual({
      ...internationalAddressFormFields.addressPostcode,
      validator: undefined,
    });
  });

  test('should contain birthFatherAddressCountry field', () => {
    const birthFatherAddressCountryField = fields.birthFatherAddressCountry as FormOptions;
    expect(birthFatherAddressCountryField).toEqual(internationalAddressFormFields.addressCountry);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
