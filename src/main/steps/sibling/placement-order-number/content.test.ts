import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > placement-order-number content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID', placementOrderNumber: '1234' }],
      selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
    },
  } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toEqual('Sibling details');
    expect(generatedContent.label).toEqual('What is the serial or case number on the order?');
    expect(generatedContent.hint).toEqual(
      'Ask your social worker or adoption agency if you are not sure where to find this.'
    );
    expect((generatedContent.errors as any).placementOrderNumber.required).toBe('Enter the serial or case number');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual('Sibling details (in Welsh)');
    expect(generatedContent.label).toEqual('What is the serial or case number on the order? (in welsh)');
    expect(generatedContent.hint).toEqual(
      'Ask your social worker or adoption agency if you are not sure where to find this. (in welsh)'
    );
    expect((generatedContent.errors as any).placementOrderNumber.required).toBe(
      'Enter the serial or case number (in welsh)'
    );
  });

  test('should contain placementOrderNumber field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const placementOrderNumberField = fields.placementOrderNumber as FormOptions;
    expect(placementOrderNumberField.type).toBe('text');
    expect(placementOrderNumberField.classes).toBe('govuk-label govuk-input--width-10');
    expect((placementOrderNumberField.label as Function)(generatedContent)).toBe(
      'What is the serial or case number on the order?'
    );
    expect(((placementOrderNumberField as FormInput).hint as Function)(generatedContent)).toBe(
      'Ask your social worker or adoption agency if you are not sure where to find this.'
    );
    expect(placementOrderNumberField.labelSize).toBe('l');
    expect(placementOrderNumberField.attributes).toEqual({ spellcheck: false });

    expect(placementOrderNumberField.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent({ ...commonContent, userCase: undefined });
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
