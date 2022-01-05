import { YesNoUnsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

export const en = (): Record<string, unknown> => ({
  section: SECTION,
  title: "Is the child's birth father still alive?",
  yes: 'Yes',
  no: 'No',
  unsure: 'Not sure',
  errors: {
    isFatherStillAlive: {
      required: 'Please answer the question',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: SECTION_IN_WELSH,
  title: "Is the child's birth father still alive? (in Welsh)",
  yes: 'Yes (in Welsh)',
  no: 'No (in Welsh)',
  unsure: 'Not sure (in Welsh)',
  errors: {
    isFatherStillAlive: {
      required: 'Please answer the question (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    isFatherStillAlive: {
      type: 'radios',
      values: [
        { label: l => l.yes, value: YesNoUnsure.YES },
        { label: l => l.no, value: YesNoUnsure.NO },
        { label: l => l.unsure, value: YesNoUnsure.UNSURE },
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

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](),
  form,
});
