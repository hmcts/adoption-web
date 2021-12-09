import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

describe('eligibility content', () => {
  const commonContent = { language: 'en', eligibility: { under18Eligible: 'yes' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual(
      'Will the child be under 18 years old on the date you submit your application?'
    );
  });

  test('should return correct welsh content', () => {
    commonContent.language = 'cy';
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual(
      'Will the child be under 18 years old on the date you submit your application? (in welsh)'
    );
  });
});
