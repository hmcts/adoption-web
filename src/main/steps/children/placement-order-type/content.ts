import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const enum PlacementOrderTypeEnum {
  AdoptionOrder = 'Adoption Order',
  CareOrder = 'Care Order',
  ContactOrder = 'Contact Order',
  FreeingOrder = 'Freeing Order',
  PlacementOrder = 'Placement Order',
  SupervisionOrder = 'Supervision Order',
  Other = 'Other',
}

const en = () => ({
  section: "The child's details",
  label: 'What type of order is it?',
  hint: 'This information makes it easier for the court to link past court orders.',
  adoptionOrder: 'Previous adoption order',
  careOrder: 'Care order',
  contactOrder: 'Child arrangements order',
  contactOrderHint: 'Child arrangements includes residency, contact, specific issue and prohibited steps.',
  placementOrder: 'Previous placement order',
  supervisionOrder: 'Supervision order',
  other: 'Other',
  otherOrder: 'Add a different type of order',
  errors: {
    selectedPlacementOrderType: {
      required: 'Enter an order type',
    },
    selectedOtherPlacementOrderType: {
      required: 'Enter an order type',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y plentyn',
  label: 'Beth oedd rhyw’r plentyn pan gafodd ei (g)eni?',
  hint: 'This information makes it easier for the court to link past court orders. (in welsh)',
  adoptionOrder: 'Previous adoption order (in welsh)',
  careOrder: 'Care order (in welsh)',
  contactOrder: 'Child arrangements order (in welsh)',
  contactOrderHint: 'Child arrangements includes residency, contact, specific issue and prohibited steps. (in welsh)',
  placementOrder: 'Previous placement order (in welsh)',
  supervisionOrder: 'Supervision order (in welsh)',
  other: 'Other (in welsh)',
  otherOrder: 'Add a different type of order',
  errors: {
    selectedPlacementOrderType: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
    selectedOtherPlacementOrderType: {
      required: 'Nac ydwdwch yr hyn sydd wedi’i ysgrifennu ar y dystysgrif geni.',
    },
  },
});

export const form: FormContent = {
  fields: {
    selectedPlacementOrderType: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [
        { label: l => l.careOrder, value: PlacementOrderTypeEnum.CareOrder },
        {
          label: l => l.contactOrder,
          value: PlacementOrderTypeEnum.ContactOrder,
          hint: l => l.contactOrderHint,
        },
        { label: l => l.adoptionOrder, value: PlacementOrderTypeEnum.AdoptionOrder },
        { label: l => l.placementOrder, value: PlacementOrderTypeEnum.PlacementOrder },
        { label: l => l.supervisionOrder, value: PlacementOrderTypeEnum.SupervisionOrder },
        {
          label: l => l.other,
          value: PlacementOrderTypeEnum.Other,
          subFields: {
            selectedOtherPlacementOrderType: {
              type: 'text',
              label: l => l.otherOrder,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
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

/* export const form: FormContent = {
  fields: userCase => {
    const placementOrder = userCase.placementOrders?.find(
      item => item.placementOrderId === userCase.selectedPlacementOrderId
    );
    return {
      placementOrderType: {
        type: 'text',
        classes: 'govuk-label',
        label: l => l.label,
        value: placementOrder?.placementOrderType,
        labelSize: 'l',
        attributes: {
          spellcheck: false,
        },
        validator: isFieldFilledIn,
      },
    };
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
  },
}; */

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};

/* export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
}; */
