import { TranslationFn } from '../../../app/controller/GetController';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const en = content => ({
  title: 'Applying for more than one child',
  line1:
    'If you are applying for more than one child, you will need to complete an application for each child in turn. Once you have submitted your first application, you can continue and start your next application.',
  line2: `You will only be charged one fee if you submit additional applications before midnight on the day you submit your first application. If you submit after the day of the first application, you will be charged another £${content.fee?.FeeAmount}.`,
  line3:
    'If you sign out, you must sign in again using the same email address and password used in your first application.',
  continue: 'Continue',
});

const cy: typeof en = content => ({
  title: 'Gwneud cais i fabwysiadu mwy nag un plentyn',
  line1:
    'Os ydych chi’n gwneud cais i fabwysiadu mwy nag un plentyn, bydd angen i chi gyflwyno cais newydd ar gyfer pob plentyn. Unwaith y byddwch wedi cyflwyno eich cais cyntaf, gallwch barhau a chychwyn eich cais nesaf.',
  line2: `Codir un ffi arnoch os byddwch yn cyflwyno unrhyw geisiadau ychwanegol cyn hanner nos ar ddyddiad cyflwyno’ch cais cyntaf.  Os byddwch yn eu cyflwyno ar ôl dyddiad cyflwyno’r cais cyntaf, yna bydd rhaid i chi dalu £${content.fee?.FeeAmount} arall.`,
  line3:
    'Os byddwch yn allgofnodi, bydd rhaid ichi fewngofnodi eto gan ddefnyddio’r un cyfeiriad e-bost a chyfrinair a ddefnyddiwyd ar gyfer eich cais cyntaf.',
  continue: 'Parhau',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
