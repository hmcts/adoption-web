import { PlacementOrder } from '../../../app/case/definition';
import { SIBLING_ORDER_CHECK_YOUR_ANSWERS, SIBLING_REMOVE_PLACEMENT_ORDER } from '../../../steps/urls';

const isPlacementOrderComplete = placementOrder => {
  return placementOrder.placementOrderType && placementOrder.placementOrderNumber;
};

//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const placementOrderListItems = (siblingId: string, placementOrders: PlacementOrder[], content: any): any => {
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
            href: `${SIBLING_REMOVE_PLACEMENT_ORDER}?remove=${siblingId}/${item.placementOrderId}`,
            text: content.remove,
            visuallyHiddenText: 'remove',
          },
          {
            href: `${SIBLING_ORDER_CHECK_YOUR_ANSWERS}?change=${siblingId}/${item.placementOrderId}`,
            text: content.change,
            visuallyHiddenText: 'change',
          },
        ],
      },
    };
  });
};
