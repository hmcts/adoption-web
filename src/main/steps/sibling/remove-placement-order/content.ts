import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { defaultButtons } from '../../../steps/common/components/common/default-buttons';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const getSiblingRelation = (userCase: Partial<CaseWithId>) => {
  const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
  return `${sibling?.siblingRelation || ''}`;
};

const getPlacementOrderType = (userCase: Partial<CaseWithId>): string => {
  const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
  return `${sibling?.siblingPoType || ''}`;
};

const en = content => ({
  section: SECTION,
  label: `Are you sure you want to remove this ${getPlacementOrderType(
    content.userCase
  )} for child's ${getSiblingRelation(content.userCase)}?`,
  errors: {
    confirm: {
      required: 'Please select an answer',
    },
  },
});

const cy: typeof en = content => ({
  section: SECTION_IN_WELSH,
  label: `Are you sure you want to remove this ${getPlacementOrderType(
    content.userCase
  )} for child's ${getSiblingRelation(content.userCase)}? (in welsh)`,
  errors: {
    confirm: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
  },
});

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
