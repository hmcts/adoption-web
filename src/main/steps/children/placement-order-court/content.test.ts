import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('placement-order-number content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID', placementOrderCourt: 'MOCK_COURT' }],
      selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
    },
  } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toBe("The child's details");
    expect(generatedContent.label).toBe('Which court made the placement order?');
    expect((generatedContent.errors as any).placementOrderCourt.required).toBe('Enter the name of the court');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toBe("The child's details (in welsh)");
    expect(generatedContent.label).toBe('Which court made the placement order? (in welsh)');
    expect((generatedContent.errors as any).placementOrderCourt.required).toBe(
      'Enter the name of the court (in welsh)'
    );
  });

  test('should contain placementOrderCourt field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const placementOrderCourtField = fields.placementOrderCourt as FormOptions;
    expect(placementOrderCourtField.type).toBe('text');
    expect(placementOrderCourtField.classes).toBe('govuk-label');
    expect((placementOrderCourtField.label as Function)(generatedContent)).toBe(
      'Which court made the placement order?'
    );
    expect((placementOrderCourtField as FormInput).value).toBe('MOCK_COURT');
    expect(placementOrderCourtField.labelSize).toBe('l');
    expect(placementOrderCourtField.attributes).toEqual({ spellcheck: false });

    expect(placementOrderCourtField.validator).toBe(isFieldFilledIn);
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
