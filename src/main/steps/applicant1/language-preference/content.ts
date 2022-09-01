import { ApplyingWith, LanguagePreference } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';

const en = ({ userCase }: CommonContent) => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Applicant' : 'First applicant';
  return {
    section,
    label: 'What language do you want to receive emails and documents in?',
    errors: {
      applicant1LanguagePreference: {
        required: 'Please answer the question',
      },
    },
  };
};

const cy: typeof en = ({ userCase }: CommonContent) => {
  const section = userCase?.applyingWith === ApplyingWith.ALONE ? 'Ceisydd' : 'Ceisydd cyntaf';
  return {
    section,
    label: 'Ym mha iaith yr hoffech gael negeseuon e-bost a dogfennau?',
    errors: {
      applicant1LanguagePreference: {
        required: 'Atebwch y cwestiwn os gwelwch yn dda',
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1LanguagePreference: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        { label: l => l.english, value: LanguagePreference.ENGLISH },
        { label: l => l.welsh, value: LanguagePreference.WELSH },
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};