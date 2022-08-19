import { YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Birth father's details",
  label: "Is the birth father's identity known? ",
  errors: {
    birthFatherIdentityKnown: {
      required: 'Please answer the question',
    },
  },
});

const cy: typeof en = () => ({
  section: "Birth father's details (in welsh)",
  label: "Is the birth father's identity known? (in welsh)",
  errors: {
    birthFatherIdentityKnown: {
      required: 'Please answer the question (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthFatherIdentityKnown: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        { label: l => l.yes, value: YesNoNotsure.YES },
        { label: l => l.no, value: YesNoNotsure.NO },
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
