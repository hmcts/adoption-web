import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';
import { generateContent } from '../save-as-draft/content';

const enContent = {
  title: 'Your application has been saved',
  continueApplication: 'Continue with your application',
  signOut: 'Sign out',
};

const cyContent = {
  title: 'Your application has been saved (in welsh)',
  continueApplication: 'Continue with your application (in welsh)',
  signOut: 'Sign out (in welsh)',
};

describe('application-submmitted > content', () => {
  const commonContent = { language: 'en' } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
