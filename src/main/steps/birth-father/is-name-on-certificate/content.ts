import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { SECTION, SECTION_IN_WELSH } from '../constants';

export const en = (): Record<string, unknown> => ({
  section: SECTION,
  title: "Is the birth father's name on the birth certificate?",
  hint: "Ask the adoption agency or social worker if you're not sure.",
  yes: 'Yes',
  no: 'No',
  errors: {
    isFathersNameOnCertificate: {
      required: 'Please answer the question',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: SECTION_IN_WELSH,
  title: "Is the birth father's name on the birth certificate? (in Welsh)",
  hint: "Ask the adoption agency or social worker if you're not sure. (in Welsh)",
  yes: 'Yes (in Welsh)',
  no: 'No (in Welsh)',
  errors: {
    isFathersNameOnCertificate: {
      required: 'Please answer the question (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    isFathersNameOnCertificate: {
      type: 'radios',
      hint: l => l.hint,
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

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](),
  form,
});
