import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

describe('eligibility content', () => {
  const commonContent = { language: 'en', eligibility: { livedUKEligible: 'yes' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual(
      'Have you and any other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for at least 12 months?'
    );
  });

  test('should return correct welsh content', () => {
    commonContent.language = 'cy';
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual(
      'Have you and any other applicant if relevant, lived in the UK, Channel Islands or Isle of Man for at least 12 months? (in welsh)'
    );
  });
});
