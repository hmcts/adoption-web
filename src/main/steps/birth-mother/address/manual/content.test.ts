import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateManualAddressContent,
  form as manualAddressForm,
} from '../../../common/components/address-manual';
import { BIRTH_MOTHER_INTERNATIONAL_ADDRESS } from '../../../urls';

import { generateContent } from './content';

const enContent = {
  section: "Birth mother's details",
  title: "What is the birth mother's last known address?",
  internationalAddressUrl: BIRTH_MOTHER_INTERNATIONAL_ADDRESS,
};

const cyContent = {
  section: 'Manylion y fam fiolegol',
  title: 'Beth yw cyfeiriad olaf hysbys y fam fiolegol?',
  internationalAddressUrl: BIRTH_MOTHER_INTERNATIONAL_ADDRESS,
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('birth-mother > address > manual > content', () => {
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
          birthMotherAddress1: manualAddressErrors.address1,
          birthMotherAddressTown: manualAddressErrors.addressTown,
          birthMotherAddressPostcode: manualAddressErrors.addressPostcode,
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
          birthMotherAddress1: manualAddressErrors.address1,
          birthMotherAddressTown: manualAddressErrors.addressTown,
          birthMotherAddressPostcode: manualAddressErrors.addressPostcode,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain birthMotherAddress1 field', () => {
    const birthMotherAddress1Field = fields.birthMotherAddress1 as FormOptions;
    expect(birthMotherAddress1Field).toEqual(manualAddressFormFields.address1);
  });

  test('should contain birthMotherAddress2 field', () => {
    const birthMotherAddress2Field = fields.birthMotherAddress2 as FormOptions;
    expect(birthMotherAddress2Field).toEqual(manualAddressFormFields.address2);
  });

  test('should contain birthMotherAddressTown field', () => {
    const birthMotherAddressTownField = fields.birthMotherAddressTown as FormOptions;
    expect(birthMotherAddressTownField).toEqual(manualAddressFormFields.addressTown);
  });

  test('should contain birthMotherAddressCounty field', () => {
    const birthMotherAddressCountyField = fields.birthMotherAddressCounty as FormOptions;
    expect(birthMotherAddressCountyField).toEqual(manualAddressFormFields.addressCounty);
  });

  test('should contain birthMotherAddressPostcode field', () => {
    const birthMotherAddressPostcodeField = fields.birthMotherAddressPostcode as FormOptions;
    expect(birthMotherAddressPostcodeField).toEqual(manualAddressFormFields.addressPostcode);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
