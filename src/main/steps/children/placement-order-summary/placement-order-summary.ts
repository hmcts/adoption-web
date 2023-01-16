import { CaseWithId } from '../../../app/case/case';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';
import {
  LA_PORTAL_CHILD_PLACEMENT_ORDER_CHECK_YOUR_ANSWERS,
  LA_PORTAL_CHILD_PLACEMENT_ORDER_REMOVE_PLACEMENT_ORDER,
} from '../../urls';

const isPlacementOrderComplete = (placementOrder, ignorePlacementOrderType) => {
  return (
    (ignorePlacementOrderType || placementOrder.placementOrderType) &&
    placementOrder.placementOrderNumber &&
    (ignorePlacementOrderType || placementOrder.placementOrderCourt) &&
    areDateFieldsFilledIn(placementOrder.placementOrderDate) === undefined &&
    isDateInputInvalid(placementOrder.placementOrderDate) === undefined &&
    isFutureDate(placementOrder.placementOrderDate) === undefined
  );
};
//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const placementOrderListItems = (userCase: CaseWithId, content: any): any => {
  return userCase.placementOrders?.map((item, index) => {
    const text =
      (item.placementOrderType && content.placementOrderType[item.placementOrderType]) || content.placementOrder;
    return {
      key: {
        text,
        classes: 'font-normal',
      },
      value: {
        classes: 'summary-list-value',
        html: isPlacementOrderComplete(item, index === 0)
          ? ''
          : `<strong class="govuk-tag govuk-tag--yellow">${content.incomplete}</strong>`,
      },
      actions: {
        classes: 'summary-list-actions',
        items: [
          ...(index === 0
            ? []
            : [
                {
                  href: `${LA_PORTAL_CHILD_PLACEMENT_ORDER_REMOVE_PLACEMENT_ORDER}?remove=${item.placementOrderId}`,
                  text: content.remove,
                  visuallyHiddenText: text,
                },
              ]),
          {
            href: `${LA_PORTAL_CHILD_PLACEMENT_ORDER_CHECK_YOUR_ANSWERS}?change=${item.placementOrderId}`,
            text: content.change,
            visuallyHiddenText: text,
          },
        ],
      },
    };
  });
};
