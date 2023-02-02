import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  title: 'Is there another person who has parental responsibility for the child?',
  one: 'Yes',
  two: 'No',
  errors: {
    otherParentExists: {
      required: 'Select whether there is another person who has parental responsibility for the child',
    },
  },
});

const cy: typeof en = () => ({
  section: SECTION_IN_WELSH,
  title: 'A oes unigolyn arall sydd â chyfrifoldeb rhiant dros y plentyn?',
  one: 'Ydw',
  two: 'Nac ydw',
  errors: {
    otherParentExists: {
      required: 'Nodwch a oes unigolyn arall sydd â chyfrifoldeb rhiant dros y plentyn',
    },
  },
});

export const form: FormContent = {
  fields: {
    otherParentExists: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      labelHidden: true,
      values: [
        { label: l => l.one, value: YesOrNo.YES },
        { label: l => l.two, value: YesOrNo.NO },
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
