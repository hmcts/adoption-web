import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

import { placementOrderListItems } from './placement-order-summary';

const en = content => {
  const enContent = {
    section: "The child's details",
    title: 'Orders already in place',
    placementOrder: 'Placement Order',
    change: 'Change',
    remove: 'Remove',
    label: 'Do you want to add another order?',
    hint: 'We need details of all orders already in place. Your social worker or adoption agency can help provide these details.',
    errors: {
      addAnotherPlacementOrder: {
        required: 'Please select an answer',
      },
    },
  };
  return {
    ...enContent,
    placementOrderListItems: placementOrderListItems(content.userCase, enContent),
  };
};

const cy = content => {
  const cyContent = {
    section: 'Manylion y plentyn',
    title: 'Gorchmynion sydd eisoes mewn lle',
    placementOrder: 'Gorchymyn Lleoli',
    change: 'Newid',
    remove: 'Dileu',
    label: 'A ydych eisiau ychwanegu gorchymyn arall?',
    hint: 'Mae arnom angen manylion y gorchmynion sydd eisoes mewn lle. Gall eich gweithiwr cymdeithasol neu’ch asiantaeth fabwysiadu eich helpu i ddarparu’r manylion hyn.',
    errors: {
      addAnotherPlacementOrder: {
        required: 'Dewiswch ateb os gwelwch yn dda',
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
