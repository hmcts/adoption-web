import { TranslationFn } from '../../../app/controller/GetController';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce }: CommonContent) => ({
  title: `You may not be able to ${isDivorce ? 'get a divorce' : 'end your civil partnership'} in England and Wales`,
  line1: `Your answers indicate that the courts of England and Wales do not have the legal power (jurisdiction) to ${
    isDivorce ? 'grant you a divorce' : 'end your civil partnership'
  }.`,
  checkJurisdictionAgain: 'Check how you’re legally connected to England or Wales again',
  exitService: 'Exit this service',
});

const cy: typeof en = ({ isDivorce }: CommonContent) => ({
  title: `Mae'n bosib na fyddwch yn gallu ${
    isDivorce ? 'cael ysgariad' : "dod â'ch partneriaeth sifil i ben"
  } yng Nghymru a Lloegr`,
  line1: `Dengys eich atebion nad oes gan lysoedd Cymru a Lloegr y pŵer cyfreithiol (awdurdodaeth) i roi caniatâd ichi ${
    isDivorce ? 'gael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
  }.`,
  checkJurisdictionAgain: 'Gwiriwch eich cysylltiadau cyfreithiol â Chymru neu Loegr eto',
  exitService: 'Gadael y gwasanaeth hwn',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
  };
};
