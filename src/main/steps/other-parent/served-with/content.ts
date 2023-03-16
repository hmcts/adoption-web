import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'Should the person with parental responsibility be sent documents or court orders relating to this adoption?',
  hint: 'Provide more details why person with parental responsibility not to be sent documents or court orders relating to this adoption. ',
  label: 'Give a reason',
  errors: {
    otherParentServedWith: {
      required: 'Select if the person with parental responsibility should be sent documents or court orders',
    },
    otherParentNotServedWithReason: {
      required: 'Enter more detail',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title:
    'A ddylid anfon dogfennau neu orchmynion llys yn ymwneud â’r cais i fabwysiadu hwn at yr unigolyn arall sydd â chyfrifoldeb rhiant?',
  hint: 'Rhowch ragor o fanylion pam na ddylid anfon dogfennau neu orchmynion llys sy’n ymwneud â’r cais i fabwysiadu hwn at yr unigolyn arall sydd â chyfrifoldeb rhiant. ',
  label: 'Rhowch reswm',
  errors: {
    otherParentServedWith: {
      required:
        'Dewiswch a ddylid anfon dogfennau neu orchmynion llys at yr unigolyn arall sydd â chyfrifoldeb rhiant.',
    },
    otherParentNotServedWithReason: {
      required: 'Rhowch fwy o fanylion',
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
              label: l => l.label,
              hint: h => h.hint,
              labelSize: null,
              labelHidden: true,
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
