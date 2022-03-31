import { placementOrderListItems } from './placement-order-summary';

describe('placement-order-summary', () => {
  let userCase;
  const content = {
    change: 'Change',
    remove: 'Remove',
    placementOrder: 'Placement Order',
    incomplete: 'incomplete',
  };

  test('should return correct summary list items', () => {
    userCase = {
      placementOrders: [
        {
          placementOrderId: 'MOCK_ID',
          placementOrderNumber: 'MOCK_NUMBER',
          placementOrderCourt: 'MOCK_COURT',
          placementOrderDate: { day: '12', month: '10', year: '2021' },
        },
        {
          placementOrderId: 'MOCK_ID2',
          placementOrderType: 'MOCK_TYPE2',
          placementOrderNumber: 'MOCK_NUMBER2',
          placementOrderCourt: 'MOCK_COURT2',
          placementOrderDate: { day: '2', month: '2', year: '' },
        },
        {
          placementOrderId: 'MOCK_ID3',
          placementOrderType: 'MOCK_TYPE3',
          placementOrderNumber: 'MOCK_NUMBER3',
          placementOrderCourt: 'MOCK_COURT3',
          placementOrderDate: { day: '3', month: '3', year: '2021' },
        },
      ],
    };
    const result = placementOrderListItems(userCase, content);
    expect(result).toEqual([
      {
        key: { text: 'Placement Order', classes: 'font-normal' },
        value: { classes: 'summary-list-value', html: '' },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/children/placement-order-check-your-answers?change=MOCK_ID',
              text: 'Change',
              visuallyHiddenText: 'change',
            },
          ],
        },
      },
      {
        key: { text: 'MOCK_TYPE2', classes: 'font-normal' },
        value: {
          classes: 'summary-list-value',
          html: '<strong class="govuk-tag govuk-tag--yellow">incomplete</strong>',
        },
        actions: {
          classes: 'summary-list-actions',
          items: [
            { href: '/children/placement-order-summary?remove=MOCK_ID2', text: 'Remove', visuallyHiddenText: 'remove' },
            {
              href: '/children/placement-order-check-your-answers?change=MOCK_ID2',
              text: 'Change',
              visuallyHiddenText: 'change',
            },
          ],
        },
      },
      {
        key: { text: 'MOCK_TYPE3', classes: 'font-normal' },
        value: { classes: 'summary-list-value', html: '' },
        actions: {
          classes: 'summary-list-actions',
          items: [
            { href: '/children/placement-order-summary?remove=MOCK_ID3', text: 'Remove', visuallyHiddenText: 'remove' },
            {
              href: '/children/placement-order-check-your-answers?change=MOCK_ID3',
              text: 'Change',
              visuallyHiddenText: 'change',
            },
          ],
        },
      },
    ]);
  });
});
