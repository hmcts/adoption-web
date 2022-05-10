import { CaseWithId } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { SIBLING_ORDER_CASE_NUMBER, SIBLING_ORDER_CHECK_YOUR_ANSWERS, SIBLING_ORDER_TYPE } from '../../../steps/urls';

const placementOrderListItems = (userCase: Partial<CaseWithId>, content) => {
  const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);

  const queryParams = `?change=${sibling?.siblingId}/${sibling?.siblingId}&returnUrl=${SIBLING_ORDER_CHECK_YOUR_ANSWERS}`;

  return [
    {
      key: { text: content.orderType },
      value: { text: sibling?.siblingPoType },
      actions: {
        items: [
          {
            href: `${SIBLING_ORDER_TYPE}${queryParams}`,
            text: content.change,
            visuallyHiddenText: content.orderType,
          },
        ],
      },
    },
    {
      key: { text: content.orderNumber },
      value: { text: sibling?.siblingPoNumber },
      actions: {
        items: [
          {
            href: `${SIBLING_ORDER_CASE_NUMBER}${queryParams}`,
            text: content.change,
            visuallyHiddenText: content.orderNumber,
          },
        ],
      },
    },
  ];
};

const getTitle = (userCase: Partial<CaseWithId>, content): string => {
  const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);

  return `${sibling?.siblingPoType || ''} ${content.for} ${sibling?.siblingRelation || ''}`;
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

const cy: typeof en = content => {
  const cyContent = {
    section: 'Manylion y brawd/chwaer',
    for: 'ar gyfer',
    orderType: 'Math o neuchymyn',
    orderNumber: 'Rhif cyfresol neu rif yr achos ar y gorchymyn',
    change: 'Newid',
    continue: 'Parhau',
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
