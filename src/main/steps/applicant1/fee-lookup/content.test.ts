import { FormContent } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = content => ({
  title: 'Pay adoption fee',
  line1: `The adoption application fee is £${content.fee}`,
  line2:
    'You’ll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready.',
  continue: 'Pay and submit application',
});

const cyContent = content => ({
  title: 'Pay adoption fee (in welsh)',
  line1: `The adoption application fee is £${content.fee} (in welsh)`,
  line2:
    'You’ll need a valid debit or credit card. If you cannot pay now, save the application and return to it when you are ready. (in welsh)',
  continue: 'Pay and submit application (in welsh)',
});

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > placement-order-summary content', () => {
  const commonContent = {
    language: 'en',
    userCase: {},
  } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent, fee: '100' });
    const content = enContent({ fee: 100 });
    expect(generatedContent.title).toEqual(content.title);
    expect(generatedContent.line1).toEqual(content.line1);
    expect(generatedContent.line2).toEqual(content.line2);
    expect(generatedContent.continue).toEqual(content.continue);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy', fee: '100' });
    const content = cyContent({ fee: 100 });
    expect(generatedContent.title).toEqual(content.title);
    expect(generatedContent.line1).toEqual(content.line1);
    expect(generatedContent.line2).toEqual(content.line2);
    expect(generatedContent.continue).toEqual(content.continue);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
