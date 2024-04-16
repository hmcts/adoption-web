import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Adoption', () => {
  
  test('should not have any automatically detectable accessibility issues @accessibility', async ({ page }) => {
    await page.goto('https://adoption-web.aat.platform.hmcts.net/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test('has title @smoke-test', async ({ page }) => {
  await page.goto('https://adoption-web.aat.platform.hmcts.net/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Sign in - HMCTS Access - GOV.UK/);
});
