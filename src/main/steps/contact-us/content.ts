import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Adoption',
  email: 'Email',
  emailAddress:
    'Email us at <a href="mailto:adoptionproject@justice.gov.uk" class="govuk-link">adoptionproject@justice.gov.uk.</a>',
};

const cy: typeof en = {
  title: 'Adoption (in Welsh)',
  email: 'Email (in Welsh)',
  emailAddress:
    'Email us at <a href="mailto:adoptionproject@justice.gov.uk" class="govuk-link">adoptionproject@justice.gov.uk.</a> (in Welsh)',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
