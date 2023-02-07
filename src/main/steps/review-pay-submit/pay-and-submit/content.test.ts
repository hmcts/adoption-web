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
    "If you're applying for more than one child, you must submit a new application for each child. You will not be charged if you submit these before midnight on the day of your first application. If you submit after the day of the first application, you will be charged another £183. You must sign in using the same email address and password used in your first application.",
  line3: 'A confirmation email of your payment will be sent to you.',
  payandsubmit: 'Pay and submit application',
};

const cyContent = {
  section: '',
  title: '',
  line1: '',
  line2: '',
  line3: '',
  payandsubmit: '',
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
