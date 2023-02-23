import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';

const en = () => ({
  section: "Birth mother's details",
  title: 'Should the birth mother be sent documents or court orders relating to this adoption?',
  hint: 'Provide more details why birth mother not to be sent documents or court orders relating to this adoption',
  errors: {
    birthMotherServedWith: {
      required: 'Select if the birth mother should be sent documents or court orders.',
    },
    birthMotherNotServedWithReason: {
      required: 'Enter more detail',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y fam enedigol',
  title: 'A ddylid anfon dogfennau neu orchmynion llys yn ymwneud â’r cais i fabwysiadu hwn at y fam enedigol?',
  hint: 'Rhowch ragor o fanylion pam na ddylid anfon dogfennau neu orchmynion llys sy’n ymwneud â’r cais i fabwysiadu hwn at y fam enedigol.',
  errors: {
    birthMotherServedWith: {
      required: 'Dewiswch a ddylid anfon dogfennau neu orchmynion llys at y fam enedigol.',
    },
    birthMotherNotServedWithReason: {
      required: 'Rhowch fwy o fanylion',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthMotherServedWith: {
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
            birthMotherNotServedWithReason: {
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
