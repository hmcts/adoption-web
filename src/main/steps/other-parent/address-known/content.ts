import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Other parent's details",
  label: 'Do you have the address of the other person with parental responsibility for the child?',
  hint: "Ask the adoption agency or social worker if you're not sure.",
  errors: {
    otherParentAddressKnown: {
      required: 'Please select an answer',
    },
  },
});

const cy = () => ({
  section: "Other parent's details (in welsh)",
  label: 'Do you have the address of the other person with parental responsibility for the child? (in welsh)',
  hint: "Ask the adoption agency or social worker if you're not sure. (in welsh)",
  errors: {
    otherParentAddressKnown: {
      required: 'Please select an answer (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    otherParentAddressKnown: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
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
