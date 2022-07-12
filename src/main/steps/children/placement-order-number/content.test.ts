import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  label: 'What is the serial or case number on the placement order?',
  errors: {
    placementOrderNumber: {
      required: 'Enter the serial or case number',
    },
  },
};

const cyContent = {
  section: 'Manylion y plentyn',
  label: 'What is the serial or case number on the placement order?',
  errors: {
    placementOrderNumber: {
      required: 'Nac ydwdwch y rhif cyfresol neu rif yr achos',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > placement-order-number > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID', placementOrderNumber: '1234' }],
      selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
    },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain placementOrderNumber field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const placementOrderNumberField = fields.placementOrderNumber as FormOptions;
    expect(placementOrderNumberField.type).toBe('text');
    expect(placementOrderNumberField.classes).toBe('govuk-label govuk-input--width-10');
    expect((placementOrderNumberField.label as Function)(generatedContent)).toBe(
      'What is the serial or case number on the placement order?'
    );

    expect((placementOrderNumberField as FormInput).value).toBe('1234');
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
