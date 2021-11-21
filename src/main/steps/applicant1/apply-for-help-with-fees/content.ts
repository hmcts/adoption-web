import { TranslationFn } from '../../../app/controller/GetController';
import { HELP_WITH_YOUR_FEE_URL } from '../../urls';

const en = ({ isDivorce, isJointApplication, partner }) => ({
  title: `You need to apply for help with your ${isDivorce ? 'divorce' : ''} fees`,
  line1: `Your need to apply for <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">help with your fees (opens in new tab)</a> before you continue with this ${
    isDivorce ? 'divorce' : 'ending a civil partnership'
  } application. `,
  line2:
    'Enter the court form number ‘D8’ when asked. This will be one of the first questions when you <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">apply for help with your fees (opens in new tab)</a>.',
  line3: `After you have applied then you will receive a Help With Fees reference number. You should enter the reference number when you return to this ${
    isDivorce ? 'divorce' : 'ending a civil partnership'
  } application. ${
    isJointApplication
      ? `Your ${partner} will also need to apply for Help With Fees separately and enter their own reference number later in the application.`
      : ''
  }`,
  line4: `If you have a Help With Fees reference number then you can <a class="govuk-link" href="${HELP_WITH_YOUR_FEE_URL}">enter it here.</a>`,
});

const cy: typeof en = ({ isDivorce, isJointApplication, partner }) => ({
  ...en({ isDivorce, isJointApplication, partner }),
  title: `Mae arnoch angen gwneud cais am help i dalu eich ffioedd ${isDivorce ? 'ysgaru' : ''}`,
  line1: `Mae arnoch angen gwneud cais am <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">help i dalu eich ffioedd (agor mewn ffenest newydd)</a> cyn ichi barhau gyda'r cais hwn ${
    isDivorce ? 'i gael ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
  }.`,
  line2:
    'Nodwch y rhif ffurflen llys \'D8\' pan ofynnir amdano. Dyma fydd un o\'r cwestiynau cyntaf pan fyddwch yn <a href="https://www.gov.uk/get-help-with-court-fees" class="govuk-link" target="_blank">gwneud cais am help i dalu eich ffioedd (agor mewn ffenest newydd)</a>.',
  line3: `Ar ôl ichi wneud cais, fe gewch gyfeirnod Help i Dalu Ffioedd. Dylech nodi'r cyfeirnod pan fyddwch yn dychwelyd at y cais hwn ${
    isDivorce ? 'i gael ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
  }.`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
