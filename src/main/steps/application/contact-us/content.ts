import { TranslationFn } from '../../../app/controller/GetController';

const en = {
  title: 'Adoption',
  sendUsAMessageHeading: 'Send us a message',
  email: 'Email: <a href="mailto:adoptionproject@justice.gov.uk" class="govuk-link">adoptionproject@justice.gov.uk</a>',
  sendUsAMessageText: 'We aim to get back to you within 5 working days',
  telephoneHeading: 'Telephone',
  telephoneNumber: 'Telephone: 01634 887900',
  telephoneText: 'Monday to Friday 9am to 5pm',
};

const cy: typeof en = {
  title: 'Mabwysiadu',
  sendUsAMessageHeading: 'Anfonwch neges atom',
  email:
    'E-bost: <a href="mailto:ymholiadaucymraeg@justice.gov.uk" class="govuk-link">ymholiadaucymraeg@justice.gov.uk</a>',
  sendUsAMessageText: 'Byddwn yn anelu at ymateb o fewn 5 diwrnod gwaith.',
  telephoneHeading: 'Rhif ffôn',
  telephoneNumber: 'Rhif ffôn: 01634 887900',
  telephoneText: 'Dydd Llun i ddydd Iau 9am - 5pm',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
