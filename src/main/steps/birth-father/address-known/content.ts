import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'Do you have the birth father’s last known address?',
  birthFatherAddressUnknownReason: "Give a reason why address is not known, for example 'no fixed address'.",
  errors: {
    birthFatherAddressUnknownReason: {
      required: 'Provide a reason',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  label: 'Do you have the birth father’s last known address? (in Welsh)',
  birthFatherAddressUnknownReason: "Give a reason why address is not known, for example 'no fixed address'. (in Welsh)",
  errors: {
    birthFatherAddressUnknownReason: {
      required: 'Provide a reason',
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
            birthFatherAddressUnknownReason: {
              type: 'textarea',
              label: l => l.birthFatherAddressUnknownReason,
              attributes: {
                rows: 1,
              },
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
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
