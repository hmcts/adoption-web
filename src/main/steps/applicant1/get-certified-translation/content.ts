import { TranslationFn } from '../../../app/controller/GetController';

const en = ({ relationship }) => ({
  title: `You need to get a ‘certified translation’ of your ${relationship} certificate`,
  line1: `You need to get your ${relationship} certificate translated into English and certified. You can find translation companies online which also do certification as part of their service.`,
  line2: `When you have your translated and certified ${relationship} certificate then return to this application and continue. You will be asked to upload a photo of it later, or post it in.`,
  line3:
    'If you have a translated certificate that is not certified then you need to get it certified by a ‘notary public’. You can find a notary public through the <a href="https://www.thenotariessociety.org.uk/" class="govuk-link">Notaries Society</a> or the <a href="https://scrivener-notaries.org.uk/" class="govuk-link">Society of Scrivener Notaries</a>.',
});

const cy: typeof en = ({ relationship }) => ({
  ...en({ relationship }),
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const relationship = content.isDivorce ? 'marriage' : 'civil partnership';
  return languages[content.language]({ relationship });
};
