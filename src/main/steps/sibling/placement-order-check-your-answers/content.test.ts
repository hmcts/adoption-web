import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { SiblingPOType, SiblingRelationships } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Sibling details',
  for: 'for',
  orderType: 'Type of order',
  orderNumber: 'Order case or serial number',
  siblingRelation: {
    [SiblingRelationships.SISTER]: 'Sister',
    [SiblingRelationships.STEP_SISTER]: 'Step-sister',
    [SiblingRelationships.HALF_SISTER]: 'Half-sister',
    [SiblingRelationships.BROTHER]: 'Brother',
    [SiblingRelationships.STEP_BROTHER]: 'Step-brother',
    [SiblingRelationships.HALF_BROTHER]: 'Half-brother',
  },
  siblingPOType: {
    [SiblingPOType.ADOPTION_ORDER]: 'Adoption order',
    [SiblingPOType.CARE_ORDER]: 'Care order',
    [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Child arrangements order',
    [SiblingPOType.PLACEMENT_ORDER]: 'Placement order',
    [SiblingPOType.SUPERVIS_ORDER]: 'Supervision order',
    [SiblingPOType.OTHER]: 'Other',
  },
  change: 'Change',
  continue: 'Continue',
};

const cyContent = {
  section: 'Manylion y brawd/chwaer',
  for: 'ar gyfer',
  orderType: 'Math o neuchymyn',
  orderNumber: 'Rhif cyfresol neu rif yr achos ar y gorchymyn',
  siblingRelation: {
    [SiblingRelationships.SISTER]: 'Chwaer',
    [SiblingRelationships.STEP_SISTER]: 'Llyschwaer',
    [SiblingRelationships.HALF_SISTER]: 'Hanner chwaer',
    [SiblingRelationships.BROTHER]: 'Brawd',
    [SiblingRelationships.STEP_BROTHER]: 'Llysfrawd',
    [SiblingRelationships.HALF_BROTHER]: 'Hanner brawd',
  },
  siblingPOType: {
    [SiblingPOType.ADOPTION_ORDER]: 'Gorchymyn Mabwysiadu',
    [SiblingPOType.CARE_ORDER]: 'Gorchymyn Gofal',
    [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Gorchymyn trefniadau plant',
    [SiblingPOType.PLACEMENT_ORDER]: 'Gorchymyn Lleoli',
    [SiblingPOType.SUPERVIS_ORDER]: 'Gorchymyn Goruchwylio',
    [SiblingPOType.OTHER]: 'Arall',
  },
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
          siblingPoType: SiblingPOType.ADOPTION_ORDER,
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
            value: { text: '' },
            actions: {
              items: [
                {
                  href: '/la-portal/sibling/relation?change=undefined&returnUrl=/la-portal/sibling/placement-order-check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Relationship ',
                },
              ],
            },
          },
          {
            key: { text: 'Type of order' },
            value: { text: '' },
            actions: {
              items: [
                {
                  href: '/la-portal/sibling/placement-order-type?change=undefined&returnUrl=/la-portal/sibling/placement-order-check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Type of order ',
                },
              ],
            },
          },
          {
            key: { text: 'Order case or serial number' },
            value: { text: undefined },
            actions: {
              items: [
                {
                  href: '/la-portal/sibling/placement-order-number?change=undefined&returnUrl=/la-portal/sibling/placement-order-check-your-answers',
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
      siblingPoType: SiblingPOType.ADOPTION_ORDER,
      siblingPoNumber: 'MOCK_NUMBER',
      expected: {
        title: 'Adoption order for sister',
        placementOrderListItems: [
          {
            key: { text: 'Relationship' },
            value: { text: 'Sister' },
            actions: {
              items: [
                {
                  href: '/la-portal/sibling/relation?change=MOCK_SIBLING_ID&returnUrl=/la-portal/sibling/placement-order-check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Relationship Sister',
                },
              ],
            },
          },
          {
            key: { text: 'Type of order' },
            value: { text: 'Adoption order' },
            actions: {
              items: [
                {
                  href: '/la-portal/sibling/placement-order-type?change=MOCK_SIBLING_ID&returnUrl=/la-portal/sibling/placement-order-check-your-answers',
                  text: 'Change',
                  visuallyHiddenText: 'Type of order Adoption order',
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
                  href: '/la-portal/sibling/placement-order-number?change=MOCK_SIBLING_ID&returnUrl=/la-portal/sibling/placement-order-check-your-answers',
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
