import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

describe('eligibility content', () => {
  const commonContent = { language: 'en', eligibility: { under21Eligible: 'yes' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual('Are you, and the other applicant if relevant, both aged 21 or over?');
  });

  test('should return correct welsh content', () => {
    commonContent.language = 'cy';
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual(
      'Are you, and the other applicant if relevant, both aged 21 or over? (in welsh)'
    );
  });
});
