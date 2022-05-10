import { Sibling } from '../../../app/case/definition';

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
        siblingRelation: 'MOCK_RELATION',
        siblingPoType: 'MOCK_TYPE',
        siblingPoNumber: 'MOCK_NUMBER',
      },
      {
        siblingId: 'MOCK_ID2',
        siblingRelation: 'MOCK_RELATION2',
        siblingPoType: 'MOCK_TYPE2',
      },
      {
        siblingId: 'MOCK_ID3',
        siblingRelation: 'MOCK_RELATION3',
        siblingPoType: 'MOCK_TYPE3',
        siblingPoNumber: 'MOCK_NUMBER3',
      },
    ];
    const result = placementOrderListItems(siblings, content);
    expect(result).toEqual([
      {
        key: { text: 'MOCK_RELATION', classes: 'font-normal' },
        value: { classes: 'summary-list-value-left-align', html: 'MOCK_TYPE' },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/sibling/remove-placement-order?remove=MOCK_ID',
              text: 'Remove',
              visuallyHiddenText: 'MOCK_RELATION MOCK_TYPE',
            },
            {
              href: '/sibling/placement-order-check-your-answers?change=MOCK_ID',
              text: 'Change',
              visuallyHiddenText: 'MOCK_RELATION MOCK_TYPE',
            },
          ],
        },
      },
      {
        key: { text: 'MOCK_RELATION2', classes: 'font-normal' },
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
              visuallyHiddenText: 'MOCK_RELATION2 MOCK_TYPE2',
            },
            {
              href: '/sibling/placement-order-check-your-answers?change=MOCK_ID2',
              text: 'Change',
              visuallyHiddenText: 'MOCK_RELATION2 MOCK_TYPE2',
            },
          ],
        },
      },
      {
        key: { text: 'MOCK_RELATION3', classes: 'font-normal' },
        value: { classes: 'summary-list-value-left-align', html: 'MOCK_TYPE3' },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/sibling/remove-placement-order?remove=MOCK_ID3',
              text: 'Remove',
              visuallyHiddenText: 'MOCK_RELATION3 MOCK_TYPE3',
            },
            {
              href: '/sibling/placement-order-check-your-answers?change=MOCK_ID3',
              text: 'Change',
              visuallyHiddenText: 'MOCK_RELATION3 MOCK_TYPE3',
            },
          ],
        },
      },
    ]);
  });
});
