import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateInternationalAddressContent,
  form as internationalAddressForm,
} from '../../../common/components/address-international';

import { generateContent } from './content';

const enContent = {
  section: "Other person's details",
  title: "What is the other person's last known address?",
};

const cyContent = {
  section: 'Manylion person arall',
  title: 'Beth yw cyfeiriad olaf hysbys y person arall?',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('other-parent > address > international > content', () => {
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
          otherParentAddress1: internationalAddressErrors.address1,
          otherParentAddressCountry: internationalAddressErrors.addressCountry,
        },
      },
      () => generateContent(commonContent)
    );
  });

  test('should return correct welsh content', () => {
    const internationalAddressContent = generateInternationalAddressContent({ ...commonContent, language: 'cy' });
    const internationalAddressErrors = internationalAddressContent.errors as Record<string, unknown>;
    languageAssertions(
      'cy',
      {
        ...cyContent,
        errors: {
          otherParentAddress1: internationalAddressErrors.address1,
          otherParentAddressCountry: internationalAddressErrors.addressCountry,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain otherParentAddress1 field', () => {
    const otherParentAddress1Field = fields.otherParentAddress1 as FormOptions;
    expect(otherParentAddress1Field).toEqual(internationalAddressFormFields.address1);
  });

  test('should contain otherParentAddress2 field', () => {
    const otherParentAddress2Field = fields.otherParentAddress2 as FormOptions;
    expect(otherParentAddress2Field).toEqual(internationalAddressFormFields.address2);
  });

  test('should contain otherParentAddress3 field', () => {
    const otherParentAddress3Field = fields.otherParentAddress3 as FormOptions;
    expect(otherParentAddress3Field).toEqual(internationalAddressFormFields.address3);
  });

  test('should contain otherParentAddressTown field', () => {
    const otherParentAddressTownField = fields.otherParentAddressTown as FormOptions;
    expect(otherParentAddressTownField).toEqual({
      ...internationalAddressFormFields.addressTown,
      validator: undefined,
    });
  });

  test('should contain otherParentAddressCounty field', () => {
    const otherParentAddressCountyField = fields.otherParentAddressCounty as FormOptions;
    expect(otherParentAddressCountyField).toEqual(internationalAddressFormFields.addressCounty);
  });

  test('should contain otherParentAddressPostcode field', () => {
    const otherParentAddressPostcodeField = fields.otherParentAddressPostcode as FormOptions;
    expect(otherParentAddressPostcodeField).toEqual({
      ...internationalAddressFormFields.addressPostcode,
      validator: undefined,
    });
  });

  test('should contain otherParentAddressCountry field', () => {
    const otherParentAddressCountryField = fields.otherParentAddressCountry as FormOptions;
    expect(otherParentAddressCountryField).toEqual(internationalAddressFormFields.addressCountry);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
