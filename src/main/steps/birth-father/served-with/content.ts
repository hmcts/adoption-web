import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';

const en = () => ({
  section: 'Birth father details',
  title: 'Should the birth father be sent documents or court orders relating to this adoption?',
  hint: 'Provide more details why birth father not to be sent documents or court orders relating to this adoption',
  errors: {
    birthFatherServedWith: {
      required: 'Select if the birth father should be sent documents or court orders.',
    },
    birthFatherNotServedWithReason: {
      required: 'Enter more detail',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y tad genedigol',
  title: 'A ddylid anfon dogfennau neu orchmynion llys yn ymwneud â’r cais i fabwysiadu hwn at y tad genedigol?',
  hint: 'Rhowch ragor o fanylion pam na ddylid anfon dogfennau neu orchmynion llys sy’n ymwneud â’r cais i fabwysiadu hwn at y tad genedigol.',
  errors: {
    birthFatherServedWith: {
      required: 'Dewiswch a ddylid anfon dogfennau neu orchmynion llys at y tad genedigol.',
    },
    birthFatherNotServedWithReason: {
      required: 'Rhowch fwy o fanylion',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthFatherServedWith: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            birthFatherNotServedWithReason: {
              type: 'textarea',
              hint: h => h.hint,
              labelSize: null,
              attributes: {
                rows: 1,
              },
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
