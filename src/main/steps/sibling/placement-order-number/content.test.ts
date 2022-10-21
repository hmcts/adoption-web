import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  title: 'What is the serial or case number on the order?',
  errors: {
    siblingPoNumber: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: 'Manylion y brawd/chwaer',
  title: 'Beth yw’r rhif cyfresol neu rif yr achos ar y gorchymyn?',
  errors: {
    siblingPoNumber: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
};
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > placement-order-number > content', () => {
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

  test('should contain siblingPoNumber field', () => {
    const generatedContent = generateContent({
      ...commonContent,
      userCase: {
        siblings: [{ siblingId: 'MOCK_ID', siblingPoNumber: 'MOCK_PLACEMENT_ORDER_NUMBER' }],
        selectedSiblingId: 'MOCK_ID',
      },
    });
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const siblingPoNumberField = fields.siblingPoNumber as FormOptions;
    expect(siblingPoNumberField.type).toBe('text');
    expect(siblingPoNumberField.classes).toBe('govuk-label govuk-input--width-10');
    expect((siblingPoNumberField.label as Function)(generatedContent)).toBe(enContent.title);
    expect(siblingPoNumberField.labelSize).toBe('l');
    expect(siblingPoNumberField.attributes).toEqual({ spellcheck: false });
    expect((siblingPoNumberField as FormInput).value).toBe('MOCK_PLACEMENT_ORDER_NUMBER');

    expect(siblingPoNumberField.validator).toBe(isFieldFilledIn);
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
