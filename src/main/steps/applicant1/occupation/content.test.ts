import { CommonContent } from '../../common/common.content';

import { cy, en, generateContent } from './content';

const cyContent = cy();
const enContent = en();

describe('occupation content', () => {
  it('should return the correct content for language = en', () => {
    const generatedContent = generateContent({ language: 'en', userCase: {} } as CommonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.section).toEqual(enContent.section);
  });

  it('should return the correct content for language = cy', () => {
    const generatedContent = generateContent({ language: 'cy', userCase: {} } as CommonContent);
    expect(generatedContent.section).toEqual(cyContent.section);
  });
});
