import { PlacementOrderTypeEnum } from '../../../app/case/definition';

import { placementOrderListItems } from './placement-order-summary';

describe('placement-order-summary', () => {
  let userCase;
  const content = {
    change: 'Change',
    remove: 'Remove',
    placementOrder: 'Placement order',
    incomplete: 'incomplete',
    placementOrderType: {
      [PlacementOrderTypeEnum.AdoptionOrder]: 'Gorchymyn Mabwysiadu',
      [PlacementOrderTypeEnum.CareOrder]: 'Gorchymyn Gofal',
      [PlacementOrderTypeEnum.CHILD_ARRANGEMENT_ORDER]: 'Gorchymyn trefniadau plant',
      [PlacementOrderTypeEnum.PlacementOrder]: 'Gorchymyn Lleoli',
      [PlacementOrderTypeEnum.SupervisionOrder]: 'Gorchymyn Goruchwylio',
      [PlacementOrderTypeEnum.Other]: 'Arall',
    },
  };

  test('should return correct summary list items', () => {
    userCase = {
      placementOrders: [
        {
          placementOrderId: 'MOCK_ID',
          placementOrderType: { placementOrderType: 'Adoption order' },
          placementOrderNumber: 'MOCK_NUMBER',
          placementOrderCourt: 'MOCK_COURT',
          placementOrderDate: { day: '12', month: '10', year: '2021' },
        },
        {
          placementOrderId: 'MOCK_ID2',
          placementOrderType: { placementOrderType: 'Adoption order' },
          placementOrderNumber: 'MOCK_NUMBER2',
          placementOrderCourt: 'MOCK_COURT2',
          placementOrderDate: { day: '2', month: '2', year: '' },
        },
        {
          placementOrderId: 'MOCK_ID3',
          placementOrderType: { placementOrderType: 'Adoption order' },
          placementOrderNumber: 'MOCK_NUMBER3',
          placementOrderCourt: 'MOCK_COURT3',
          placementOrderDate: { day: '3', month: '3', year: '2021' },
        },
      ],
    };
    const result = placementOrderListItems(userCase, content);
    expect(result).toEqual([
      {
        key: { text: 'MOCK_NUMBER Placement order', classes: 'font-normal' },
        value: { classes: 'summary-list-value', html: '' },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/la-portal/child/placement-order-check-your-answers?change=MOCK_ID',
              text: 'Change',
              visuallyHiddenText: 'MOCK_NUMBER Placement order',
            },
          ],
        },
      },
      {
        key: { text: 'MOCK_NUMBER2 Placement order', classes: 'font-normal' },
        value: {
          classes: 'summary-list-value',
          html: '<strong class="govuk-tag govuk-tag--yellow">incomplete</strong>',
        },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/la-portal/child/remove-placement-order?confirm=MOCK_ID2',
              text: 'Remove',
              visuallyHiddenText: 'MOCK_NUMBER2 Placement order',
            },
            {
              href: '/la-portal/child/placement-order-check-your-answers?change=MOCK_ID2',
              text: 'Change',
              visuallyHiddenText: 'MOCK_NUMBER2 Placement order',
            },
          ],
        },
      },
      {
        key: { text: 'MOCK_NUMBER3 Placement order', classes: 'font-normal' },
        value: { classes: 'summary-list-value', html: '' },
        actions: {
          classes: 'summary-list-actions',
          items: [
            {
              href: '/la-portal/child/remove-placement-order?confirm=MOCK_ID3',
              text: 'Remove',
              visuallyHiddenText: 'MOCK_NUMBER3 Placement order',
            },
            {
              href: '/la-portal/child/placement-order-check-your-answers?change=MOCK_ID3',
              text: 'Change',
              visuallyHiddenText: 'MOCK_NUMBER3 Placement order',
            },
          ],
        },
      },
    ]);
  });
});
