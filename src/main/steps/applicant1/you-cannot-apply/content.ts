import { TranslationFn } from '../../../app/controller/GetController';

const en = ({ isDivorce }) => ({
  title: `You cannot apply ${isDivorce ? 'for a divorce' : 'to end your civil partnership'} in England or Wales`,
  line1: `Your answers indicate that the courts of England and Wales do not have the legal power (jurisdiction) to ${
    isDivorce ? 'grant you a divorce' : 'end your civil partnership'
  }.`,
});

const cy: typeof en = ({ isDivorce }) => ({
  ...en({ isDivorce }),
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
