import { TranslationFn } from '../../../app/controller/GetController';

const en = {
  title: 'Adoption',
  sendUsAMessageHeading: 'Contact a court that deals with adoption',
  findCourtTribunalDetails:
    'Use the <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">Find a Court or Tribunal service</a> ' +
    ' to locate your nearest court that deals with adoption. This may not be the same court that made your placement order.',
  askIfUnsure: 'If you are still unsure which court to contact, you can ask your social worker for help.',
  email: 'Email: <a href="mailto:adoptionproject@justice.gov.uk" class="govuk-link">adoptionproject@justice.gov.uk</a>',
  sendUsAMessageText: 'We aim to get back to you within 5 working days',
  telephoneHeading: 'Telephone',
  telephoneNumber: 'Telephone: 01634 887900',
  telephoneText: 'Monday to Friday 9am to 5pm',
};

const cy: typeof en = {
  title: 'Mabwysiadu',
  sendUsAMessageHeading: 'Anfonwch neges atom',
  findCourtTribunalDetails:
    'Use the <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">Find a Court or Tribunal service</a> ' +
    ' to locate your nearest court that deals with adoption. This may not be the same court that made your placement order.',
  askIfUnsure: 'If you are still unsure which court to contact, you can ask your social worker for help.',
  email:
    'E-bost: <a href="mailto:ymholiadaucymraeg@justice.gov.uk" class="govuk-link">ymholiadaucymraeg@justice.gov.uk</a>',
  sendUsAMessageText: 'Byddwn yn anelu at ymateb o fewn 5 diwrnod gwaith.',
  telephoneHeading: 'Rhif ffôn',
  telephoneNumber: 'Rhif ffôn: 03003035171',
  telephoneText: 'Dydd Llun i ddydd Iau 9am - 5pm',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
