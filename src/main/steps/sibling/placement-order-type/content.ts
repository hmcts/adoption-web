import { PlacementOrderTypeEnum, SiblingPOType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'What type of order is it?',
  hint: 'This information makes it easier for the court to link past court orders.',
  adoptionOrder: 'Adoption order',
  careOrder: 'Care order',
  contactOrder: 'Child arrangements order',
  contactOrderHint: 'Child arrangements includes residency, contact, specific issue and prohibited steps.',
  placementOrder: 'Placement order',
  superVisOrder: 'Supervision order',
  other: 'Other',
  placementOtherType: 'Add a different type of order',
  errors: {
    selectedSiblingPoType: {
      required: 'Select the order type',
    },
    selectedSiblingOtherPlacementOrderType: {
      required: 'Enter an order type',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Pa fath o orchymyn ydyw?',
  hint: "Mae'r wybodaeth hon yn ei gwneud hi'n haws i'r llys gysylltu gorchmynion llys yn y gorffennol.",
  adoptionOrder: 'Gorchymyn Mabwysiadu',
  careOrder: 'Gorchymyn Gofal',
  contactOrder: 'Gorchymyn trefniadau plant',
  contactOrderHint: 'Mae trefniadau plant yn cynnwys cyfnod preswyl, cyswllt, mater penodol a chamau gwaharddedig.',
  placementOrder: 'Gorchymyn Lleoli',
  superVisOrder: 'Gorchymyn Goruchwylio',
  other: 'Arall',
  placementOtherType: 'Ychwanegu math gwahanol o orchymyn',
  errors: {
    selectedSiblingPoType: {
      required: 'Dewiswch y math o orchymyn',
    },
    selectedSiblingOtherPlacementOrderType: {
      required: 'Nodwch y math o orchymyn',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
    return {
      selectedSiblingPoType: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.title,
        hint: l => l.hint,
        values: [
          { label: l => l.adoptionOrder, value: SiblingPOType.ADOPTION_ORDER },
          { label: l => l.careOrder, value: SiblingPOType.CARE_ORDER },
          {
            label: l => l.contactOrder,
            value: PlacementOrderTypeEnum.ContactOrder,
            hint: l => l.contactOrderHint,
          },
          { label: l => l.placementOrder, value: SiblingPOType.PLACEMENT_ORDER },
          { label: l => l.superVisOrder, value: SiblingPOType.SUPERVIS_ORDER },
          {
            label: l => l.other,
            value: SiblingPOType.OTHER,
            subFields: {
              selectedSiblingOtherPlacementOrderType: {
                type: 'text',
                label: l => l.placementOtherType,
                labelSize: null,
                validator: isFieldFilledIn,
              },
            },
          },
        ],
        attributes: {
          spellcheck: false,
        },
        labelHidden: true,
        validator: isFieldFilledIn,
        ...sibling,
      },
    };
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
