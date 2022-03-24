import { YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const en = () => ({
  section: SECTION,
  label: "Is there a court order in place for any of the child's siblings or half siblings?",
  hint: 'For example, a care order or supervision order. Your adoption agency or social worker can help provide these details.',
  errors: {
    hasPoForSiblings: {
      required: 'Please answer the question',
    },
  },
});

const cy = () => ({
  section: SECTION_IN_WELSH,
  label:
    'A oes gorchymyn llys mewn lle ar gyfer unrhyw un o frodyr/chwiorydd neu hanner frodyr/hanner chwiorydd y plentyn?',
  hint: 'Er enghraifft, gorchymyn gofal neu neuchymyn goruchwylio. Gall eich asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol eich helpu i lenwi’r rhan hon.',
  errors: {
    hasPoForSiblings: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
});

export const form: FormContent = {
  fields: {
    hasPoForSiblings: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [
        { label: l => l.yes, value: YesNoNotsure.YES },
        { label: l => l.no, value: YesNoNotsure.NO },
        { label: l => l.notSure, value: YesNoNotsure.NOT_SURE },
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
