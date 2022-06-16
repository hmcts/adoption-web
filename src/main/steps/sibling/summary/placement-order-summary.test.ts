import { Sibling, SiblingRelationships } from '../../../app/case/definition';

import { placementOrderListItems } from './placement-order-summary';

describe('placement-order-summary', () => {
  const content = {
    change: 'Change',
    remove: 'Remove',
    placementOrder: 'Placement Order',
    incomplete: 'incomplete',
  };

  test('should return correct summary list items', () => {
    const siblings: Sibling[] = [
      {
        siblingId: 'MOCK_ID',
        siblingRelation: SiblingRelationships.SISTER,
        siblingPoType: 'MOCK_TYPE',
        siblingPoNumber: 'MOCK_NUMBER',
      },
      {
        siblingId: 'MOCK_ID2',
        siblingRelation: SiblingRelationships.HALF_SISTER,
        siblingPoType: 'MOCK_TYPE2',
      },
      {
        siblingId: 'MOCK_ID3',
        siblingRelation: SiblingRelationships.STEP_SISTER,
        siblingPoType: 'MOCK_TYPE3',
        siblingPoNumber: 'MOCK_NUMBER3',
      },
    ];
    const result = placementOrderListItems(siblings, content);
    expect(result).toEqual([
      {
        key: { text: `${SiblingRelationships.SISTER}`, classes: 'font-normal' },
        value: { classes: 'summary-list-value-left-align', html: 'MOCK_TYPE' },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/sibling/remove-placement-order?remove=MOCK_ID',
              text: 'Remove',
              visuallyHiddenText: `${SiblingRelationships.SISTER} MOCK_TYPE`,
            },
            {
              href: '/sibling/placement-order-check-your-answers?change=MOCK_ID',
              text: 'Change',
              visuallyHiddenText: `${SiblingRelationships.SISTER} MOCK_TYPE`,
            },
          ],
        },
      },
      {
        key: { text: `${SiblingRelationships.HALF_SISTER}`, classes: 'font-normal' },
        value: {
          classes: 'summary-list-value-left-align',
          html: 'MOCK_TYPE2 <strong class="govuk-tag govuk-tag--yellow">incomplete</strong>',
        },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/sibling/remove-placement-order?remove=MOCK_ID2',
              text: 'Remove',
              visuallyHiddenText: `${SiblingRelationships.HALF_SISTER} MOCK_TYPE2`,
            },
            {
              href: '/sibling/placement-order-check-your-answers?change=MOCK_ID2',
              text: 'Change',
              visuallyHiddenText: `${SiblingRelationships.HALF_SISTER} MOCK_TYPE2`,
            },
          ],
        },
      },
      {
        key: { text: `${SiblingRelationships.STEP_SISTER}`, classes: 'font-normal' },
        value: { classes: 'summary-list-value-left-align', html: 'MOCK_TYPE3' },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/sibling/remove-placement-order?remove=MOCK_ID3',
              text: 'Remove',
              visuallyHiddenText: `${SiblingRelationships.STEP_SISTER} MOCK_TYPE3`,
            },
            {
              href: '/sibling/placement-order-check-your-answers?change=MOCK_ID3',
              text: 'Change',
              visuallyHiddenText: `${SiblingRelationships.STEP_SISTER} MOCK_TYPE3`,
            },
          ],
        },
      },
    ]);
  });
});
