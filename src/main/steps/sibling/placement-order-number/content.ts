import { PlacementOrder } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'What is the serial or case number on the order?',
  hint: 'Ask your social worker or adoption agency if you are not sure where to find this.',
  errors: {
    placementOrderNumber: {
      required: 'Enter the serial or case number',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  label: 'Beth yw’r rhif cyfresol neu rif yr achos ar y gorchymyn?',
  hint: 'Gofynnwch i’ch gweithiwr cymdeithasol, neu’ch asiantaeth fabwysiadu os nad ydych yn siŵr lle i ddod o hyd i hwn.',
  errors: {
    placementOrderNumber: {
      required: 'Nac ydwdwch y rhif cyfresol neu rif yr achos',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    const sibling = userCase.siblings?.find(item => item.siblingId === userCase.selectedSiblingId);
    const siblingPlacementOrder = sibling?.siblingPlacementOrders?.find(
      item => (item as PlacementOrder).placementOrderId === userCase.selectedSiblingPoId
    );
    return {
      placementOrderNumber: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.label,
        hint: l => l.hint,
        value: (siblingPlacementOrder as PlacementOrder)?.placementOrderNumber,
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
