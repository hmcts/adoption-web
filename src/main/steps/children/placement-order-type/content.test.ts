import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  label: 'What type of order is it?',
  errors: {
    placementOrderType: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: "The child's details (in welsh)",
  label: 'What type of order is it? (in welsh)',
  errors: {
    placementOrderType: {
      required: 'Please answer the question (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > placement-order-court content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID', placementOrderType: 'MOCK_TYPE' }],
      selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
    },
  } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toBe(enContent.section);
    expect(generatedContent.label).toBe(enContent.label);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toBe(cyContent.section);
    expect(generatedContent.label).toBe(cyContent.label);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain placementOrderCourt field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const field = fields.placementOrderType as FormOptions;
    expect(field.type).toBe('text');
    expect(field.classes).toBe('govuk-label');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((field as FormInput).value).toBe('MOCK_TYPE');
    expect(field.labelSize).toBe('l');
    expect(field.attributes).toEqual({ spellcheck: false });

    expect(field.validator).toBe(isFieldFilledIn);
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
