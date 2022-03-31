import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateSelectAddressContent,
  form as selectAddressForm,
} from '../../../common/components/address-select';
import { APPLICANT_2_FIND_ADDRESS, APPLICANT_2_MANUAL_ADDRESS } from '../../../urls';

import { generateContent } from './content';

const enContent = {
  section: 'Second applicant',
  title: "What's your home address?",
  changePostCodeUrl: APPLICANT_2_FIND_ADDRESS,
  cantFindAddressUrl: APPLICANT_2_MANUAL_ADDRESS,
};

const cyContent = {
  section: 'Ail geisydd',
  title: 'Beth yw eich cyfeiriad cartref?',
  changePostCodeUrl: APPLICANT_2_FIND_ADDRESS,
  cantFindAddressUrl: APPLICANT_2_MANUAL_ADDRESS,
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant2 > address > select > content', () => {
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
          applicant2SelectAddress: selectAddressErrors.selectAddress,
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
          applicant2SelectAddress: selectAddressErrors.selectAddress,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain applicant2SelectAddress field', () => {
    const selectAddressFormFields = selectAddressForm.fields as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.applicant2SelectAddress).toEqual(selectAddressFormFields.selectAddress);
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
