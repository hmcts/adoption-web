import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isAddressSelected } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > select-address > content', () => {
  const commonContent = { language: 'en', userCase: {}, addresses: [] as any[] } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual('Primary applicant');
    expect(generatedContent.title).toEqual("What's your home address?");
    expect(generatedContent.line1).toEqual("We'll send all court papers to this address.");
    expect(generatedContent.postcode).toEqual('Postcode');
    expect(generatedContent.selectAddress).toEqual('Select an address');
    expect(generatedContent.cannotFindAddress).toEqual('I cannot find the address in the list');

    expect((generatedContent.errors as any).applicant1SelectAddress.notSelected).toEqual('Select an address');

    expect(generatedContent.items).toEqual([
      { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found', value: -1 },
    ]);

    expect(generatedContent.changePostCodeUrl).toEqual('/applicant1/address/lookup');
    expect(generatedContent.cantFindAddressUrl).toEqual('/applicant1/address/manual');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual('Primary applicant (in welsh)');
    expect(generatedContent.title).toEqual("What's your home address? (in welsh)");
    expect(generatedContent.line1).toEqual("We'll send all court papers to this address. (in welsh)");
    expect(generatedContent.postcode).toEqual('Postcode (in welsh)');
    expect(generatedContent.selectAddress).toEqual('Select an address (in welsh)');
    expect(generatedContent.cannotFindAddress).toEqual('I cannot find the address in the list (in welsh)');

    expect((generatedContent.errors as any).applicant1SelectAddress.notSelected).toEqual(
      'Select an address (in welsh)'
    );

    expect(generatedContent.items).toEqual([
      { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found (in welsh)', value: -1 },
    ]);

    expect(generatedContent.changePostCodeUrl).toEqual('/applicant1/address/lookup');
    expect(generatedContent.cantFindAddressUrl).toEqual('/applicant1/address/manual');
  });

  describe('when there is one address in session', () => {
    test('should create correct options for selectAddress field', () => {
      generatedContent = generateContent({ ...commonContent, addresses: [{ fullAddress: 'MOCK_FULL_ADDRESS_1' }] });
      expect(generatedContent.items).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '1 address found', value: -1 },
        { text: 'MOCK_FULL_ADDRESS_1', value: 0 },
      ]);
    });

    test('should create correct options for selectAddress field (welsh)', () => {
      generatedContent = generateContent({
        ...commonContent,
        language: 'cy',
        addresses: [{ fullAddress: 'MOCK_FULL_ADDRESS_1' }],
      });
      expect(generatedContent.items).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '1 address found (in welsh)', value: -1 },
        { text: 'MOCK_FULL_ADDRESS_1', value: 0 },
      ]);
    });
  });

  describe('when there addresses is undefined in session', () => {
    test('should create correct options for selectAddress field', () => {
      generatedContent = generateContent({ ...commonContent, addresses: undefined });
      expect(generatedContent.items).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found', value: -1 },
      ]);
    });

    test('should create correct options for selectAddress field (welsh)', () => {
      generatedContent = generateContent({ ...commonContent, language: 'cy', addresses: undefined });
      expect(generatedContent.items).toEqual([
        { attributes: { id: 'totalAddressesFound' }, selected: true, text: '0 addresses found (in welsh)', value: -1 },
      ]);
    });
  });

  test('should contain applicant1SelectAddress field', () => {
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1SelectAddressField = fields.applicant1SelectAddress as FormOptions;

    expect(applicant1SelectAddressField.type).toBe('select');
    expect((applicant1SelectAddressField.label as Function)(generatedContent)).toBe('Select an address');
    expect(applicant1SelectAddressField.labelSize).toBe('m');
    expect(applicant1SelectAddressField.validator).toBe(isAddressSelected);
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
