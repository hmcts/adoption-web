import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = {
  title: 'Adoption',
  sendUsAMessageHeading: 'Send us a message',
  email: 'Email: <a href="mailto:adoptionproject@justice.gov.uk" class="govuk-link">adoptionproject@justice.gov.uk</a>',
  sendUsAMessageText: 'We aim to get back to you within 5 working days',
  telephoneHeading: 'Telephone',
  telephoneNumber: 'Telephone: 01634 887900',
  telephoneText: 'Monday to Friday 9am to 5pm',
};

const cy: typeof en = {
  title: 'Mabwysiadu',
  sendUsAMessageHeading: 'Anfonwch neges atom',
  email:
    'E-bost: <a href="mailto:ymholiadaucymraeg@justice.gov.uk" class="govuk-link">ymholiadaucymraeg@justice.gov.uk</a>',
  sendUsAMessageText: 'Byddwn yn anelu at ymateb o fewn 5 diwrnod gwaith.',
  telephoneHeading: 'Rhif ffôn',
  telephoneNumber: 'Rhif ffôn: 01634 887900',
  telephoneText: 'Dydd Llun i dydd Gwener 9am i 5pm',
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
