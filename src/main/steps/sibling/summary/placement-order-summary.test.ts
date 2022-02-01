import { placementOrderListItems } from './placement-order-summary';

describe('placement-order-summary', () => {
  // let userCase;
  const content = {
    change: 'Change',
    remove: 'Remove',
    placementOrder: 'Placement Order',
  };

  test('should return correct summary list items', () => {
    const placementOrders = [
      {
        placementOrderId: 'MOCK_ID',
        placementOrderType: 'MOCK_TYPE',
        placementOrderNumber: 'MOCK_NUMBER',
      },
      {
        placementOrderId: 'MOCK_ID2',
        placementOrderType: 'MOCK_TYPE2',
      },
      {
        placementOrderId: 'MOCK_ID3',
        placementOrderType: 'MOCK_TYPE3',
        placementOrderNumber: 'MOCK_NUMBER3',
      },
    ];
    const result = placementOrderListItems(placementOrders, content);
    expect(result).toEqual([
      {
        key: { text: 'MOCK_TYPE', classes: 'font-normal' },
        value: { html: '' },
        actions: {
          items: [
            {
              href: '#',
              text: 'Change',
              visuallyHiddenText: 'change',
            },
            { href: '#', text: 'Remove', visuallyHiddenText: 'remove' },
          ],
        },
      },
      {
        key: { text: 'MOCK_TYPE2', classes: 'font-normal' },
        value: { html: '<strong class="govuk-tag govuk-tag--yellow">Incomplete</strong>' },
        actions: {
          items: [
            {
              href: '#',
              text: 'Change',
              visuallyHiddenText: 'change',
            },
            { href: '#', text: 'Remove', visuallyHiddenText: 'remove' },
          ],
        },
      },
      {
        key: { text: 'MOCK_TYPE3', classes: 'font-normal' },
        value: { html: '' },
        actions: {
          items: [
            {
              href: '#',
              text: 'Change',
              visuallyHiddenText: 'change',
            },
            { href: '#', text: 'Remove', visuallyHiddenText: 'remove' },
          ],
        },
      },
    ]);
  });
});
