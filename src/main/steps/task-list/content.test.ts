import { CommonContent } from '../common/common.content';

import { generateContent } from './content';

describe('task-list content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual('Apply to adopt a child placed in your care');
  });

  test('should return correct welsh content', () => {
    commonContent.language = 'cy';
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual('Apply to adopt a child placed in your care (in welsh) ');
  });
});
