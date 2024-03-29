import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, LanguageLookup } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { generateContent } from '../save-as-draft/content';

const EN = 'en';

const enContent = {
  title: 'Your application has been saved',
  multipleChildrenMessage:
    'You must submit any additional applications before midnight on the same day that you submitted your first application. This is to avoid additional application fees.',
  continueApplication: 'Continue with your application',
  signOut: 'Sign out',
};

const cyContent = {
  title: 'Mae eich cais wedi cael ei gadw',
  multipleChildrenMessage:
    'Mae’n rhaid ichi gyflwyno unrhyw geisiadau ychwanegol cyn hanner nos ar yr un diwrnod y bu ichi gyflwyno eich cais cyntaf. Rhaid gwneud hyn i beidio â gorfod talu ffioedd gwneud cais ychwanegol.',
  continueApplication: 'Parhau gyda’ch cais',
  signOut: 'Allgofnodi',
};

describe('application-submmitted > content', () => {
  const commonContent = { language: 'en', userCase: { canPaymentIgnored: true } } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain Continue Application and Sign-out button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    //     expect((form.submit?.text as LanguageLookup)(generatePageContent(
    //       { language: EN }) as Record<string, never>)).toBe('Continue with your application');
    expect(
      (form.saveAsDraft?.text as LanguageLookup)(generatePageContent({ language: EN }) as Record<string, never>)
    ).toBe('Sign out');
  });
});
