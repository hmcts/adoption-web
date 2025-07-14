import { expect, test } from '../../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../../hooks/createDeleteUser.hook';
import { urlConfig } from '../../../utils/urls';
import { runChangePageLanguageTest, runPageLanguageTest } from '../test-utils';

test.describe('Citizen Journey other adoption agency single parent test', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(async ({ page, signIn, citApplyingWithPage }) => {
    const userInfo = await setupUser();
    if (userInfo) {
      userEmail = userInfo.email;
      userPassword = userInfo.password;
      userId = userInfo.id;
    }
    await signIn.navigateTo();
    await signIn.signIn(userEmail, userPassword);
    await citApplyingWithPage.checkApplyingOnMyOwnRadioButton();
    await citApplyingWithPage.clickSaveAndContinue();
    await page.goto(`${urlConfig.citizenFrontendBaseUrl}/children/other-adoption-agency`);
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
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
