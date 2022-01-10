import { YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Birth mother's details",
  label: "Is the child's birth mother still alive?",
  moreDetails:
    "Provide more details. For example, 'the birth mother is uncontactable'. Your adoption agency or social worker can help you to complete this section.",
  errors: {
    birthMotherStillAlive: {
      required: 'Please answer the question',
    },
    birthMotherNotAliveReason: {
      required: 'Enter more detail',
    },
  },
});

const cy = () => ({
  section: "Birth mother's details (in welsh)",
  label: "Is the child's birth mother still alive? (in welsh)",
  moreDetails:
    "Provide more details. For example, 'the birth mother is uncontactable'. Your adoption agency or social worker can help you to complete this section. (in welsh)",
  errors: {
    birthMotherStillAlive: {
      required: 'Please answer the question (in welsh)',
    },
    birthMotherNotAliveReason: {
      required: 'Enter more detail (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthMotherStillAlive: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        { label: l => l.yes, value: YesNoNotsure.YES },
        { label: l => l.no, value: YesNoNotsure.NO },
        {
          label: l => l.notSure,
          value: YesNoNotsure.NOT_SURE,
          subFields: {
            birthMotherNotAliveReason: {
              type: 'text',
              label: l => l.moreDetails,
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
