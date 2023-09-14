import { YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Birth mother's details",
  title: "Is the child's birth mother still alive?",
  moreDetails:
    "Provide more details. For example, 'the birth mother is uncontactable'. Your adoption agency or social worker can help you to complete this section.",
  hint: 'If this person has died, you will need to provide the death certificate.',
  errors: {
    birthMotherStillAlive: {
      required: 'Select whether the birth mother is alive',
    },
    birthMotherNotAliveReason: {
      required: 'Enter more detail',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y fam enedigol',
  title: 'A yw mam enedigol y plentyn dal yn fyw?',
  moreDetails:
    'Darparwch fwy o fanylion. Er enghraifft, ‘nid oes modd cysylltu â’r fam enedigol’. Gall eich asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol eich helpu i lenwi’r rhan hon. ',
  hint: "Os yw’r unigolyn hwn wedi marw, bydd angen i chi ddarparu'r dystysgrif marwolaeth.",
  yes: 'Ydy',
  no: 'Nac ydy',
  notSure: 'Ddim yn siŵr',
  errors: {
    birthMotherStillAlive: {
      required: 'Nodwch a yw’r fam fiolegol yn fyw.',
    },
    birthMotherNotAliveReason: {
      required: 'Rhowch fwy o fanylion',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthMotherStillAlive: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      labelHidden: true,
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
            birthMotherNotAliveReason: {
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
