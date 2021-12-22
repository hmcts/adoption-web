import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "The child's details",
  title: 'Orders already in place',
  label: 'Do you want to add another order?',
  hint: 'We need details of all orders already in place. Your social worker or adoption agency can help provide these details.',
  errors: {
    addAnotherOrder: {
      required: 'Please select an answer',
    },
  },
});

const cy = () => ({
  section: "The child's details (in welsh)",
  title: 'Orders already in place (in welsh)',
  label: 'Do you want to add another order? (in welsh)',
  hint: 'We need details of all orders already in place. Your social worker or adoption agency can help provide these details. (in welsh)',
  errors: {
    addAnotherOrder: {
      required: 'Please select an answer (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    addAnotherOrder: {
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
