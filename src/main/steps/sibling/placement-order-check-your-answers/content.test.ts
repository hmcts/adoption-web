import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { SiblingRelationships } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Sibling details',
  for: 'for',
  orderType: 'Type of order',
  orderNumber: 'Order case or serial number',
  change: 'Change',
  continue: 'Continue',
};

const cyContent = {
  section: 'Manylion y brawd/chwaer',
  for: 'ar gyfer',
  orderType: 'Math o neuchymyn',
  orderNumber: 'Rhif cyfresol neu rif yr achos ar y gorchymyn',
  change: 'Newid',
  continue: 'Parhau',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > placement-order-check-your-answers > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      siblings: [
        {
          siblingId: 'MOCK_SIBLING_ID',
          siblingRelation: SiblingRelationships.SISTER,
          siblingPoType: 'MOCK_PLACEMENT_ORDER_TYPE',
          siblingPoNumber: 'MOCK_PLACEMENT_ORDER_NUMBER',
        },
      ],
      selectedSiblingId: 'MOCK_SIBLING_ID',
    },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test.each([
    {
      siblingId: '',
      siblingRelation: undefined,
      siblingPoType: undefined,
      siblingPoNumber: undefined,
      expected: {
        title: ' for ',
        placementOrderListItems: [
          {
            key: { text: 'Relationship' },
            value: {},
            actions: {
              items: [
                {
                  href: '/sibling/relation?change=undefined&returnUrl=/sibling/placement-order-check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Relationship',
                },
              ],
            },
          },
          {
            key: { text: 'Type of order' },
            value: {},
            actions: {
              items: [
                {
                  href: '/sibling/placement-order-type?change=undefined&returnUrl=/sibling/placement-order-check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Type of order',
                },
              ],
            },
          },
          {
            key: { text: 'Order case or serial number' },
            value: {},
            actions: {
              items: [
                {
                  href: '/sibling/placement-order-number?change=undefined&returnUrl=/sibling/placement-order-check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Order case or serial number',
                },
              ],
            },
          },
        ],
      },
    },
    {
      siblingId: 'MOCK_SIBLING_ID',
      siblingRelation: SiblingRelationships.SISTER,
      siblingPoType: 'MOCK_TYPE',
      siblingPoNumber: 'MOCK_NUMBER',
      expected: {
        title: `MOCK_TYPE for ${SiblingRelationships.SISTER}`,
        placementOrderListItems: [
          {
            key: { text: 'Relationship' },
            value: { text: SiblingRelationships.SISTER },
            actions: {
              items: [
                {
                  href: '/sibling/relation?change=MOCK_SIBLING_ID&returnUrl=/sibling/placement-order-check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Relationship',
                },
              ],
            },
          },
          {
            key: { text: 'Type of order' },
            value: { text: 'MOCK_TYPE' },
            actions: {
              items: [
                {
                  href: '/sibling/placement-order-type?change=MOCK_SIBLING_ID&returnUrl=/sibling/placement-order-check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Type of order',
                },
              ],
            },
          },
          {
            key: { text: 'Order case or serial number' },
            value: { text: 'MOCK_NUMBER' },
            actions: {
              items: [
                {
                  href: '/sibling/placement-order-number?change=MOCK_SIBLING_ID&returnUrl=/sibling/placement-order-check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Order case or serial number',
                },
              ],
            },
          },
        ],
      },
    },
  ])(
    'should create correct items for summaryList %#',
    ({ siblingId, siblingRelation, siblingPoType, siblingPoNumber, expected }) => {
      commonContent.userCase!.siblings![0]!.siblingId = siblingId;
      commonContent.userCase!.siblings![0]!.siblingRelation = siblingRelation;
      commonContent.userCase!.siblings![0]!.siblingPoType = siblingPoType;
      commonContent.userCase!.siblings![0]!.siblingPoNumber = siblingPoNumber;
      const generatedContent = generateContent(commonContent);
      expect(generatedContent.placementOrderListItems).toEqual(expected.placementOrderListItems);
    }
  );

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(enContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
