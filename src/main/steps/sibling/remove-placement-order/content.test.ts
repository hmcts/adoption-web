import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { PlacementOrder } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Sibling details',
  errors: {
    confirm: {
      required: 'Please select an answer',
    },
  },
};

const cyContent = {
  section: 'Sibling details (in Welsh)',
  errors: {
    confirm: {
      required: 'Please select an answer (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > remove-placement-order > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      siblings: [
        {
          siblingId: 'MOCK_SIBLING_ID',
          siblingFirstName: 'MOCK_FIRST_NAME',
          siblingLastNames: 'MOCK_LAST_NAMES',
          siblingPlacementOrders: [
            {
              placementOrderId: 'MOCK_PO_ID',
              placementOrderType: 'MOCK_TYPE',
              placementOrderNumber: 'MOCK_NUMBER',
            },
          ],
        },
      ],
      selectedSiblingId: 'MOCK_SIBLING_ID',
      selectedSiblingPoId: 'MOCK_PO_ID',
    },
  } as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generatedContent);
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test.each([
    {
      firstName: undefined,
      lastName: undefined,
      placementOrderType: undefined,
      expected: { label: 'Are you sure you want to remove this  for  ?', placementOrderType: undefined },
    },
    {
      firstName: 'MOCK_FIRST_NAME',
      lastName: 'MOCK_LAST_NAME',
      placementOrderType: 'MOCK_TYPE',
      expected: {
        label: 'Are you sure you want to remove this MOCK_TYPE for MOCK_FIRST_NAME MOCK_LAST_NAME?',
        placementOrderType: 'MOCK_TYPE',
      },
    },
  ])('should create correct label when %o', ({ firstName, lastName, placementOrderType, expected }) => {
    commonContent.userCase!.siblings![0]!.siblingFirstName = firstName;
    commonContent.userCase!.siblings![0]!.siblingLastNames = lastName;
    (commonContent.userCase!.siblings![0]!.siblingPlacementOrders![0] as PlacementOrder).placementOrderType =
      placementOrderType;
    generatedContent = generateContent(commonContent);
    expect(generatedContent.label).toBe(expected.label);
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });

  test('should contain saveAsDraft button', () => {
    expect(((generatedContent.form as FormContent).saveAsDraft?.text as Function)(commonContent)).toBe(
      commonContent.saveAsDraft
    );
  });
});
/* eslint-enable @typescript-eslint/ban-types */
