import { TranslationFn } from '../../../app/controller/GetController';
import { generateContent as applicant1GenerateContent } from '../../applicant1/apply-for-help-with-fees/content';
import { CommonContent } from '../../common/common.content';
import { APPLICANT_2, HELP_WITH_YOUR_FEE_URL } from '../../urls';

const labels = ({ isDivorce }: CommonContent) => ({
  title: `You need to apply for help with your ${isDivorce ? 'divorce fees' : 'fees to end your civil partnership'}`,
  line4: `If you have a Help With Fees reference number then you can <a class="govuk-link" href="${APPLICANT_2}${HELP_WITH_YOUR_FEE_URL}">enter it here.</a>`,
});

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    ...labels(content),
  };
};
