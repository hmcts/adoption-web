import { TranslationFn } from '../../../app/controller/GetController';

const en = ({ partner }) => ({
  title: `Your comments have been sent to your ${partner}`,
  line1: `Your ${partner} has been sent an email telling them you believe some of the information in the joint application is incorrect. They will be able to see your comments. When they have changed the information then it will be sent back to you for review.`,
  line2: 'Your joint application cannot be submitted until you both agree on the information.',
});

const cy: typeof en = en;

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
