import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

describe('eligibility > cannot-apply > content', () => {
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
    expect(generatedContent.title).toEqual('Ni allwch wneud cais i fabwysiadu');
    expect(generatedContent.section).toEqual('Gwiriwch eich bod yn gymwys i fabwysiadu');
    expect(generatedContent.line1).toEqual(
      'Ni allwch wneud cais i fabwysiadu’r plentyn oherwydd ei fod yn 18 oed neu’n hŷn.'
    );
    expect(generatedContent.line2).toEqual('Mwy o wybodaeth am fabwysiadu');
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
      "Ni allwch wneud cais i fabwysiadu'r plentyn oherwydd ei fod wedi bod yn briod neu mewn partneriaeth sifil."
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
      'Ni allwch wneud cais i fabwysiadu’r plentyn nes eich bod chi, a’r ymgeisydd arall os yw’n berthnasol, wedi bod yn byw yn y DU, Ynysoedd y Sianel neu Ynys Manaw am o leiaf 12 mis.'
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
      'Ni allwch wneud cais i fabwysiadu’r plentyn nes eich bod chi, a’ch partner os yw’n berthnasol, yn 21 oed.'
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
