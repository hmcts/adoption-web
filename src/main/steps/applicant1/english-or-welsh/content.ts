import { LanguagePreference } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ required }) => ({
  title: 'What language do you want to receive emails and documents in?',
  errors: {
    applicant1EnglishOrWelsh: {
      required,
    },
  },
});

const cy = () => ({
  title: 'Ym mha iaith hoffech chi gael negeseuon e-bost a dogfennau?',
  errors: {
    applicant1EnglishOrWelsh: {
      required: 'Nid ydych wedi ateb y cwestiwn. Mae angen ichi ddewis ateb cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1EnglishOrWelsh: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.english, value: LanguagePreference.English },
        { label: l => l.welsh, value: LanguagePreference.Welsh },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
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
