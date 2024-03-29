import { LanguagePreference } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  section: 'Second applicant',
  title: 'What language do you want to receive emails and documents in?',
  errors: {
    applicant2LanguagePreference: {
      required: 'Select whether you want to receive emails and documents in English or Welsh',
    },
  },
});

const cy: typeof en = () => ({
  section: 'Ail geisydd',
  title: 'Ym mha iaith yr hoffech gael negeseuon e-bost a dogfennau?',
  errors: {
    applicant2LanguagePreference: {
      required: 'Dewiswch a ydych eisiau eich e-byst a’ch dogfennau yn Gymraeg neu’n Saesneg',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2LanguagePreference: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      section: l => l.section,
      labelHidden: true,
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
