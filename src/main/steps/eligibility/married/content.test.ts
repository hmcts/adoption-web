import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

describe('eligibility content', () => {
  const commonContent = { language: 'en', eligibility: { marriedEligible: 'yes' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual('Has the child ever been married or in a civil partnership?');
  });

  test('should return correct welsh content', () => {
    commonContent.language = 'cy';
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual('Has the child ever been married or in a civil partnership? (in welsh)');
  });
});
