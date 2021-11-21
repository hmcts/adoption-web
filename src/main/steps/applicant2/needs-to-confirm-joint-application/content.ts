import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';

const en = ({ partner, userCase }: CommonContent) => ({
  title: `Your ${partner} needs to confirm your joint application`,
  line1: `Your ${partner} needs to confirm your joint application. They have been sent an email inviting them to review your combined answers and confirm the application. They should do this by `,
  reviewDate: userCase?.dueDate,
  line2: `When they have confirmed${
    userCase?.applicant1HelpPayingNeeded === YesOrNo.YES ? '' : ' and paid'
  }, then the application will be submitted.`,
});

// @TODO translations
const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => languages[content.language](content);
