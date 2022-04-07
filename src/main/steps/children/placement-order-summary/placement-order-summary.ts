import { CaseWithId } from '../../../app/case/case';
import { areDateFieldsFilledIn, isDateInputInvalid, isFutureDate } from '../../../app/form/validation';
import { CHILDREN_PLACEMENT_ORDER_CHECK_YOUR_ANSWERS, CHILDREN_PLACEMENT_ORDER_SUMMARY } from '../../urls';

const isPlacementOrderComplete = (placementOrder, ignorePlacementOrderType) => {
  return (
    (ignorePlacementOrderType || placementOrder.placementOrderType) &&
    placementOrder.placementOrderNumber &&
    placementOrder.placementOrderCourt &&
    areDateFieldsFilledIn(placementOrder.placementOrderDate) === undefined &&
    isDateInputInvalid(placementOrder.placementOrderDate) === undefined &&
    isFutureDate(placementOrder.placementOrderDate) === undefined
  );
};
//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const placementOrderListItems = (userCase: CaseWithId, content: any): any => {
  return userCase.placementOrders?.map((item, index) => {
    const text = item.placementOrderType || content.placementOrder;
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
                  href: `${CHILDREN_PLACEMENT_ORDER_SUMMARY}?remove=${item.placementOrderId}`,
                  text: content.remove,
                  visuallyHiddenText: text,
                },
              ]),
          {
            href: `${CHILDREN_PLACEMENT_ORDER_CHECK_YOUR_ANSWERS}?change=${item.placementOrderId}`,
            text: content.change,
            visuallyHiddenText: text,
          },
        ],
      },
    };
  });
};
