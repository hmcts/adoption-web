import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'There is a problem',
  line1: 'Some of the information you have given does not match what is stored in our records.',
  line2: 'You should select the back link and check that spellings, dates and numbers are correct.',
  line3:
    'If this error comes up after you have checked all your details then there might be a problem with the information provided by the applicants. In that case you should contact the caseworker:',
  contactInformation: 'Contact: Name of service, eg CTSC',
  telephoneNumber: 'Telephone: Telephone number',
  emailAddress: 'Email: Email address',
  openingHours: 'Monday to Friday, 9am to 5pm',
  contactUs: 'Contact us for help',
};

const cyContent = {
  title: 'There is a problem (in welsh)',
  line1: 'Some of the information you have given does not match what is stored in our records. (in welsh)',
  line2: 'You should select the back link and check that spellings, dates and numbers are correct. (in welsh)',
  line3:
    'If this error comes up after you have checked all your details then there might be a problem with the information provided by the applicants. In that case you should contact the caseworker: (in welsh)',
  contactInformation: 'Contact: Name of service, eg CTSC (in welsh)',
  telephoneNumber: 'Telephone: Telephone number (in welsh)',
  emailAddress: 'Email: Email address (in welsh)',
  openingHours: 'Monday to Friday, 9am to 5pm (in welsh)',
  contactUs: 'Contact us for help (in welsh)',
};

describe('application-submmitted > content', () => {
  const commonContent = { language: 'en', userCase: { hyphenatedCaseRef: '1234567890123456' } } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
