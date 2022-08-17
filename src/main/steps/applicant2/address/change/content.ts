import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = () => ({
  section: 'Second applicant',
  label: 'Do you want to change the address for the other applicant?',
  errors: {
    changeAddressBothApplicants: {
      required: 'Please select an answer',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Second applicant (in welsh)',
  label: 'Do you want to change the address for the other applicant? (in welsh)',
  errors: {
    changeAddressBothApplicants: {
      required: 'Please select an answer (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    changeAddressBothApplicants: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
