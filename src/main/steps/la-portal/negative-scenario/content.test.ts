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
  title: 'Mae yna broblem',
  line1:
    "Nid yw rhywfaint o'r wybodaeth rydych chi wedi'i rhoi yn cyd-fynd â'r hyn sydd wedi’i storio yn ein cofnodion.",
  line2: 'Dylech glicio ar y ddolen a gwirio bod y sillafiadau, y dyddiadau a’r rhifau yn gywir.',
  line3:
    "Os yw’r gwall hwn yn codi ar ôl i chi wirio eich holl fanylion, yna efallai bod problem gyda’r wybodaeth a ddarparwyd gan y ceiswyr. Yn yr achos hwnnw dylech gysylltu â'r gweithiwr achos:",
  contactInformation: 'Cyswllt: Enw’r gwasanaeth, e.e. CTSC',
  telephoneNumber: 'Rhif ffôn: Rhif ffôn',
  emailAddress: 'E-bost: Cyfeiriad e-bost',
  openingHours: 'Dydd Llun i ddydd Gwener, 9am i 5pm',
  contactUs: 'Cysylltwch â ni am help',
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
