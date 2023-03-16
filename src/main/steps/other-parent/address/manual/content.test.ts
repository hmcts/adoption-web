import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateManualAddressContent,
  form as manualAddressForm,
} from '../../../common/components/address-manual';
import { OTHER_PARENT_INTERNATIONAL_ADDRESS } from '../../../urls';

import { generateContent } from './content';

const enContent = {
  section: "Other person's details",
  title: "What is the other person's last known address?",
  internationalAddressUrl: OTHER_PARENT_INTERNATIONAL_ADDRESS,
};

const cyContent = {
  section: 'Manylion person arall',
  title: 'Beth yw cyfeiriad olaf hysbys y person arall?',
  internationalAddressUrl: OTHER_PARENT_INTERNATIONAL_ADDRESS,
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('other-parent > address > manual > content', () => {
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
          otherParentAddress1: manualAddressErrors.address1,
          otherParentAddressTown: manualAddressErrors.addressTown,
          otherParentAddressPostcode: manualAddressErrors.addressPostcode,
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
          otherParentAddress1: manualAddressErrors.address1,
          otherParentAddressTown: manualAddressErrors.addressTown,
          otherParentAddressPostcode: manualAddressErrors.addressPostcode,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain otherParentAddress1 field', () => {
    const otherParentAddress1Field = fields.otherParentAddress1 as FormOptions;
    expect(otherParentAddress1Field).toEqual(manualAddressFormFields.address1);
  });

  test('should contain otherParentAddress2 field', () => {
    const otherParentAddress2Field = fields.otherParentAddress2 as FormOptions;
    expect(otherParentAddress2Field).toEqual(manualAddressFormFields.address2);
  });

  test('should contain otherParentAddressTown field', () => {
    const otherParentAddressTownField = fields.otherParentAddressTown as FormOptions;
    expect(otherParentAddressTownField).toEqual(manualAddressFormFields.addressTown);
  });

  test('should contain otherParentAddressCounty field', () => {
    const otherParentAddressCountyField = fields.otherParentAddressCounty as FormOptions;
    expect(otherParentAddressCountyField).toEqual(manualAddressFormFields.addressCounty);
  });

  test('should contain otherParentAddressPostcode field', () => {
    const otherParentAddressPostcodeField = fields.otherParentAddressPostcode as FormOptions;
    expect(otherParentAddressPostcodeField).toEqual(manualAddressFormFields.addressPostcode);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
