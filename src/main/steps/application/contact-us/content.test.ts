import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = {
  title: 'Adoption',
  sendUsAMessageHeading: 'Contact a court that deals with adoption',
  findCourtTribunalDetails:
    'Use the <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">Find a Court or Tribunal service</a>' +
    ' to locate your nearest court that deals with adoption. This may not be the same court that made your placement order.',
  findCourtTribunalDetailsLA:
    'Use the <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">Find a Court or Tribunal service</a>' +
    ' to locate your nearest court that deals with adoption.',
  askIfUnsure: 'If you are still unsure which court to contact, you can ask your social worker for help.',
  email: 'Email: <a href="mailto:adoptionproject@justice.gov.uk" class="govuk-link">adoptionproject@justice.gov.uk</a>',
  sendUsAMessageText: 'We aim to get back to you within 5 working days',
  telephoneHeading: 'Telephone',
  telephoneNumber: 'Telephone: 01634 887900',
  telephoneText: 'Monday to Friday 9am to 5pm',
};

const cy: typeof en = {
  title: 'Mabwysiadu',
  sendUsAMessageHeading: 'Anfonwch neges atom',
  findCourtTribunalDetails:
    'Defnyddiwch y <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">gwasanaeth Dod o hyd i lys neu dribiwnlys</a>' +
    ' i ddod o hyd i’ch llys agosaf sy’n delio â mabwysiadu. Efallai nad hwn yw’r un llys a wnaeth eich gorchymyn lleoli.',
  findCourtTribunalDetailsLA:
    'Defnyddiwch y <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">gwasanaeth Dod o hyd i lys neu dribiwnlys</a>' +
    ' i ddod o hyd i’ch llys agosaf sy’n delio â mabwysiadu.',
  askIfUnsure:
    'Os ydych yn dal yn ansicr pa lys i gysylltu ag ef, gallwch ofyn i’ch gweithiwr cymdeithasol am gymorth.',
  email:
    'E-bost: <a href="mailto:ymholiadaucymraeg@justice.gov.uk" class="govuk-link">ymholiadaucymraeg@justice.gov.uk</a>',
  sendUsAMessageText: 'Byddwn yn anelu at ymateb o fewn 5 diwrnod gwaith.',
  telephoneHeading: 'Rhif ffôn',
  telephoneNumber: 'Rhif ffôn: 03003035171',
  telephoneText: 'Dydd Llun i ddydd Iau 9am - 5pm',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('contact-us > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
