/* eslint-disable jest/expect-expect */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateSelectAddressContent,
  form as selectAddressForm,
} from '../../../common/components/address-select';
import { BIRTH_FATHER_ADDRESS_LOOKUP, BIRTH_FATHER_MANUAL_ADDRESS } from '../../../urls';

import { generateContent } from './content';

const enContent = {
  section: "Birth father's details",
  title: "What is the birth father's last known address?",
  changePostCodeUrl: BIRTH_FATHER_ADDRESS_LOOKUP,
  cantFindAddressUrl: BIRTH_FATHER_MANUAL_ADDRESS,
};

const cyContent = {
  section: 'Manylion y tad biolegol',
  title: 'Beth yw cyfeiriad olaf hysbys y tad biolegol?',
  changePostCodeUrl: BIRTH_FATHER_ADDRESS_LOOKUP,
  cantFindAddressUrl: BIRTH_FATHER_MANUAL_ADDRESS,
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('birthFather > address > select > content', () => {
  const commonContent = { language: 'en', userCase: {}, addresses: [] as any[] } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    const selectAddressContent = generateSelectAddressContent(commonContent);
    const selectAddressErrors = selectAddressContent.errors as Record<string, unknown>;
    languageAssertions(
      'en',
      {
        ...enContent,
        errors: {
          birthFatherSelectAddress: selectAddressErrors.selectAddress,
        },
      },
      () => generateContent(commonContent)
    );
  });

  test('should return correct Welsh content', () => {
    const selectAddressContent = generateSelectAddressContent({ ...commonContent, language: 'cy' });
    const selectAddressErrors = selectAddressContent.errors as Record<string, unknown>;
    languageAssertions(
      'cy',
      {
        ...cyContent,
        errors: {
          birthFatherSelectAddress: selectAddressErrors.selectAddress,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain birthFatherSelectAddress field', () => {
    const selectAddressFormFields = selectAddressForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.birthFatherSelectAddress).toEqual(selectAddressFormFields.selectAddress);
  });

  test('should contain submit button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
