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
      : 'some other error'
  }`,
});

const cy = content => ({
  section: "Check you're eligible to adopt (in welsh)",
  title: 'You cannot apply to adopt (in welsh)',
  line1: `${
    content.eligibility.under18Eligible === YesOrNo.NO
      ? 'You cannot apply to adopt the child because they’re 18 or over. (in welsh)'
      : content.eligibility.marriedEligible === YesOrNo.YES
      ? "You cannot apply to adopt the child because they've been married or in a civil partnership. (in welsh)"
      : 'some other error'
  }`,
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
