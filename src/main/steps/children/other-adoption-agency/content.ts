import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: 'Your adoption agency or local authority details',
  title: 'Was there another adoption agency or local authority involved in placing the child?',
  yes: 'Yes',
  no: 'No',
  errors: {
    hasAnotherAdopAgencyOrLA: {
      required: 'Please answer the question',
    },
  },
});

const cy = () => ({
  section: 'Your adoption agency or local authority details (in Welsh)',
  title: 'Was there another adoption agency or local authority involved in placing the child? (in Welsh)',
  yes: 'Yes (in Welsh)',
  no: 'No (in Welsh)',
  errors: {
    hasAnotherAdopAgencyOrLA: {
      required: 'Please answer the question (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    hasAnotherAdopAgencyOrLA: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
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
