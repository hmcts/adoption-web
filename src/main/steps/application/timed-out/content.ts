import { TranslationFn } from '../../../app/controller/GetController';

const en = content => ({
  title: 'You were signed out to protect your privacy',
  line1: 'Your application was inactive for more than 20 minutes so you were signed out.',
  line2: content.eligibilityPage ? '' : 'Your progress was saved.',
  signBackInAndContinue: 'Sign back in and continue',
});

const cy: typeof en = content => ({
  title: 'Rydych wedi cael eich allgofnodi i amddiffyn eich preifatrwydd.',
  line1: 'Roedd eich cais yn segur am fwy nac 20 munud felly rydych wedi cael eich allgofnodi.',
  line2: content.eligibilityPage ? '' : 'Cafodd eich cynnydd ei gadw.',
  signBackInAndContinue: 'Mewngofnodwch eto a pharhau',
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
