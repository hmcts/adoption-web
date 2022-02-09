import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Birth father's details",
  label: 'Do you have the birth father’s last known address?',
  moreDetails: "Give a reason why the address is not known, for example 'no fixed address'.",
  hint: "Ask the adoption agency or social worker if you're not sure.",
  errors: {
    birthFatherAddressKnown: {
      required: 'Please select an answer',
    },
    birthFatherAddressNotKnownReason: {
      required: 'Provide a reason',
    },
  },
});

const cy = () => ({
  section: "Birth father's details (in Welsh)",
  label: 'Do you have the birth father’s last known address? (in Welsh)',
  moreDetails: "Give a reason why the address is not known, for example 'no fixed address'. (in Welsh)",
  hint: "Ask the adoption agency or social worker if you're not sure. (in Welsh)",
  errors: {
    birthFatherAddressKnown: {
      required: 'Please select an answer (in Welsh)',
    },
    birthFatherAddressNotKnownReason: {
      required: 'Provide a reason (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthFatherAddressKnown: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            birthFatherAddressNotKnownReason: {
              type: 'textarea',
              label: l => l.moreDetails,
              attributes: {
                rows: 1,
              },
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
