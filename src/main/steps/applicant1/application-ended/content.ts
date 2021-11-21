import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = {
  title: 'This joint application has ended',
  line1:
    'You cannot access this joint application because it has been ended by either you or the other applicant.' +
    ' You can contact them and ask them why, if it’s safe to do so.',
  line2: 'Either of you can submit a new application, if you want to.',
  exitLink: 'Exit service',
};

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
