import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  label: 'Which court made the placement order?',
  options: [{ text: 'MOCK', value: 'MOCK', selected: true }],
  errors: {
    placementOrderCourt: {
      required: 'Enter the name of the court',
    },
  },
};

const cyContent = {
  section: 'Manylion y plentyn',
  label: 'Pa lys wnaeth wneud y gorchymyn lleoli?',
  options: [{ text: 'MOCK', value: 'MOCK', selected: true }],
  errors: {
    placementOrderCourt: {
      required: 'Nac ydwdwch enw’r llys',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > placement-order-court > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      placementOrders: [{ placementOrderId: 'MOCK_PLACEMENT_ORDER_ID', placementOrderCourt: 'MOCK' }],
      selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
    },
    courtList: [{ site_name: 'MOCK', is_case_management_location: '', epimms_id: '', venue_name: 'MOCK' }],
  } as CommonContent;
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain placementOrderCourt field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const placementOrderCourtField = fields.placementOrderCourt as FormOptions;
    expect(placementOrderCourtField.type).toBe('select');
    expect((fields.h1.label as Function)(generatedContent)).toBe(enContent.label);

    expect(placementOrderCourtField.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent({ ...commonContent, userCase: { placementOrders: [] } });
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
