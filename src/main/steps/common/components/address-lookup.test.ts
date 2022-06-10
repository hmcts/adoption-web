import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isInvalidPostcode } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './address-lookup';

jest.mock('../../../app/form/validation');

const enContent = {
  postcode: 'Postcode',
  findAddress: 'Find address',
  enterAddressManually: 'Or enter address manually',
  errors: {
    addressPostcode: {
      required: 'Enter a valid postcode',
      invalid: 'Enter a valid postcode',
    },
  },
  manualAddressUrl: '#',
};

const cyContent = {
  postcode: 'Cod post',
  findAddress: 'Dod o hyd i gyfeiriad',
  enterAddressManually: 'Neu nodwch y cyfeiriad â llaw',
  errors: {
    addressPostcode: {
      required: 'Enter a valid postcode (in welsh)',
      invalid: 'Enter a valid postcode (in welsh)',
    },
  },
  manualAddressUrl: '#',
};

/* eslint-disable @typescript-eslint/ban-types */
describe('common > components > address-lookup > content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain addressPostcode field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const addressPostcodeField = fields.addressPostcode as FormOptions;

    expect(addressPostcodeField.type).toBe('text');
    expect(addressPostcodeField.classes).toBe('govuk-label govuk-input--width-10');
    expect((addressPostcodeField.label as Function)(generatedContent)).toBe('Postcode');
    expect(addressPostcodeField.labelSize).toBe('m');
    expect(addressPostcodeField.attributes!.maxLength).toBe(14);
    expect(addressPostcodeField.validator).toBe(isInvalidPostcode);
  });

  test('should contain find address button', () => {
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatedContent)).toBe('Find address');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent1 = generateContent(commonContent);
    const form = generatedContent1.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
