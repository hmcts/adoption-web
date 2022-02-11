import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = () => ({
  section: 'Review your application, pay and send',
  title: 'Check your answers',
  continue: 'Continue',
});

const cyContent = () => ({
  section: 'Review your application, pay and send (in welsh)',
  title: 'Check your answers (in welsh)',
  continue: 'Continue (in welsh)',
});

describe('check-your-answer > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {},
  } as CommonContent;

  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    const content = enContent();
    expect(generatedContent.section).toEqual(content.section);
    expect(generatedContent.title).toEqual(content.title);
    expect(generatedContent.continue).toEqual(content.continue);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    const content = cyContent();
    expect(generatedContent.section).toEqual(content.section);
    expect(generatedContent.title).toEqual(content.title);
    expect(generatedContent.continue).toEqual(content.continue);
  });
});
