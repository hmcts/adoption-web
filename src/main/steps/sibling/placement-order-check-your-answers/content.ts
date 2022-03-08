import { CaseWithId } from '../../../app/case/case';
import { PlacementOrder } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { SIBLING_ORDER_CASE_NUMBER, SIBLING_ORDER_CHECK_YOUR_ANSWERS, SIBLING_ORDER_TYPE } from '../../../steps/urls';

const placementOrderListItems = (userCase: Partial<CaseWithId>, content) => {
  const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
  const order = sibling?.siblingPlacementOrders?.find(item => {
    if ((item as PlacementOrder).placementOrderId === userCase.selectedSiblingPoId) {
      return true;
    }
  });

  const queryParams = `?change=${sibling?.siblingId}/${
    (order as PlacementOrder).placementOrderId
  }&returnUrl=${SIBLING_ORDER_CHECK_YOUR_ANSWERS}`;

  return [
    {
      key: { text: content.orderType },
      value: { text: (order as PlacementOrder).placementOrderType },
      actions: {
        items: [
          {
            href: `${SIBLING_ORDER_TYPE}${queryParams}`,
            text: content.change,
            visuallyHiddenText: 'change-order-type',
          },
        ],
      },
    },
    {
      key: { text: content.orderNumber },
      value: { text: (order as PlacementOrder).placementOrderNumber },
      actions: {
        items: [
          {
            href: `${SIBLING_ORDER_CASE_NUMBER}${queryParams}`,
            text: content.change,
            visuallyHiddenText: 'change-order-number',
          },
        ],
      },
    },
  ];
};

const getTitle = (userCase: Partial<CaseWithId>, content): string => {
  const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
  const placementOrder = (sibling?.siblingPlacementOrders as PlacementOrder[])?.find(
    item => item.placementOrderId === userCase.selectedSiblingPoId
  );

  return `${placementOrder?.placementOrderType || ''} ${content.for} ${sibling?.siblingFirstName || ''} ${
    sibling?.siblingLastNames || ''
  }`;
};

const en = content => {
  const enContent = {
    section: 'Sibling details',
    for: 'for',
    orderType: 'Type of order',
    orderNumber: 'Order case or serial number',
    change: 'Change',
    continue: 'Continue',
    language: content.language,
  };
  return {
    ...enContent,
    title: getTitle(content.userCase, enContent),
    placementOrderListItems: placementOrderListItems(content.userCase, enContent),
  };
};

const cy = content => {
  const cyContent = {
    section: 'Sibling details (in welsh)',
    for: 'for (in welsh)',
    orderType: 'Type of order (in welsh)',
    orderNumber: 'Order case or serial number (in welsh)',
    change: 'Change (in welsh)',
    continue: 'Continue (in welsh)',
    language: content.language,
  };
  return {
    ...cyContent,
    title: getTitle(content.userCase, cyContent),
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
