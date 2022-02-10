import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  label: 'What type of order is it?',
  errors: {
    placementOrderType: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: 'Sibling details (in Welsh)',
  label: 'What type of order is it? (in Welsh)',
  errors: {
    placementOrderType: {
      required: 'Please answer the question (in Welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > placement-order-type > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      siblings: [
        {
          siblingId: 'MOCK_SIBLING_ID',
          siblingPlacementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID', placementOrderType: 'MOCK_TYPE' }],
        },
      ],
      selectedSiblingId: 'MOCK_SIBLING_ID',
      selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
    },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, generateContent);
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, generateContent);
  });

  test('should contain placementOrderType field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const field = fields.placementOrderType as FormOptions;
    expect(field.type).toBe('text');
    expect(field.classes).toBe('govuk-label');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
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
