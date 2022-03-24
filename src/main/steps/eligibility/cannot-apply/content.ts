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
      ? 'Ni allwch wneud cais i fabwysiadu the child because they’re 18 neu over.'
      : content.eligibility.marriedEligible === YesOrNo.YES
      ? "Ni allwch wneud cais i fabwysiadu the child because they've been married neu in a partneriaeth sifil."
      : content.eligibility.livedUKEligible === YesOrNo.NO
      ? 'Ni allwch wneud cais i fabwysiadu the child until you, and the other applicant if relevant, have been living in the UK, Channel Islands neu Isle of Man ar gyfer at least 12 months.'
      : content.eligibility.under21Eligible === YesOrNo.NO
      ? 'Ni allwch wneud cais i fabwysiadu the child until you, and your partner if applicable, are 21.'
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
