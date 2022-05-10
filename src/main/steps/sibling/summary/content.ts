import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

import { placementOrderListItems } from './placement-order-summary';

const en = content => {
  const enContent = {
    section: SECTION,
    title: 'Orders already in place for siblings and half-siblings',
    sibling: 'Sibling',
    placementOrder: 'Placement Order',
    incomplete: 'incomplete',
    change: 'Change',
    remove: 'Remove',
    label: 'Do you want to add another order?',
    hint: 'For example, a care order or supervision order.',
    errors: {
      addAnotherSiblingPlacementOrder: {
        required: 'Please select an answer',
      },
    },
  };
  return {
    ...enContent,
    siblings: placementOrderListItems(content.userCase.siblings, enContent),
  };
};

const cy: typeof en = content => {
  const cyContent = {
    section: SECTION_IN_WELSH,
    title: 'Gorchmynion eisoes mewn lle ar gyfer brodyr/chwiorydd a hanner brodyr/hanner chwiorydd',
    sibling: 'Brawd/chwaer',
    placementOrder: 'Gorchymyn Lleoli',
    incomplete: 'anghyflawn',
    change: 'Newid',
    remove: 'Dileu',
    label: 'Do you want to add another order? (in welsh)',
    hint: 'For example, a care order or supervision order. (in welsh)',
    errors: {
      addAnotherSiblingPlacementOrder: {
        required: 'Dewiswch ateb os gwelwch yn dda',
      },
    },
  };
  return {
    ...cyContent,
    siblings: placementOrderListItems(content.userCase.siblings, cyContent),
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
