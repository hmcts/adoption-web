import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

describe('cannot-apply content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent, eligibility: { under18Eligible: 'No' } });
    expect(generatedContent.title).toEqual('You cannot apply to adopt');
    expect(generatedContent.section).toEqual("Check you're eligible to adopt");
    expect(generatedContent.line1).toEqual('You cannot apply to adopt the child because they’re 18 or over.');
    expect(generatedContent.line2).toEqual('More about adoption');
  });

  test("should return correct welsh content for cannot adopt page because they're 18 or over", () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: 'cy',
      eligibility: { under18Eligible: 'No' },
    });
    expect(generatedContent.title).toEqual('You cannot apply to adopt (in welsh)');
    expect(generatedContent.section).toEqual("Check you're eligible to adopt (in welsh)");
    expect(generatedContent.line1).toEqual(
      'You cannot apply to adopt the child because they’re 18 or over. (in welsh)'
    );
    expect(generatedContent.line2).toEqual('More about adoption (in welsh)');
  });

  test('should return correct string for cannot apply due to married status', () => {
    const generatedContent = generateContent({ ...commonContent, eligibility: { marriedEligible: 'Yes' } });
    expect(generatedContent.line1).toEqual(
      "You cannot apply to adopt the child because they've been married or in a civil partnership."
    );
    const welshGeneratedContent = generateContent({
      ...commonContent,
      language: 'cy',
      eligibility: { marriedEligible: 'Yes' },
    });
    expect(welshGeneratedContent.line1).toEqual(
      "You cannot apply to adopt the child because they've been married or in a civil partnership. (in welsh)"
    );
  });

  test('should return correct string for cannot apply due to not having lived in UK for required time', () => {
    const generatedContent = generateContent({ ...commonContent, eligibility: { livedUKEligible: 'No' } });
    expect(generatedContent.line1).toEqual(
      'You cannot apply to adopt the child until you, and the other applicant if relevant, have been living in the UK, Channel Islands or Isle of Man for at least 12 months.'
    );
    const welshGeneratedContent = generateContent({
      ...commonContent,
      language: 'cy',
      eligibility: { livedUKEligible: 'No' },
    });
    expect(welshGeneratedContent.line1).toEqual(
      'You cannot apply to adopt the child until you, and the other applicant if relevant, have been living in the UK, Channel Islands or Isle of Man for at least 12 months. (in welsh)'
    );
  });

  test('should return correct string due to being under 21', () => {
    const generatedContent = generateContent({ ...commonContent, eligibility: { under21Eligible: 'No' } });
    expect(generatedContent.line1).toEqual(
      'You cannot apply to adopt the child until you, and your partner if applicable, are 21.'
    );
    const welshGeneratedContent = generateContent({
      ...commonContent,
      language: 'cy',
      eligibility: { under21Eligible: 'No' },
    });
    expect(welshGeneratedContent.line1).toEqual(
      'You cannot apply to adopt the child until you, and your partner if applicable, are 21. (in welsh)'
    );
  });

  test('should return empty string if none of the conditions are met', () => {
    const generatedContent = generateContent({ ...commonContent, eligibility: {} });
    expect(generatedContent.line1).toEqual('');
    const welshGeneratedContent = generateContent({
      ...commonContent,
      language: 'cy',
      eligibility: {},
    });
    expect(welshGeneratedContent.line1).toEqual('');
  });
});
