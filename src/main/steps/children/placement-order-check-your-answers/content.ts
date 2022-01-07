import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  CHILDREN_PLACEMENT_ORDER_COURT,
  CHILDREN_PLACEMENT_ORDER_DATE,
  CHILDREN_PLACEMENT_ORDER_NUMBER,
  CHILDREN_PLACEMENT_ORDER_TYPE,
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
                  href: `${CHILDREN_PLACEMENT_ORDER_TYPE}?change=${order.placementOrderId}`,
                  text: content.change,
                  visuallyHiddenText: 'change-order-type',
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
            href: `${CHILDREN_PLACEMENT_ORDER_NUMBER}?change=${order.placementOrderId}`,
            text: content.change,
            visuallyHiddenText: 'change-order-number',
          },
        ],
      },
    },
    {
      key: { text: content.orderCourt },
      value: { text: order.placementOrderCourt },
      actions: {
        items: [
          {
            href: `${CHILDREN_PLACEMENT_ORDER_COURT}?change=${order.placementOrderId}`,
            text: content.change,
            visuallyHiddenText: 'change-order-court',
          },
        ],
      },
    },
    {
      key: { text: content.orderDate },
      value: { text: getFormattedDate(order.placementOrderDate, content.language) },
      actions: {
        items: [
          {
            href: `${CHILDREN_PLACEMENT_ORDER_DATE}?change=${order.placementOrderId}`,
            text: content.change,
            visuallyHiddenText: 'change-order-date',
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

const cy = content => {
  const cyContent = {
    section: "The child's details (in welsh)",
    title: 'Orders already in place (in welsh)',
    orderType: 'Type of order (in welsh)',
    orderNumber: 'Order case or serial number (in welsh)',
    orderCourt: 'Court (in welsh)',
    orderDate: 'Order date (in welsh)',
    placementOrder: 'Placement Order (in welsh)',
    change: 'Change (in welsh)',
    continue: 'Continue (in welsh)',
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
