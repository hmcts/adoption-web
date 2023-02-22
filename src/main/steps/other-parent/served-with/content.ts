import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';

const en = () => ({
  section: "Other parent's details",
  title: 'Should the person with parental responsibility be sent documents or court orders relating to this adoption?',
  hint: 'Provide more details why person with parental responsibility not to be sent documents or court orders relating to this adoption. ',
  errors: {
    otherParentServedWith: {
      required: 'Select if the person with parental responsibility should be sent documents or court orders',
    },
    otherParentNotServedWithReason: {
      required: 'Provide a reason',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Unigolyn arall sydd â chyfrifoldeb rhiant',
  title:
    'A ddylid anfon dogfennau neu orchmynion llys yn ymwneud â’r cais i fabwysiadu hwn at yr unigolyn arall sydd â chyfrifoldeb rhiant?',
  hint: 'Rhowch ragor o fanylion pam na ddylid anfon dogfennau neu orchmynion llys sy’n ymwneud â’r cais i fabwysiadu hwn at yr unigolyn arall sydd â chyfrifoldeb rhiant. ',
  errors: {
    otherParentServedWith: {
      required:
        'Dewiswch a ddylid anfon dogfennau neu orchmynion llys at yr unigolyn arall sydd â chyfrifoldeb rhiant.',
    },
    otherParentNotServedWithReason: {
      required: 'Darparwch reswm',
    },
  },
});

export const form: FormContent = {
  fields: {
    otherParentServedWith: {
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
            otherParentNotServedWithReason: {
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
