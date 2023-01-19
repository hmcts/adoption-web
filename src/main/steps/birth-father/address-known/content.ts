import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';

const en = () => ({
  section: "Birth father's details",
  title: 'Do you have the birth father’s last known address?',
  moreDetails: "Give a reason why the address is not known, for example 'no fixed address'.",
  errors: {
    birthFatherAddressKnown: {
      required: 'Select whether the birth father’s address is known',
    },
    birthFatherAddressNotKnownReason: {
      required: 'Provide a reason',
      invalid: 'Reason must be 500 characters or fewer',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y tad biolegol',
  title: 'A oes gennych gyfeiriad olaf hysbys y tad biolegol?',
  moreDetails: 'Rhowch reswm pam bod y cyfeiriad yn anhysbys, er enghraifft ‘dim cyfeiriad parhaol’.',
  errors: {
    birthFatherAddressKnown: {
      required: 'Nodwch a yw cyfeiriad y tad biolegol yn hysbys',
    },
    birthFatherAddressNotKnownReason: {
      required: 'Darparwch reswm',
      invalid: 'Rhaid i’r rheswm fod yn 500 nod neu llai',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthFatherAddressKnown: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      hint: l => l.hint,
      labelHidden: true,
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
