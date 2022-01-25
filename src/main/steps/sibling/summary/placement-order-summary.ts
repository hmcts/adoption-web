import { PlacementOrder } from '../../../app/case/definition';
import { SIBLING_ORDER_SUMMARY } from '../../urls';

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
        html: isPlacementOrderComplete(item) ? '' : '<strong class="govuk-tag govuk-tag--yellow">Incomplete</strong>',
      },
      actions: {
        items: [
          {
            href: '#',
            text: content.change,
            visuallyHiddenText: 'change',
          },
          {
            href: `${SIBLING_ORDER_SUMMARY}?remove=${item.placementOrderId}`,
            text: content.remove,
            visuallyHiddenText: 'remove',
          },
        ],
      },
    };
  });
};
