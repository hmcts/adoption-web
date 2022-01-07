import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: 'Is there another person who has parental responsibility for the child?',
  hint: 'Apart from the birth mother and father. For example, a step parent.',
  one: 'Yes',
  two: 'No',
  errors: {
    otherParentExists: {
      required: 'Please answer the question',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  label: 'Is there another person who has parental responsibility for the child? (in welsh)',
  hint: 'Apart from the birth mother and father. For example, a step parent. (in welsh)',
  one: 'Yes (in welsh)',
  two: 'No (in welsh)',
  errors: {
    otherParentExists: {
      required: 'Please answer the question (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    otherParentExists: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      labelHidden: false,
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
