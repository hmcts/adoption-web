import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  label: 'Is there another adoption agency or local authority involved?',
  line1:
    'This would be separate from your local authority, for example it could be a private agency or a different local authority.',
  errors: {
    hasAnotherAdopAgencyOrLA: {
      required: 'Please answer the question',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Application details. (in welsh)',
  label: 'Is there another adoption agency or local authority involved?. (in welsh)',
  line1:
    'This would be separate from your local authority, for example it could be a private agency or a different local authority. (in welsh)',
  errors: {
    hasAnotherAdopAgencyOrLA: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
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
