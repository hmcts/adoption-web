import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = () => ({
  title: 'Check your answers',
  line1: 'This page will be updated soon with information filled so far.',
  line2: 'For now you can test Fee and Pay integration to pay the adoption application fee using online card payment.',
  continue: 'Pay and submit application',
});

const cyContent = () => ({
  title: 'Check your answers (in welsh)',
  line1: 'This page will be updated soon with information filled so far. (in welsh)',
  line2:
    'For now you can test Fee and Pay integration to pay the adoption application fee using online card payment. (in welsh)',
  continue: 'Pay and submit application (in welsh)',
});

describe('check-your-answer >  content', () => {
  const commonContent = {
    language: 'en',
    userCase: {},
  } as CommonContent;

  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    const content = enContent();
    expect(generatedContent.title).toEqual(content.title);
    expect(generatedContent.line1).toEqual(content.line1);
    expect(generatedContent.line2).toEqual(content.line2);
    expect(generatedContent.continue).toEqual(content.continue);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    const content = cyContent();
    expect(generatedContent.title).toEqual(content.title);
    expect(generatedContent.line1).toEqual(content.line1);
    expect(generatedContent.line2).toEqual(content.line2);
    expect(generatedContent.continue).toEqual(content.continue);
  });
});
