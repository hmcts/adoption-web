import { SiblingPOType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'What type of order is it?',
  adoptionOrder: 'Adoption order',
  careOrder: 'Care order',
  contactOrder: 'Contact order',
  freeingOrder: 'Freeing order',
  placementOrder: 'Placement order',
  superVisOrder: 'Supervision order',
  other: 'Other',
  placementOtherType: 'Add a different type of order',
  errors: {
    selectedSiblingPoType: {
      required: 'Please select an answer',
    },
    selectedSiblingOtherPlacementOrderType: {
      required: 'Enter an order type',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'Pa fath o orchymyn ydyw?',
  adoptionOrder: 'Gorchymyn Mabwysiadu',
  careOrder: 'Gorchymyn Gofal',
  contactOrder: 'Gorchymyn Cyswllt',
  freeingOrder: 'Gorchymyn Rhyddhau',
  placementOrder: 'Gorchymyn Lleoli',
  superVisOrder: 'Gorchymyn Goruchwylio',
  other: 'Arall',
  placementOtherType: 'Ychwanegu math gwahanol o orchymyn',
  errors: {
    selectedSiblingPoType: {
      required: 'Dewiswch ateb os gwelwch yn dda',
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
        values: [
          { label: l => l.adoptionOrder, value: SiblingPOType.ADOPTION_ORDER },
          { label: l => l.careOrder, value: SiblingPOType.CARE_ORDER },
          { label: l => l.contactOrder, value: SiblingPOType.CONTACT_ORDER },
          { label: l => l.freeingOrder, value: SiblingPOType.FREEING_ORDER },
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
