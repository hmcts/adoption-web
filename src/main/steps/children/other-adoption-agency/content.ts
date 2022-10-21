import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: 'Application details',
  title: 'Is there another adoption agency or local authority involved?',
  hint: 'This would be separate from your local authority, for example it could be a private agency or a different local authority.',
  errors: {
    hasAnotherAdopAgencyOrLA: {
      required: 'Please answer the question',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y cais',
  title: 'A oes asiantaeth fabwysiadu neu awdurdod lleol arall yn gysylltiedig â’r achos?',
  hint: "Byddai hyn ar wahân i'ch awdurdod lleol, er enghraifft gallai fod yn asiantaeth breifat neu'n awdurdod lleol gwahanol.",
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
      label: l => l.title,
      hint: l => l.hint,
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
