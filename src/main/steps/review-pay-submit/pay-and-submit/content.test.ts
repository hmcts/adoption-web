import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Review your application',
  title: 'Pay and submit',
  line1:
    'You will be taken to the payment page. Your application will be submitted to the local authority and they will be asked to progress it. You cannot edit the application once it has been submitted.',
  line2:
    "If you're applying for more than one child, you must submit a new application for each child. You will not be charged if you submit these before midnight on the day of your first application. If you submit after the day of the first application, you will be charged another £undefined. You must sign in using the same email address and password used in your first application.",
  line3: 'A confirmation email of your payment will be sent to you.',
  payandsubmit: 'Pay and submit application',
};

const cyContent = {
  section: 'Adolygu eich cais',
  title: 'Talu a chyflwyno',
  line1:
    'Byddwch yn cael eich ailgyfeirio i’r dudalen talu. Fe gyflwynir eich cais i’r awdurdod lleol ac fe ofynnir iddynt ei brosesu ymhellach. Ni allwch olygu’r cais unwaith y bydd wedi’i gyflwyno.',
  line2:
    'Os ydych chi’n gwneud cais i fabwysiadu mwy nag un plentyn, mae’n rhaid i chi gyflwyno cais newydd ar gyfer pob plentyn. Ni chodir ffi arall arnoch os byddwch yn cyflwyno’r ceisiadau hyn cyn hanner nos ar ddyddiad cyflwyno’ch cais cyntaf. Os byddwch yn eu cyflwyno ar ôl dyddiad cyflwyno’r cais cyntaf, yna bydd rhaid i chi dalu £undefined arall. Mae’n rhaid ichi fewngofnodi gan ddefnyddio’r un cyfeiriad e-bost a chyfrinair a ddefnyddiwyd ar gyfer eich cais cyntaf.',
  line3: 'Fe anfonir e-bost cadarnhau ar gyfer eich taliad atoch.',
  payandsubmit: 'Talu a chyflwyno cais',
};

const commonContent = { language: 'en' } as CommonContent;

describe('review-pay-submit > pay-and-submit > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
