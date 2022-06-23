import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';

const en = ({ userCase }: CommonContent) => {
  const label =
    userCase?.placementOrders?.length === 0
      ? 'What is the serial or case number on the placement order?'
      : 'What is the serial or case number on the order?';
  return {
    label,
    section: "The child's details",
    // hint: "This is on the top right of the order. Ask the adoption agency or social worker if you're not sure.",
    errors: {
      placementOrderNumber: {
        required: 'Enter the serial or case number',
      },
    },
  };
};

const cy: typeof en = ({ userCase }: CommonContent) => {
  const label =
    userCase?.placementOrders?.length === 0
      ? 'What is the serial or case number on the placement order?'
      : 'What is the serial or case number on the order?';
  return {
    label,
    section: 'Manylion y plentyn',
    // hint: 'Mae hwn wedi’i nodi yng nghornel dde uchaf y gorchymyn. Gofynnwch i’r asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol os nad ydych yn siŵr.',
    errors: {
      placementOrderNumber: {
        required: 'Nac ydwdwch y rhif cyfresol neu rif yr achos',
      },
    },
  };
};

export const form: FormContent = {
  fields: userCase => {
    const placementOrder = userCase.placementOrders?.find(
      item => item.placementOrderId === userCase.selectedPlacementOrderId
    );
    return {
      placementOrderNumber: {
        type: 'text',
        classes: 'govuk-label govuk-input--width-10',
        label: l => l.label,
        // hint: l => l.hint,
        value: placementOrder?.placementOrderNumber,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
