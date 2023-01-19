import { CaseWithId } from '../../../app/case/case';
import { SiblingPOType, SiblingRelationships } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import {
  LA_PORTAL_SIBLING_ORDER_CASE_NUMBER,
  LA_PORTAL_SIBLING_ORDER_CHECK_YOUR_ANSWERS,
  LA_PORTAL_SIBLING_ORDER_TYPE,
  LA_PORTAL_SIBLING_RELATION,
} from '../../../steps/urls';

const placementOrderListItems = (userCase: Partial<CaseWithId>, content) => {
  const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);

  const queryParams = `?change=${sibling?.siblingId}&returnUrl=${LA_PORTAL_SIBLING_ORDER_CHECK_YOUR_ANSWERS}`;

  return [
    {
      key: { text: content.relationship },
      value: { text: (sibling?.siblingRelation && content.siblingRelation[sibling.siblingRelation]) || '' },
      actions: {
        items: [
          {
            href: `${LA_PORTAL_SIBLING_RELATION}${queryParams}`,
            text: content.change,
            visuallyHiddenText: `${content.relationship} ${
              (sibling?.siblingRelation && content.siblingRelation[sibling.siblingRelation]) || ''
            }`,
          },
        ],
      },
    },
    {
      key: { text: content.orderType },
      value: { text: (sibling?.siblingPoType && content.siblingPOType[sibling.siblingPoType]) || '' },
      actions: {
        items: [
          {
            href: `${LA_PORTAL_SIBLING_ORDER_TYPE}${queryParams}`,
            text: content.change,
            visuallyHiddenText: `${content.orderType} ${
              (sibling?.siblingPoType && content.siblingPOType[sibling.siblingPoType]) || ''
            }`,
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
            href: `${LA_PORTAL_SIBLING_ORDER_CASE_NUMBER}${queryParams}`,
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

  return `${!sibling?.siblingPoType ? 'Order' : content.siblingPOType[sibling?.siblingPoType]} ${content.for} ${
    !sibling?.siblingRelation ? 'sibling' : content.siblingRelation[sibling?.siblingRelation].toLowerCase()
  }`;
};

const en = content => {
  const enContent = {
    section: 'Sibling details',
    for: 'for',
    relationship: 'Relationship',
    orderType: 'Type of order',
    orderNumber: 'Order case or serial number',
    change: 'Change',
    continue: 'Continue',
    language: content.language,
    siblingRelation: {
      [SiblingRelationships.SISTER]: 'Sister',
      [SiblingRelationships.STEP_SISTER]: 'Step-sister',
      [SiblingRelationships.HALF_SISTER]: 'Half-sister',
      [SiblingRelationships.BROTHER]: 'Brother',
      [SiblingRelationships.STEP_BROTHER]: 'Step-brother',
      [SiblingRelationships.HALF_BROTHER]: 'Half-brother',
    },
    siblingPOType: {
      [SiblingPOType.ADOPTION_ORDER]: 'Adoption order',
      [SiblingPOType.CARE_ORDER]: 'Care order',
      [SiblingPOType.CONTACT_ORDER]: 'Contact order',
      [SiblingPOType.FREEING_ORDER]: 'Freeing order',
      [SiblingPOType.PLACEMENT_ORDER]: 'Placement order',
      [SiblingPOType.SUPERVIS_ORDER]: 'Supervision order',
      [SiblingPOType.OTHER]: 'Other',
    },
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
    relationship: 'Perthynas',
    orderType: 'Math o neuchymyn',
    orderNumber: 'Rhif cyfresol neu rif yr achos ar y gorchymyn',
    change: 'Newid',
    continue: 'Parhau',
    language: content.language,
    siblingRelation: {
      [SiblingRelationships.SISTER]: 'Chwaer',
      [SiblingRelationships.STEP_SISTER]: 'Llyschwaer',
      [SiblingRelationships.HALF_SISTER]: 'Hanner chwaer',
      [SiblingRelationships.BROTHER]: 'Brawd',
      [SiblingRelationships.STEP_BROTHER]: 'Llysfrawd',
      [SiblingRelationships.HALF_BROTHER]: 'Hanner brawd',
    },
    siblingPOType: {
      [SiblingPOType.ADOPTION_ORDER]: 'Gorchymyn Mabwysiadu',
      [SiblingPOType.CARE_ORDER]: 'Gorchymyn Gofal',
      [SiblingPOType.CONTACT_ORDER]: 'Gorchymyn Cyswllt',
      [SiblingPOType.FREEING_ORDER]: 'Gorchymyn Rhyddhau',
      [SiblingPOType.PLACEMENT_ORDER]: 'Gorchymyn Lleoli',
      [SiblingPOType.SUPERVIS_ORDER]: 'Gorchymyn Goruchwylio',
      [SiblingPOType.OTHER]: 'Arall',
    },
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
