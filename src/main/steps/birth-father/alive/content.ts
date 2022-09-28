import { YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: "Is the child's birth father still alive?",
  moreDetails:
    "Provide more details. For example, 'the birth father is uncontactable'. Your adoption agency or social worker can help you to complete this section.",
  hint: 'If this person has died, you will need to provide the death certificate.',
  errors: {
    birthFatherStillAlive: {
      required: 'Please answer the question',
    },
    birthFatherUnsureAliveReason: {
      required: 'Enter more details',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  label: 'A yw tad biolegol y plentyn dal yn fyw?',
  moreDetails:
    'Darparwch fwy o fanylion. Er enghraifft, ‘nid oes modd cysylltu â’r tad biolegol’. Gall eich asiantaeth fabwysiadu neu eich gweithiwr cymdeithasol eich helpu i lenwi’r rhan hon.',
  hint: "Os yw’r unigolyn hwn wedi marw, bydd angen i chi ddarparu'r dystysgrif marwolaeth.",
  errors: {
    birthFatherStillAlive: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
    birthFatherUnsureAliveReason: {
      required: 'Rhowch fwy o fanylion',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthFatherStillAlive: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        { label: l => l.yes, value: YesNoNotsure.YES },
        {
          label: l => l.no,
          value: YesNoNotsure.NO,
          subFields: {
            hint1: {
              type: 'label',
              label: l => l.hint,
            },
          },
        },
        {
          label: l => l.notSure,
          value: YesNoNotsure.NOT_SURE,
          subFields: {
            birthFatherUnsureAliveReason: {
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
