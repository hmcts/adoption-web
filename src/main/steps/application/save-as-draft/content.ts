import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = content => ({
  title: 'Your application has been saved',
  multipleChildrenMessage: content.userCase.canPaymentIgnored
    ? 'You must submit any additional applications before midnight on the same day that you submitted your first application. This is to avoid additional application fees.'
    : '',
  continueApplication: 'Continue with your application',
  signOut: 'Sign out',
});

const cy: typeof en = content => ({
  title: 'Mae eich cais wedi cael ei gadw',
  multipleChildrenMessage: content.userCase.canPaymentIgnored
    ? 'Mae’n rhaid ichi gyflwyno unrhyw geisiadau ychwanegol cyn hanner nos ar yr un diwrnod y bu ichi gyflwyno eich cais cyntaf. Rhaid gwneud hyn i beidio â gorfod talu ffioedd gwneud cais ychwanegol.'
    : '',
  continueApplication: 'Parhau gyda’ch cais',
  signOut: 'Allgofnodi',
});

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continueApplication,
  },
  saveAsDraft: {
    text: l => l.signOut,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](content),
  form,
});
