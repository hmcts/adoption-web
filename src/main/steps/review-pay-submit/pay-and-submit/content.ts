import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  section: 'Review your application',
  title: 'Pay and submit',
  line1:
    'You will be taken to the payment page. Your application will be submitted to the local authority and they will be asked to progress it. You cannot edit the application once it has been submitted.',
  line2:
    "If you're applying for more than one child, you must submit a new application for each child. You will not be charged if you submit these before midnight on the day of your first application. If you submit after the day of the first application, you will be charged another £183. You must sign in using the same email address and password used in your first application.",
  line3: 'A confirmation email of your payment will be sent to you.',
  payandsubmit: 'Pay and submit application',
});

const cy: typeof en = () => ({
  section: '',
  title: '',
  line1: '',
  line2: '',
  line3: '',
  payandsubmit: '',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
