import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

import { urlConfig } from './settings/urls';

test.describe('Adoption', () => {
  test('should not have any automatically detectable accessibility issues @accessibility', async ({ page }) => {
    await page.goto(`${urlConfig.citizenStartUrl}`);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test('has title @smoke-test', async ({ page }) => {
  await page.goto(`${urlConfig.citizenStartUrl}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Apply for adoption - Apply to adopt a child placed in your care - GOV.UK/);
});
