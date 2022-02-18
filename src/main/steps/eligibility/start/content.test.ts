import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  title: 'Apply to adopt a child placed in your care',
  line1: "You can apply to adopt a child who's in your care following a court placement order.",
  line2:
    'The child must have lived with you for at least 10 weeks before you apply. You will not be able to submit your application until the 10 week period has passed.',
  line3:
    "You can start your application and save progress by selecting 'save as draft'. This will make sure your answers are saved so you can continue working on the application at a later date. You can only submit once all sections are completed.",
  heading1: 'Before you start',
  subheading1: 'Details about the child',
  line4: 'You will need some documents and information about the child:',
  bulletPoint1: "the child's full birth certificate (this includes details of the child's birth parents)",
  bulletPoint2: "details from the child's placement order",
  bulletPoint3: "the birth parents' names, addresses and occupations",
  bulletPoint4:
    "details of any previous court proceedings involving the child, or the child's siblings or half siblings",
  line5: 'Your social worker or adoption agency can help to provide these details.',
  subheading2: 'Details about you',
  line6:
    "You will need to provide details about yourself and any second applicant. Some of the information you provide is needed for the Adoption Register and adoption certificate which will replace the child's birth certificate. Your personal information will not affect your application to adopt.",
  line7: 'The information you provide will only be seen by the court and relevant adoption agencies or authorities.',
};

const cyContent = {
  title: 'Apply to adopt a child placed in your care (in welsh)',
  line1: "You can apply to adopt a child who's in your care following a court placement order. (in welsh)",
  line2:
    'The child must have lived with you for at least 10 weeks before you apply. You will not be able to submit your application until the 10 week period has passed. (in welsh)',
  line3:
    "You can start your application and save progress by selecting 'save as draft'. This will make sure your answers are saved so you can continue working on the application at a later date. You can only submit once all sections are completed. (in welsh)",
  heading1: 'Before you start (in welsh)',
  subheading1: 'Details about the child (in welsh)',
  line4: 'You will need some documents and information about the child: (in welsh)',
  bulletPoint1: "the child's full birth certificate (this includes details of the child's birth parents) (in welsh)",
  bulletPoint2: "details from the child's placement order (in welsh)",
  bulletPoint3: "the birth parents' names, addresses and occupations (in welsh)",
  bulletPoint4:
    "details of any previous court proceedings involving the child, or the child's siblings or half siblings (in welsh)",
  line5: 'Your social worker or adoption agency can help to provide these details. (in welsh)',
  subheading2: 'Details about you (in welsh)',
  line6:
    "You will need to provide details about yourself and any second applicant. Some of the information you provide is needed for the Adoption Register and adoption certificate which will replace the child's birth certificate. Your personal information will not affect your application to adopt. (in welsh)",
  line7:
    'The information you provide will only be seen by the court and relevant adoption agencies or authorities. (in welsh)',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('eligibility > start > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.line1).toEqual(enContent.line1);
    expect(generatedContent.line2).toEqual(enContent.line2);
    expect(generatedContent.line3).toEqual(enContent.line3);
    expect(generatedContent.heading1).toEqual(enContent.heading1);
    expect(generatedContent.subheading1).toEqual(enContent.subheading1);
    expect(generatedContent.line4).toEqual(enContent.line4);
    expect(generatedContent.bulletPoint1).toEqual(enContent.bulletPoint1);
    expect(generatedContent.bulletPoint2).toEqual(enContent.bulletPoint2);
    expect(generatedContent.bulletPoint3).toEqual(enContent.bulletPoint3);
    expect(generatedContent.bulletPoint4).toEqual(enContent.bulletPoint4);
    expect(generatedContent.line5).toEqual(enContent.line5);
    expect(generatedContent.subheading2).toEqual(enContent.subheading2);
    expect(generatedContent.line6).toEqual(enContent.line6);
    expect(generatedContent.line7).toEqual(enContent.line7);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.line1).toEqual(cyContent.line1);
    expect(generatedContent.line2).toEqual(cyContent.line2);
    expect(generatedContent.line3).toEqual(cyContent.line3);
    expect(generatedContent.heading1).toEqual(cyContent.heading1);
    expect(generatedContent.subheading1).toEqual(cyContent.subheading1);
    expect(generatedContent.line4).toEqual(cyContent.line4);
    expect(generatedContent.bulletPoint1).toEqual(cyContent.bulletPoint1);
    expect(generatedContent.bulletPoint2).toEqual(cyContent.bulletPoint2);
    expect(generatedContent.bulletPoint3).toEqual(cyContent.bulletPoint3);
    expect(generatedContent.bulletPoint4).toEqual(cyContent.bulletPoint4);
    expect(generatedContent.line5).toEqual(cyContent.line5);
    expect(generatedContent.subheading2).toEqual(cyContent.subheading2);
    expect(generatedContent.line6).toEqual(cyContent.line6);
    expect(generatedContent.line7).toEqual(cyContent.line7);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
