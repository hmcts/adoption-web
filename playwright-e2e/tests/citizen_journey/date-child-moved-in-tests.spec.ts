import { expect, test } from '../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../hooks/createDeleteUser.hook';
import { urlConfig } from '../../utils/urls';

test.describe('Citizen Journey date child moved in page test single parent', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(async ({ signIn, citApplyingWithPage, citTaskListPage }) => {
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
    await citTaskListPage.clickDateChildMovedInLink();
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  test('check default page is in English', async ({ page }) => {
    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^en/);
  });

  test('check page is in Welsh after clicking Welsh language link', async ({ page, citDateChildMovedInPage }) => {
    await citDateChildMovedInPage.clickLanguageLink();

    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^cy/);
  });

  test('check if page components are in correct visible state', async ({ citDateChildMovedInPage }) => {
    await expect.soft(citDateChildMovedInPage.applicationDetailsTitle).toBeVisible();
    await expect.soft(citDateChildMovedInPage.childMoveInHeading).toBeVisible();
    await expect.soft(citDateChildMovedInPage.day).toBeVisible();
    await expect.soft(citDateChildMovedInPage.month).toBeVisible();
    await expect.soft(citDateChildMovedInPage.year).toBeVisible();
    await expect.soft(citDateChildMovedInPage.applicationTooltip).toBeVisible();
    await expect.soft(citDateChildMovedInPage.contactUsForHelpDropdownLink).toBeVisible();
    await expect.soft(citDateChildMovedInPage.contactACourtHeading).toBeHidden({ timeout: 500 });
    await expect.soft(citDateChildMovedInPage.findACourtLink).toBeHidden({ timeout: 500 });

    await expect.soft(citDateChildMovedInPage.saveAndContinue).toBeVisible();
    await expect.soft(citDateChildMovedInPage.saveAsDraft).toBeVisible();

    await expect.soft(citDateChildMovedInPage.errorDateSummary).toBeHidden({ timeout: 500 });
    expect(test.info().errors).toHaveLength(0);
  });

  test('check if page componetns are in correct visible state in save and continue error', async ({
    citDateChildMovedInPage,
  }) => {
    await citDateChildMovedInPage.clickSaveAndContinue();

    await expect.soft(citDateChildMovedInPage.applicationDetailsTitle).toBeVisible();
    await expect.soft(citDateChildMovedInPage.childMoveInHeading).toBeVisible();
    await expect.soft(citDateChildMovedInPage.day).toBeVisible();
    await expect.soft(citDateChildMovedInPage.month).toBeVisible();
    await expect.soft(citDateChildMovedInPage.year).toBeVisible();
    await expect.soft(citDateChildMovedInPage.applicationTooltip).toBeVisible();
    await expect.soft(citDateChildMovedInPage.contactUsForHelpDropdownLink).toBeVisible();
    await expect.soft(citDateChildMovedInPage.contactACourtHeading).toBeHidden({ timeout: 500 });
    await expect.soft(citDateChildMovedInPage.findACourtLink).toBeHidden({ timeout: 500 });

    await expect.soft(citDateChildMovedInPage.saveAndContinue).toBeVisible();
    await expect.soft(citDateChildMovedInPage.saveAsDraft).toBeVisible();

    await expect.soft(citDateChildMovedInPage.errorDateSummary).toBeVisible();
    expect(test.info().errors).toHaveLength(0);
  });

  test('check filling day only and clicking save and continue results in error', async ({
    citDateChildMovedInPage,
  }) => {
    await citDateChildMovedInPage.fillDayLabel('04');
    await citDateChildMovedInPage.clickSaveAndContinue();

    expect(citDateChildMovedInPage.errorMonthAndYearSummary).toBeVisible();
  });

  test('check filling day and month only and clicking save and continue results in error', async ({
    citDateChildMovedInPage,
  }) => {
    await citDateChildMovedInPage.fillDayLabel('04');
    await citDateChildMovedInPage.fillMonthLabel('01');
    await citDateChildMovedInPage.clickSaveAndContinue();

    expect(citDateChildMovedInPage.errorYearSummary).toBeVisible();
  });

  test('check when entering invalid date and clicking save and continue results in error', async ({
    citDateChildMovedInPage,
  }) => {
    await citDateChildMovedInPage.fillDayLabel('32');
    await citDateChildMovedInPage.fillMonthLabel('13');
    await citDateChildMovedInPage.fillYearLabel('2900');
    await citDateChildMovedInPage.clickSaveAndContinue();

    expect(citDateChildMovedInPage.errorRealDateSummary).toBeVisible();
  });

  test('check when entering day and years and clicking save and continue results in error', async ({
    citDateChildMovedInPage,
  }) => {
    await citDateChildMovedInPage.fillDayLabel('04');
    await citDateChildMovedInPage.fillYearLabel('2020');
    await citDateChildMovedInPage.clickSaveAndContinue();

    expect(citDateChildMovedInPage.errorMonthSummary).toBeVisible();
  });

  test('check when entering month and years and clicking save and continue results in error', async ({
    citDateChildMovedInPage,
  }) => {
    await citDateChildMovedInPage.fillMonthLabel('04');
    await citDateChildMovedInPage.fillYearLabel('2020');
    await citDateChildMovedInPage.clickSaveAndContinue();

    expect(citDateChildMovedInPage.errorDaySummary).toBeVisible();
  });

  test('check when entering real date and clicking save and continue it returns to task list page with state completed', async ({
    page,
    citTaskListPage,
    citDateChildMovedInPage,
  }) => {
    const expectedState = 'Completed';
    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/task-list`;

    await citDateChildMovedInPage.fillDayLabel('01');
    await citDateChildMovedInPage.fillMonthLabel('01');
    await citDateChildMovedInPage.fillYearLabel('2020');
    await citDateChildMovedInPage.clickSaveAndContinue();

    const actualState = await citTaskListPage.dateChildMovedInStatus.textContent();
    const actualUrl = page.url();

    await expect.soft(actualState).toContain(expectedState);
    await expect.soft(actualUrl).toBe(expectedUrl);

    expect(test.info().errors).toHaveLength(0);
  });
});
