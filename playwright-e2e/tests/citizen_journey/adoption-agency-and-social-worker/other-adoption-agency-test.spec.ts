import { expect, test } from '../../../fixtures/fixtures.ts';
import { urlConfig } from '../../../utils/urls.ts';
import { runChangePageLanguageTest, runPageLanguageTest } from '../test-utils.ts';

test.describe('Citizen Journey other adoption agency single parent test', () => {
  let userEmail: string;
  let userPassword: string;

  test.beforeEach(async ({ page, citizenUserUtils, signIn, citApplyingWithPage }) => {
    const userInfo = await citizenUserUtils.createUser();
    if (userInfo) {
      userEmail = userInfo.email;
      userPassword = userInfo.password;
    }
    await signIn.navigateTo();
    await signIn.signIn(userEmail, userPassword);
    await citApplyingWithPage.checkApplyingOnMyOwnRadioButton();
    await citApplyingWithPage.clickSaveAndContinue();
    await page.goto('https://adoption-web.aat.platform.hmcts.net/children/other-adoption-agency');
  });

  test('check default page is in English', async ({ citOtherAdoptionAgencyPage }) => {
    await runPageLanguageTest('en', citOtherAdoptionAgencyPage);
  });

  test('check page is in Welsh after clicking Welsh language link', async ({ citOtherAdoptionAgencyPage }) => {
    await runChangePageLanguageTest('cy', citOtherAdoptionAgencyPage);
  });

  test('check if page components are in correct visible state', async ({ citOtherAdoptionAgencyPage }) => {
    await expect.soft(citOtherAdoptionAgencyPage.applicationDetailsTitle).toBeVisible();
    await expect.soft(citOtherAdoptionAgencyPage.otherAdoptionAgencyTitle).toBeVisible();
    await expect.soft(citOtherAdoptionAgencyPage.otherAdoptionAgencyTitle).toBeVisible();
    await expect.soft(citOtherAdoptionAgencyPage.otherAdopptionAgencyYesRadioButton).toBeVisible();
    await expect.soft(citOtherAdoptionAgencyPage.otherAdoptionAgencyNoRadioButton).toBeVisible();
    await expect.soft(citOtherAdoptionAgencyPage.errorSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check save and continuing with no valid input reuslts in error', async ({ citOtherAdoptionAgencyPage }) => {
    await citOtherAdoptionAgencyPage.clickSaveAndContinue();

    await expect(citOtherAdoptionAgencyPage.errorSummary).toBeVisible();
  });

  test('check clicking save and draft goes to save as draft page', async ({ citOtherAdoptionAgencyPage, page }) => {
    await citOtherAdoptionAgencyPage.clickSaveAsDraft();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/save-as-draft`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);
  });

  test('check clicking no radio button then save and continuing returns to task list page', async ({
    citOtherAdoptionAgencyPage,
    page,
  }) => {
    await citOtherAdoptionAgencyPage.checkNoRadioButton();

    await citOtherAdoptionAgencyPage.clickSaveAndContinue();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/task-list`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);
  });

  test('check clicking yes radio button then save and continue goes to adoption agency page', async ({
    citOtherAdoptionAgencyPage,
    page,
  }) => {
    await citOtherAdoptionAgencyPage.checkYesRadioButton();

    await citOtherAdoptionAgencyPage.clickSaveAndContinue();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/children/adoption-agency`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);
  });
});
