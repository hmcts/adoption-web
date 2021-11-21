import { TranslationFn } from '../../../app/controller/GetController';

const en = ({ isDivorce }) => ({
  title: isDivorce ? 'You cannot apply to get a divorce' : 'You cannot apply to end your civil partnership',
  line1: `Your ${isDivorce ? 'marriage' : 'relationship'} must have irretrievably broken down
      for you to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}. This is the law in England and Wales.`,
  line2: `If you are not sure about ${isDivorce ? 'getting a divorce' : 'ending your civil partnership'},
      you may want to consider relationship advice or counselling. This is available from private therapists and charities like <a href="https://www.relate.org.uk" class="govuk-link" target="_blank">Relate</a>.`,
});

const cy: typeof en = ({ isDivorce }) => ({
  title: `Ni allwch wneud cais i ${isDivorce ? 'gael ysgariad' : 'ddod â’ch partneriaeth sifil i ben'}`,
  line1: `Rhaid bod eich ${isDivorce ? 'priodas' : 'perthynas'} wedi chwalu'n gyfan gwbl i chi allu ${
    isDivorce ? 'cael ysgariad' : "dod â'ch partneriaeth sifil i ben"
  }. Dyma yw'r gyfraith yng Nghymru a Lloegr.`,
  line2: `Os nad ydych yn siŵr am ${
    isDivorce ? 'gael ysgariad' : "ddod â'ch partneriaeth sifil i ben"
  }, efallai yr hoffech ystyried cael cyngor ynghylch eich perthynas neu gwnsela. Mae hwn ar gael gan therapyddion preifat ac elusennau fel <a href="https://www.relate.org.uk" class="govuk-link" target="_blank">Relate</a>.`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
