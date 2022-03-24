import { PlacementOrder, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SIBLING_NAME, SIBLING_ORDER_SUMMARY } from '../../../steps/urls';
import { SECTION, SECTION_IN_WELSH } from '../constants';

import { placementOrderListItems } from './placement-order-summary';

const en = content => {
  const enContent = {
    section: SECTION,
    title: 'Orders already in place for siblings and half-siblings',
    placementOrder: 'Placement Order',
    change: 'Change',
    remove: 'Remove',
    changeName: 'Change name',
    label: 'Do you want to add another order for a sibling or half-sibling?',
    hint: 'For example, a care order or supervision order. Your adoption agency or social worker can provide this information for you.',
    errors: {
      addAnotherSiblingPlacementOrder: {
        required: 'Please select an answer',
      },
    },
  };
  return {
    ...enContent,
    siblings: content.userCase.siblings?.map(item => ({
      siblingFirstName: item.siblingFirstName,
      siblingLastNames: item.siblingLastNames,
      changeSiblingNameUrl: `${SIBLING_NAME}?change=${item.siblingId}&returnUrl=${SIBLING_ORDER_SUMMARY}`,
      placementOrderListItems: placementOrderListItems(
        item.siblingId,
        item.siblingPlacementOrders as PlacementOrder[],
        enContent
      ),
    })),
  };
};

const cy = content => {
  const cyContent = {
    section: SECTION_IN_WELSH,
    title: 'Gorchmynion eisoes mewn lle ar gyfer brodyr/chwiorydd a hanner brodyr/hanner chwiorydd',
    placementOrder: 'Gorchymyn Lleoli',
    change: 'Newid',
    remove: 'Dileu',
    changeName: 'Newid enw',
    label: 'A ydych eisiau ychwanegu gorchymyn arall ar gyfer brawd/chwaer neu hanner frawd/hanner chwaer?',
    hint: 'Er enghraifft, gorchymyn gofal neu neuchymyn goruchwylio. Gall eich gweithiwr cymdeithasol neu’ch asiantaeth fabwysiadau ddarparu’r wybodaeth hon ichi.',
    errors: {
      addAnotherSiblingPlacementOrder: {
        required: 'Dewiswch ateb os gwelwch yn dda',
      },
    },
  };
  return {
    ...cyContent,
    siblings: content.userCase.siblings?.map(item => ({
      siblingFirstName: item.siblingFirstName,
      siblingLastNames: item.siblingLastNames,
      changeSiblingNameUrl: `${SIBLING_NAME}?change=${item.siblingId}&returnUrl=${SIBLING_ORDER_SUMMARY}`,
      placementOrderListItems: placementOrderListItems(
        item.siblingId,
        item.siblingPlacementOrders as PlacementOrder[],
        cyContent
      ),
    })),
  };
};

export const form: FormContent = {
  fields: {
    addAnotherSiblingPlacementOrder: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      labelSize: 'm',
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
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
