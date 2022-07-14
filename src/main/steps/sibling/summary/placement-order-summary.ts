import { Sibling } from '../../../app/case/definition';
import {
  LA_PORTAL_SIBLING_ORDER_CHECK_YOUR_ANSWERS,
  LA_PORTAL_SIBLING_REMOVE_PLACEMENT_ORDER,
} from '../../../steps/urls';

const isPlacementOrderComplete = (sibling: Sibling): boolean => {
  return !!(sibling.siblingPoType && sibling.siblingPoNumber);
};

//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const placementOrderListItems = (siblings: Sibling[], content: any): any => {
  return siblings?.map(item => {
    return {
      key: {
        text: item.siblingRelation && content.siblingRelation[item.siblingRelation],
        classes: 'font-normal',
      },
      value: {
        classes: 'summary-list-value-left-align',
        html: isPlacementOrderComplete(item)
          ? item.siblingPoType && content.siblingPOType[item.siblingPoType]
          : `${
              (item.siblingPoType && content.siblingPOType[item.siblingPoType]) || ''
            } <strong class="govuk-tag govuk-tag--yellow">${content.incomplete}</strong>`,
      },
      actions: {
        classes: 'summary-list-actions',
        items: [
          {
            href: `${LA_PORTAL_SIBLING_REMOVE_PLACEMENT_ORDER}?remove=${item.siblingId}`,
            text: content.remove,
            visuallyHiddenText: `${item.siblingRelation && content.siblingRelation[item.siblingRelation]} ${
              item.siblingPoType && content.siblingPOType[item.siblingPoType]
            }`,
          },
          {
            href: `${LA_PORTAL_SIBLING_ORDER_CHECK_YOUR_ANSWERS}?change=${item.siblingId}`,
            text: content.change,
            visuallyHiddenText: `${item.siblingRelation && content.siblingRelation[item.siblingRelation]} ${
              item.siblingPoType && content.siblingPOType[item.siblingPoType]
            }`,
          },
        ],
      },
    };
  });
};
