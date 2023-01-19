import { PlacementOrderTypeEnum, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

import { placementOrderListItems } from './placement-order-summary';

const en = content => {
  const enContent = {
    section: "The child's details",
    title: 'Orders already in place',
    placementOrder: 'Placement order',
    incomplete: 'incomplete',
    change: 'Change',
    remove: 'Remove',
    label: 'Does the child have any other previous or existing orders?',
    placementOrderType: {
      [PlacementOrderTypeEnum.AdoptionOrder]: 'Adoption order',
      [PlacementOrderTypeEnum.CareOrder]: 'Care order',
      [PlacementOrderTypeEnum.ContactOrder]: 'Contact order',
      [PlacementOrderTypeEnum.FreeingOrder]: 'Freeing order',
      [PlacementOrderTypeEnum.PlacementOrder]: 'Placement order',
      [PlacementOrderTypeEnum.SupervisionOrder]: 'Supervision order',
      [PlacementOrderTypeEnum.Other]: 'Other',
    },
    errors: {
      addAnotherPlacementOrder: {
        required: 'Select whether the child has any other previous or existing orders',
      },
    },
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
    placementOrder: 'Gorchymyn Lleoli',
    incomplete: 'anghyflawn',
    change: 'Newid',
    remove: 'Dileu',
    label: 'A oes gan y plentyn unrhyw orchmynion blaenorol neu bresennol eraill?',
    placementOrderType: {
      [PlacementOrderTypeEnum.AdoptionOrder]: 'Gorchymyn Mabwysiadu',
      [PlacementOrderTypeEnum.CareOrder]: 'Gorchymyn Gofal',
      [PlacementOrderTypeEnum.ContactOrder]: 'Gorchymyn Cyswllt',
      [PlacementOrderTypeEnum.FreeingOrder]: 'Gorchymyn Rhyddhau',
      [PlacementOrderTypeEnum.PlacementOrder]: 'Gorchymyn Lleoli',
      [PlacementOrderTypeEnum.SupervisionOrder]: 'Gorchymyn Goruchwylio',
      [PlacementOrderTypeEnum.Other]: 'Arall',
    },
    errors: {
      addAnotherPlacementOrder: {
        required: 'Nodwch a oes gan y plentyn unrhyw orchmynion blaenorol neu bresennol eraill',
      },
    },
  };
  return {
    ...cyContent,
    placementOrderListItems: placementOrderListItems(content.userCase, cyContent),
  };
};

export const form: FormContent = {
  fields: {
    addAnotherPlacementOrder: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.label,
      section: l => l.section,
      labelSize: 'm',
      labelHidden: false,
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
