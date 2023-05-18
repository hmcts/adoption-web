import { SiblingPOType, SiblingRelationships, YesOrNo } from '../../../app/case/definition';
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
    siblingRelation: {
      [SiblingRelationships.SISTER]: 'Sister',
      [SiblingRelationships.STEP_SISTER]: 'Step-sister',
      [SiblingRelationships.HALF_SISTER]: 'Half-sister',
      [SiblingRelationships.BROTHER]: 'Brother',
      [SiblingRelationships.STEP_BROTHER]: 'Step-brother',
      [SiblingRelationships.HALF_BROTHER]: 'Half-brother',
    },
    placementOrder: 'Placement order',
    siblingPOType: {
      [SiblingPOType.ADOPTION_ORDER]: 'Adoption order',
      [SiblingPOType.CARE_ORDER]: 'Care order',
      [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Child arrangements order',
      [SiblingPOType.PLACEMENT_ORDER]: 'Placement order',
      [SiblingPOType.SUPERVIS_ORDER]: 'Supervision order',
      [SiblingPOType.OTHER]: 'Other',
    },
    incomplete: 'incomplete',
    change: 'Change',
    remove: 'Remove',
    label: 'Do you want to add another order for the same or another sibling?',
    errors: {
      addAnotherSiblingPlacementOrder: {
        required: 'Select whether you want to add another order for the same or another sibling',
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
    siblingRelation: {
      [SiblingRelationships.SISTER]: 'Chwaer',
      [SiblingRelationships.STEP_SISTER]: 'Llyschwaer',
      [SiblingRelationships.HALF_SISTER]: 'Hanner chwaer',
      [SiblingRelationships.BROTHER]: 'Brawd',
      [SiblingRelationships.STEP_BROTHER]: 'Llysfrawd',
      [SiblingRelationships.HALF_BROTHER]: 'Hanner brawd',
    },
    placementOrder: 'Gorchymyn Lleoli',
    siblingPOType: {
      [SiblingPOType.ADOPTION_ORDER]: 'Gorchymyn Mabwysiadu',
      [SiblingPOType.CARE_ORDER]: 'Gorchymyn Gofal',
      [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Gorchymyn trefniadau plant',
      [SiblingPOType.PLACEMENT_ORDER]: 'Gorchymyn Lleoli',
      [SiblingPOType.SUPERVIS_ORDER]: 'Gorchymyn Goruchwylio',
      [SiblingPOType.OTHER]: 'Arall',
    },
    incomplete: 'anghyflawn',
    change: 'Newid',
    remove: 'Dileu',
    label: 'A ydych eisiau ychwanegu gorchymyn arall ar gyfer yr un brawd/chwaer neu frawd/chwaer arall?',
    errors: {
      addAnotherSiblingPlacementOrder: {
        required:
          'Nodwch a oes arnoch eisiau ychwanegu gorchymyn arall ar gyfer yr un brawd/chwaer neu frawd/chwaer arall',
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
      labelSize: 'm',
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      labelHidden: false,
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
