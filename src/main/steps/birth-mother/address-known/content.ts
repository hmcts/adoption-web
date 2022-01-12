import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Birth mother's details",
  label: "Do you have the birth mother's last known address?",
  hint: "Ask the adoption agency or social worker if you're not sure.",
  errors: {
    birthMotherAddressKnown: {
      required: 'Please select an answer',
    },
  },
});

const cy = () => ({
  section: "Birth mother's details (in welsh)",
  label: "Do you have the birth mother's last known address? (in welsh)",
  hint: "Ask the adoption agency or social worker if you're not sure. (in welsh)",
  errors: {
    birthMotherAddressKnown: {
      required: 'Please select an answer (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthMotherAddressKnown: {
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
