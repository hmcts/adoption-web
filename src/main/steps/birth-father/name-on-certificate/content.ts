import { YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: "Birth father's details",
  title: "Is the birth father's name on the birth certificate?",
  errors: {
    birthFatherNameOnCertificate: {
      required: 'Select whether the birth father’s name is on the birth certificate',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Manylion y tad biolegol',
  title: 'A yw enw’r tad biolegol ar y dystysgrif geni?',
  errors: {
    birthFatherNameOnCertificate: {
      required: 'Nodwch a yw enw’r tad biolegol yw ar y dystysgrif geni',
    },
  },
});

export const form: FormContent = {
  fields: {
    birthFatherNameOnCertificate: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesNoNotsure.YES },
        { label: l => l.no, value: YesNoNotsure.NO },
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
