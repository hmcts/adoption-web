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
      [SiblingPOType.CONTACT_ORDER]: 'Contact order',
      [SiblingPOType.FREEING_ORDER]: 'Freeing order',
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
    label: `Are you sure you want to remove this ${
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
      [SiblingRelationships.SISTER]: 'Sister (in welsh)',
      [SiblingRelationships.STEP_SISTER]: 'Step-sister (in welsh)',
      [SiblingRelationships.HALF_SISTER]: 'Half-sister (in welsh)',
      [SiblingRelationships.BROTHER]: 'Brother (in welsh)',
      [SiblingRelationships.STEP_BROTHER]: 'Step-brother (in welsh)',
      [SiblingRelationships.HALF_BROTHER]: 'Half-brother (in welsh)',
    },
    siblingPOType: {
      [SiblingPOType.ADOPTION_ORDER]: 'Adoption order (in welsh)',
      [SiblingPOType.CARE_ORDER]: 'Care order (in welsh)',
      [SiblingPOType.CONTACT_ORDER]: 'Contact order (in welsh)',
      [SiblingPOType.FREEING_ORDER]: 'Freeing order (in welsh)',
      [SiblingPOType.PLACEMENT_ORDER]: 'Placement order (in welsh)',
      [SiblingPOType.SUPERVIS_ORDER]: 'Supervision order (in welsh)',
      [SiblingPOType.OTHER]: 'Other (in welsh)',
    },
    errors: {
      confirm: {
        required: 'Dewiswch ateb os gwelwch yn dda',
      },
    },
  };

  const placementOrderText = getPlacementOrderType(content.userCase);
  const siblingRelationText = getSiblingRelation(content.userCase);

  return {
    ...cyContent,
    label: `Are you sure you want to remove this ${
      !cyContent.siblingPOType[placementOrderText]
        ? 'order'
        : cyContent.siblingPOType[getPlacementOrderType(content.userCase)].toLowerCase()
    } for child's ${
      !cyContent.siblingRelation[siblingRelationText]
        ? 'sibling'
        : cyContent.siblingRelation[getSiblingRelation(content.userCase)].toLowerCase()
    }?`,
  };
};

export const form: FormContent = {
  fields: {
    confirm: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
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
