import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'Do you have the address of the other person with parental responsibility for the child?',
  hint: "Ask the adoption agency or social worker if you're not sure.",
  otherParentAddressUnknownReason: "Give a reason why address is not known, for example 'no fixed address'.",
  errors: {
    otherParentAddressKnown: {
      required: 'Please select an answer',
    },
    otherParentAddressUnknownReason: {
      required: 'Provide a reason',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  label: 'Do you have the address of the other person with parental responsibility for the child? (in welsh)',
  hint: "Ask the adoption agency or social worker if you're not sure. (in welsh)",
  otherParentAddressUnknownReason: "Give a reason why address is not known, for example 'no fixed address'. (in Welsh)",
  errors: {
    otherParentAddressKnown: {
      required: 'Please select an answer (in welsh)',
    },
    otherParentAddressUnknownReason: {
      required: 'Provide a reason (in Welsh)',
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
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            otherParentAddressUnknownReason: {
              type: 'textarea',
              label: l => l.otherParentAddressUnknownReason,
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
