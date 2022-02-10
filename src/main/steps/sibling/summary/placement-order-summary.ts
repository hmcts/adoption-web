import { PlacementOrder } from '../../../app/case/definition';

const isPlacementOrderComplete = placementOrder => {
  return placementOrder.placementOrderType && placementOrder.placementOrderNumber;
};

//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const placementOrderListItems = (placementOrders: PlacementOrder[], content: any): any => {
  return placementOrders?.map(item => {
    return {
      key: {
        text: item.placementOrderType,
        classes: 'font-normal',
      },
      value: {
        classes: 'summary-list-value',
        html: isPlacementOrderComplete(item) ? '' : '<strong class="govuk-tag govuk-tag--yellow">Incomplete</strong>',
      },
      actions: {
        classes: 'summary-list-actions',
        items: [
          {
            href: '#',
            text: content.remove,
            visuallyHiddenText: 'remove',
          },
          {
            href: '#',
            text: content.change,
            visuallyHiddenText: 'change',
          },
        ],
      },
    };
  });
};
