import { Sibling, SiblingPOType, SiblingRelationships } from '../../../app/case/definition';

import { placementOrderListItems } from './placement-order-summary';

describe('placement-order-summary', () => {
  const content = {
    change: 'Change',
    remove: 'Remove',
    siblingRelation: {
      [SiblingRelationships.SISTER]: 'Sister',
      [SiblingRelationships.STEP_SISTER]: 'Step-sister',
      [SiblingRelationships.HALF_SISTER]: 'Half-sister',
      [SiblingRelationships.BROTHER]: 'Brother',
      [SiblingRelationships.STEP_BROTHER]: 'Step-brother',
      [SiblingRelationships.HALF_BROTHER]: 'Half-brother',
    },
    placementOrder: 'Placement order',
    siblingPOType: {
      [SiblingPOType.ADOPTION_ORDER]: 'Adoption order',
      [SiblingPOType.CARE_ORDER]: 'Care order',
      [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Child arrangements order',
      [SiblingPOType.PLACEMENT_ORDER]: 'Placement order',
      [SiblingPOType.SUPERVIS_ORDER]: 'Supervision order',
      [SiblingPOType.OTHER]: 'Other',
    },
    incomplete: 'incomplete',
  };

  test('should return correct summary list items', () => {
    const siblings: Sibling[] = [
      {
        siblingId: 'MOCK_ID',
        siblingRelation: SiblingRelationships.SISTER,
        siblingPoType: SiblingPOType.ADOPTION_ORDER,
        siblingPoNumber: 'MOCK_NUMBER',
      },
      {
        siblingId: 'MOCK_ID2',
        siblingRelation: SiblingRelationships.HALF_SISTER,
        siblingPoType: SiblingPOType.CARE_ORDER,
      },
      {
        siblingId: 'MOCK_ID3',
        siblingRelation: SiblingRelationships.STEP_SISTER,
        siblingPoType: SiblingPOType.CHILD_ARRANGEMENT_ORDER,
        siblingPoNumber: 'MOCK_NUMBER3',
      },
    ];
    const result = placementOrderListItems(siblings, content);
    expect(result).toEqual([
      {
        key: {
          text: `${
            siblings[0].siblingPoNumber +
            ' ' +
            (siblings[0].siblingRelation && content.siblingRelation[siblings[0].siblingRelation])
          }`,
          classes: 'font-normal',
        },
        value: {
          classes: 'summary-list-value-left-align',
          html: siblings[0].siblingPoType && content.siblingPOType[siblings[0].siblingPoType],
        },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/la-portal/sibling/remove-placement-order?remove=MOCK_ID',
              text: 'Remove',
              visuallyHiddenText: `${
                siblings[0].siblingRelation && content.siblingRelation[siblings[0].siblingRelation]
              } ${siblings[0].siblingPoType && content.siblingPOType[siblings[0].siblingPoType]}`,
            },
            {
              href: '/la-portal/sibling/placement-order-check-your-answers?change=MOCK_ID',
              text: 'Change',
              visuallyHiddenText: `${
                siblings[0].siblingRelation && content.siblingRelation[siblings[0].siblingRelation]
              } ${siblings[0].siblingPoType && content.siblingPOType[siblings[0].siblingPoType]}`,
            },
          ],
        },
      },
      {
        key: {
          text: `${siblings[1].siblingRelation && content.siblingRelation[siblings[1].siblingRelation]}`,
          classes: 'font-normal',
        },
        value: {
          classes: 'summary-list-value-left-align',
          html: `${
            siblings[1].siblingPoType && content.siblingPOType[siblings[1].siblingPoType]
          } <strong class="govuk-tag govuk-tag--yellow">incomplete</strong>`,
        },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/la-portal/sibling/remove-placement-order?remove=MOCK_ID2',
              text: 'Remove',
              visuallyHiddenText: `${
                siblings[1].siblingRelation && content.siblingRelation[siblings[1].siblingRelation]
              } ${siblings[1].siblingPoType && content.siblingPOType[siblings[1].siblingPoType]}`,
            },
            {
              href: '/la-portal/sibling/placement-order-check-your-answers?change=MOCK_ID2',
              text: 'Change',
              visuallyHiddenText: `${
                siblings[1].siblingRelation && content.siblingRelation[siblings[1].siblingRelation]
              } ${siblings[1].siblingPoType && content.siblingPOType[siblings[1].siblingPoType]}`,
            },
          ],
        },
      },
      {
        key: {
          text: `${
            siblings[2].siblingPoNumber +
            ' ' +
            (siblings[2].siblingRelation && content.siblingRelation[siblings[2].siblingRelation])
          }`,
          classes: 'font-normal',
        },
        value: {
          classes: 'summary-list-value-left-align',
          html: siblings[2].siblingPoType && content.siblingPOType[siblings[2].siblingPoType],
        },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/la-portal/sibling/remove-placement-order?remove=MOCK_ID3',
              text: 'Remove',
              visuallyHiddenText: `${
                siblings[2].siblingRelation && content.siblingRelation[siblings[2].siblingRelation]
              } ${siblings[2].siblingPoType && content.siblingPOType[siblings[2].siblingPoType]}`,
            },
            {
              href: '/la-portal/sibling/placement-order-check-your-answers?change=MOCK_ID3',
              text: 'Change',
              visuallyHiddenText: `${
                siblings[2].siblingRelation && content.siblingRelation[siblings[2].siblingRelation]
              } ${siblings[2].siblingPoType && content.siblingPOType[siblings[2].siblingPoType]}`,
            },
          ],
        },
      },
    ]);
  });
});
