import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  LA_PORTAL_CHILD_PLACEMENT_ORDER_COURT,
  LA_PORTAL_CHILD_PLACEMENT_ORDER_DATE,
  LA_PORTAL_CHILD_PLACEMENT_ORDER_NUMBER,
  LA_PORTAL_CHILD_PLACEMENT_ORDER_TYPE,
} from '../../../steps/urls';

const placementOrderListItems = (userCase, content) => {
  let foundIndex = -1;
  const order = userCase.placementOrders?.find((item, index) => {
    if (item.placementOrderId === userCase.selectedPlacementOrderId) {
      foundIndex = index;
      return true;
    }
  });
  return [
    {
      key: { text: content.orderType },
      value: { text: order.placementOrderType || content.placementOrder },
      actions: {
        items:
          foundIndex !== 0
            ? [
                {
                  href: `${LA_PORTAL_CHILD_PLACEMENT_ORDER_TYPE}?change=${order.placementOrderId}`,
                  text: content.change,
                  visuallyHiddenText: content.orderType,
                },
              ]
            : [],
      },
    },
    {
      key: { text: content.orderNumber },
      value: { text: order.placementOrderNumber },
      actions: {
        items: [
          {
            href: `${LA_PORTAL_CHILD_PLACEMENT_ORDER_NUMBER}?change=${order.placementOrderId}`,
            text: content.change,
            visuallyHiddenText: content.orderNumber,
          },
        ],
      },
    },
    ...(foundIndex !== 0
      ? [
          {
            key: { text: content.orderCourt },
            value: { text: order.placementOrderCourt },
            actions: {
              items: [
                {
                  href: `${LA_PORTAL_CHILD_PLACEMENT_ORDER_COURT}?change=${order.placementOrderId}`,
                  text: content.change,
                  visuallyHiddenText: content.orderCourt,
                },
              ],
            },
          },
        ]
      : []),

    {
      key: { text: content.orderDate },
      value: { text: getFormattedDate(order.placementOrderDate, content.language) },
      actions: {
        items: [
          {
            href: `${LA_PORTAL_CHILD_PLACEMENT_ORDER_DATE}?change=${order.placementOrderId}`,
            text: content.change,
            visuallyHiddenText: content.orderDate,
          },
        ],
      },
    },
  ];
};

const en = content => {
  const enContent = {
    section: "The child's details",
    title: 'Orders already in place',
    orderType: 'Type of order',
    orderNumber: 'Order case or serial number',
    orderCourt: 'Court',
    orderDate: 'Order date',
    placementOrder: 'Placement Order',
    change: 'Change',
    continue: 'Continue',
    language: content.language,
  };
  return {
    ...enContent,
    placementOrderListItems: placementOrderListItems(content.userCase, enContent),
  };
};

const cy: typeof en = content => {
  const cyContent = {
    section: 'Manylion y plentyn',
    title: 'Gorchmynion sydd eisoes mewn lle',
    orderType: 'Math o neuchymyn',
    orderNumber: 'Rhif cyfresol neu rif yr achos ar y gorchymyn',
    orderCourt: 'Llys',
    orderDate: 'Dyddiad y gorchymyn',
    placementOrder: 'Gorchymyn Lleoli',
    change: 'Newid',
    continue: 'Parhau',
    language: content.language,
  };
  return {
    ...cyContent,
    placementOrderListItems: placementOrderListItems(content.userCase, cyContent),
  };
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
