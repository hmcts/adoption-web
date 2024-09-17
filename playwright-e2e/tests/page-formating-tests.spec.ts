import { Page, expect, test } from '@playwright/test';

import { urlConfig } from '../utils/urls';

test.describe('Start application details e2e journey in English', () => {
  let page: Page;
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({
      locale: 'en',
    });
    page = await context.newPage();
    await page.goto(urlConfig.citizenStartUrl);
  });
  test('Start up jourey url is equal to the initial url', async () => {
    await expect(page).toHaveURL(urlConfig.citizenStartUrl);
  });

  test('Start up journey page is default to English', async () => {
    const htmlLang = await page.evaluate(() => document.documentElement.lang);

    expect(htmlLang).toBe('en');
  });
  test('Start up journey page is to have Cymraeg language link to be visible', async () => {
    const linkLocator = page.locator('text=cymraeg');
    await expect(linkLocator).toBeVisible();
  });
  test('Start up journey page clicking Cymraeg langauge changes html language to cy', async () => {
    const linkLocator = page.locator('text=cymraeg');
    await linkLocator.click();
    await page.waitForLoadState('load');

    const htmlLang = await page.evaluate(() => document.documentElement.lang);

    expect(htmlLang).toBe('cy');
  });

  test('Start up journey page clicking Cymraeg language clicking english language changes lanuage to en', async () => {
    await changePageLanguage(page, 'cymraeg', 'load');
    await changePageLanguage(page, 'english', 'load');

    const htmlLang = await page.evaluate(() => document.documentElement.lang);

    expect(htmlLang).toBe('en');
  });
});

async function changePageLanguage(
  page: Page,
  textLanguage: string,
  state?: 'load' | 'domcontentloaded' | 'networkidle'
): Promise<void> {
  const languageLinkLocator = page.locator('text='.concat(textLanguage));
  await languageLinkLocator.click();
  await page.waitForLoadState(state);
}

// test.describe('Start application details e2e journey in English', () => {
//   test.beforeEach(async ({ browser }) => {
//     const context = await browser.newContext({
//       locale: 'en',
//     });

//     const page = await context.newPage();

//     await page.goto(urlConfig.citizenStartUrl);
//   });

//   test('Start up journey url is equal to the initial url', async ({ page }) => {
//     await expect(page).toHaveURL(urlConfig.citizenStartUrl);
//   });

//   test('Start up journey default langauge is in English', async ({ browser }) => {
//     const context = await browser.newContext({
//       locale: 'en',
//     });

//     const page = await context.newPage();

//     await page.goto(urlConfig.citizenStartUrl);

//     const htmlLang = await page.evaluate(() => document.documentElement.lang);

//     expect(htmlLang).toBe('en');
//   });
// });