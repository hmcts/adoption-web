import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const placementOrderListItems = (userCase, content) => {
  return userCase.placementOrders?.map(item => {
    return {
      key: {
        text: item.placementOrderType || content.placementOrder,
        classes: 'font-normal',
      },
      actions: {
        items: [
          {
            href: '#',
            text: content.change,
            visuallyHiddenText: 'name',
          },
        ],
      },
    };
  });
};

const en = content => {
  const enContent = {
    section: "The child's details",
    title: 'Orders already in place',
    placementOrder: 'Placement Order',
    change: 'Change',
    remove: 'Remove',
    label: 'Do you want to add another order?',
    hint: 'We need details of all orders already in place. Your social worker or adoption agency can help provide these details.',
    errors: {
      addAnotherOrder: {
        required: 'Please select an answer',
      },
    },
  };
  return {
    ...enContent,
    placementOrderListItems: placementOrderListItems(content.userCase, enContent),
  };
};

const cy = content => {
  const cyContent = {
    section: "The child's details (in welsh)",
    title: 'Orders already in place (in welsh)',
    placementOrder: 'Placement Order (in welsh)',
    change: 'Change (in welsh)',
    remove: 'Remove (in welsh)',
    label: 'Do you want to add another order? (in welsh)',
    hint: 'We need details of all orders already in place. Your social worker or adoption agency can help provide these details. (in welsh)',
    errors: {
      addAnotherOrder: {
        required: 'Please select an answer (in welsh)',
      },
    },
  };
  return {
    ...cyContent,
    placementOrderListItems: placementOrderListItems(content.userCase, cyContent),
  };
};

export const form: FormContent = {
  fields: {
    addAnotherPlacementOrder: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      labelSize: 'm',
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
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
