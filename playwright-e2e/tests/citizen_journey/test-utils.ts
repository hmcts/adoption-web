import { expect } from '@playwright/test';

import BasePage from '../../pages/basePage.page';

export async function runPageLanguageTest(expectedLanguage: string, basePage: BasePage): Promise<void> {
  const langAttribute = await basePage.page.getAttribute('html', 'lang');

  switch (expectedLanguage) {
    case 'en': {
      expect(langAttribute).toMatch(/^en/);
      break;
    }
    case 'cy': {
      expect(langAttribute).toMatch(/^cy/);
      break;
    }
    default:
      throw new Error('Unsupported language: ${expectedLanguage}');
  }
}

export async function runChangePageLanguageTest(expectedLanguage: string, basePage: BasePage): Promise<void> {
  await basePage.clickLanguageLink();
  runPageLanguageTest(expectedLanguage, basePage);
}
