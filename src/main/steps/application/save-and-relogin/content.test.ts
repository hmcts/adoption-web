import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';
import { generateContent } from '../save-and-relogin/content';

const enContent = {
  title: 'Your application has been saved',
  signBackAndContinue: 'Sign back in and continue',
};

const cyContent = {
  title: 'Mae eich cais wedi cael ei gadw',
  signBackAndContinue: 'Mewngofnodwch yn ôl a pharhau',
};

describe('application-save-and-relogin > content', () => {
  const commonContent = { language: 'en' } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
