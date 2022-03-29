import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';

const en = content => ({
  section: "Check you're eligible to adopt",
  title: 'You cannot apply to adopt',
  line1: `${
    content.eligibility.under18Eligible === YesOrNo.NO
      ? 'You cannot apply to adopt the child because they’re 18 or over.'
      : content.eligibility.marriedEligible === YesOrNo.YES
      ? "You cannot apply to adopt the child because they've been married or in a civil partnership."
      : content.eligibility.livedUKEligible === YesOrNo.NO
      ? 'You cannot apply to adopt the child until you, and the other applicant if relevant, have been living in the UK, Channel Islands or Isle of Man for at least 12 months.'
      : content.eligibility.under21Eligible === YesOrNo.NO
      ? 'You cannot apply to adopt the child until you, and your partner if applicable, are 21.'
      : ''
  }`,
  line2: 'More about adoption',
});

const cy = content => ({
  section: 'Gwiriwch eich bod yn gymwys i fabwysiadu',
  title: 'Ni allwch wneud cais i fabwysiadu',
  line1: `${
    content.eligibility.under18Eligible === YesOrNo.NO
      ? 'Ni allwch wneud cais i fabwysiadu’r plentyn oherwydd ei fod yn 18 oed neu’n hŷn.'
      : content.eligibility.marriedEligible === YesOrNo.YES
      ? "Ni allwch wneud cais i fabwysiadu'r plentyn oherwydd ei fod wedi bod yn briod neu mewn partneriaeth sifil."
      : content.eligibility.livedUKEligible === YesOrNo.NO
      ? 'Ni allwch wneud cais i fabwysiadu’r plentyn nes eich bod chi, a’r ymgeisydd arall os yw’n berthnasol, wedi bod yn byw yn y DU, Ynysoedd y Sianel neu Ynys Manaw am o leiaf 12 mis.'
      : content.eligibility.under21Eligible === YesOrNo.NO
      ? 'Ni allwch wneud cais i fabwysiadu’r plentyn nes eich bod chi, a’ch partner os yw’n berthnasol, yn 21 oed.'
      : ''
  }`,
  line2: 'Mwy o wybodaeth am fabwysiadu',
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
