import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';

const en = () => ({
  section: "Birth mother's details",
  label: "Do you have the birth mother's last known address?",
  moreDetails: "Give a reason why the address is not known, for example 'no fixed address'.",
  hint: "Ask the adoption agency or social worker if you're not sure.",
  errors: {
    birthMotherAddressKnown: {
      required: 'Please select an answer',
    },
    birthMotherAddressNotKnownReason: {
      required: 'Provide a reason',
      invalid: 'Reason must be 500 characters or fewer',
    },
  },
});

const cy = () => ({
  section: "Birth mother's details (in welsh)",
  label: "Do you have the birth mother's last known address? (in welsh)",
  moreDetails: "Give a reason why the address is not known, for example 'no fixed address'. (in welsh)",
  hint: "Ask the adoption agency or social worker if you're not sure. (in welsh)",
  errors: {
    birthMotherAddressKnown: {
      required: 'Please select an answer (in welsh)',
    },
    birthMotherAddressNotKnownReason: {
      required: 'Provide a reason (in welsh)',
      invalid: 'Reason must be 500 characters or fewer (in welsh)',
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
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            birthMotherAddressNotKnownReason: {
              type: 'textarea',
              label: l => l.moreDetails,
              attributes: {
                rows: 1,
              },
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
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
