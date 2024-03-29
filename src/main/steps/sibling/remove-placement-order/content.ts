import { CaseWithId } from '../../../app/case/case';
import { SiblingPOType, SiblingRelationships, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { defaultButtons } from '../../../steps/common/components/common/default-buttons';
import { SECTION, SECTION_IN_WELSH } from '../constants';

export const getSiblingRelation = (userCase: Partial<CaseWithId>): string => {
  const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
  return `${sibling?.siblingRelation}`;
};

export const getPlacementOrderType = (userCase: Partial<CaseWithId>): string => {
  const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
  return `${sibling?.siblingPoType}`;
};

const en = content => {
  const enContent = {
    section: SECTION,
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
      [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Child arrangements order',
      [SiblingPOType.PLACEMENT_ORDER]: 'Placement order',
      [SiblingPOType.SUPERVIS_ORDER]: 'Supervision order',
      [SiblingPOType.OTHER]: 'Other',
    },
    errors: {
      confirm: {
        required: 'Please select an answer',
      },
    },
  };
  const placementOrderText = getPlacementOrderType(content.userCase);
  const siblingRelationText = getSiblingRelation(content.userCase);

  return {
    ...enContent,
    title: `Are you sure you want to remove this ${
      !enContent.siblingPOType[placementOrderText]
        ? 'order'
        : enContent.siblingPOType[getPlacementOrderType(content.userCase)].toLowerCase()
    } for child's ${
      !enContent.siblingRelation[siblingRelationText]
        ? 'sibling'
        : enContent.siblingRelation[getSiblingRelation(content.userCase)].toLowerCase()
    }?`,
  };
};

const cy: typeof en = content => {
  const cyContent = {
    section: SECTION_IN_WELSH,
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
      [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Gorchymyn trefniadau plant',
      [SiblingPOType.PLACEMENT_ORDER]: 'Gorchymyn Lleoli',
      [SiblingPOType.SUPERVIS_ORDER]: 'Gorchymyn Goruchwylio',
      [SiblingPOType.OTHER]: 'Arall',
    },
    errors: {
      confirm: {
        required: 'Dewiswch ateb os gwelwch yn dda',
      },
    },
    yes: 'Ydw',
    no: 'Nac ydw',
  };

  const placementOrderText = getPlacementOrderType(content.userCase);
  const siblingRelationText = getSiblingRelation(content.userCase);

  return {
    ...cyContent,
    title: `Ydych chi’n siŵr eich bod eisiau dileu’r ${
      !cyContent.siblingPOType[placementOrderText]
        ? 'gorchymyn hwn'
        : cyContent.siblingPOType[getPlacementOrderType(content.userCase)].toLowerCase()
    } ar gyfer ${
      !cyContent.siblingRelation[siblingRelationText]
        ? 'brawd neu chwaer'
        : cyContent.siblingRelation[getSiblingRelation(content.userCase)].toLowerCase()
    } y plentyn?`,
  };
};

export const form: FormContent = {
  fields: {
    confirm: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      section: l => l.section,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
    },
  },
  ...defaultButtons,
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
