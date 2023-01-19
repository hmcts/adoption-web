import { CaseWithId } from '../../../app/case/case';
import { PlacementOrderTypeEnum, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { defaultButtons } from '../../../steps/common/components/common/default-buttons';

export const getPlacementOrderType = (userCase: Partial<CaseWithId>): string => {
  const placementOrder = userCase.placementOrders?.find(
    item => item.placementOrderId === userCase.selectedPlacementOrderId
  );
  return `${placementOrder?.placementOrderType}`;
};

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const en = content => {
  const enContent = {
    section: "The child's details",
    childsPOType: {
      [PlacementOrderTypeEnum.CareOrder]: 'Care order',
      [PlacementOrderTypeEnum.ContactOrder]: 'Child arrangements order',
      [PlacementOrderTypeEnum.AdoptionOrder]: 'Previous adoption order',
      [PlacementOrderTypeEnum.PlacementOrder]: 'Previous placement order',
      [PlacementOrderTypeEnum.SupervisionOrder]: 'Supervision order',
      [PlacementOrderTypeEnum.Other]: 'Other order',
    },
    errors: {
      confirm: {
        required: 'Please select an answer',
      },
    },
  };
  const placementOrderText = getPlacementOrderType(content.userCase);
  return {
    ...enContent,
    title: `Are you sure you want to remove this ${enContent.childsPOType[placementOrderText]} ?`,
  };
};
//eslint-disable-next-line @typescript-eslint/no-unused-vars
const cy: typeof en = content => {
  const cyContent = {
    section: 'Manylion y plentyn',
    childsPOType: {
      [PlacementOrderTypeEnum.CareOrder]: 'Gorchymyn Gofal',
      [PlacementOrderTypeEnum.ContactOrder]: 'Gorchymyn trefniadau plant',
      [PlacementOrderTypeEnum.AdoptionOrder]: 'Gorchymyn mabwysiadu blaenorol',
      [PlacementOrderTypeEnum.PlacementOrder]: 'Gorchymyn lleoli blaenorol',
      [PlacementOrderTypeEnum.SupervisionOrder]: 'Gorchymyn Goruchwylio',
      [PlacementOrderTypeEnum.Other]: 'Gorchymyn Arall',
    },
    errors: {
      confirm: {
        required: 'Dewiswch ateb os gwelwch yn dda',
      },
    },
  };
  const placementOrderText = getPlacementOrderType(content.userCase);
  return {
    ...cyContent,
    title: `Ydych chi'n siŵr eich bod am ddileu hwn ${cyContent.childsPOType[placementOrderText]} ?`,
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
