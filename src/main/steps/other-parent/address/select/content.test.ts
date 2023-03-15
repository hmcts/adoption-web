import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateSelectAddressContent,
  form as selectAddressForm,
} from '../../../common/components/address-select';
import { OTHER_PARENT_MANUAL_ADDRESS, OTHER_PARENT_POSTCODE_LOOKUP } from '../../../urls';

import { generateContent } from './content';

const enContent = {
  section: "Other person's details",
  title: "What's their address?",
  changePostCodeUrl: OTHER_PARENT_POSTCODE_LOOKUP,
  cantFindAddressUrl: OTHER_PARENT_MANUAL_ADDRESS,
};

const cyContent = {
  section: 'Manylion person arall',
  title: 'Beth yw eu cyfeiriad?',
  changePostCodeUrl: OTHER_PARENT_POSTCODE_LOOKUP,
  cantFindAddressUrl: OTHER_PARENT_MANUAL_ADDRESS,
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('other-parent > address > select > content', () => {
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
          otherParentSelectAddress: selectAddressErrors.selectAddress,
        },
      },
      () => generateContent(commonContent)
    );
  });

  test('should return correct welsh content', () => {
    const selectAddressContent = generateSelectAddressContent({ ...commonContent, language: 'cy' });
    const selectAddressErrors = selectAddressContent.errors as Record<string, unknown>;
    languageAssertions(
      'cy',
      {
        ...cyContent,
        errors: {
          otherParentSelectAddress: selectAddressErrors.selectAddress,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain otherParentSelectAddress field', () => {
    const selectAddressFormFields = selectAddressForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.otherParentSelectAddress).toEqual(selectAddressFormFields.selectAddress);
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
