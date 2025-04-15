import { expect, test } from '../../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../../hooks/createDeleteUser.hook';
import { urlConfig } from '../../../utils/urls';
import { runChangePageLanguageTest, runPageLanguageTest } from '../test-utils';

test.describe('Citizen Journey child DoB test single parent', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(
    async ({
      signIn,
      citApplyingWithPage,
      citTaskListPage,
      citChildFullNamePage,
      citChildFullNameAfterAdoptionPage,
    }) => {
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
      await citTaskListPage.clickChildDetailsLink();
      await citChildFullNamePage.fillFirstNameLabel('Joe');
      await citChildFullNamePage.fillLastNameLabel('Smith');
      await citChildFullNamePage.clickSaveAndContinue();

      await citChildFullNameAfterAdoptionPage.fillFirstNameLabel('Joe');
      await citChildFullNameAfterAdoptionPage.fillLastNameLabel('Smith');
      await citChildFullNameAfterAdoptionPage.clickSaveAndContinue();
    }
  );

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  test('check default page is in English', async ({ page }) => {
    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^en/);
  });

  test('check page is in Welsh after clicking Welsh language link', async ({ page, citChildDoBPage }) => {
    await citChildDoBPage.clickLanguageLink();

    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^cy/);

  test('check default page is in English', async ({ citChildDoBPage }) => {
    await runPageLanguageTest('en', citChildDoBPage);
  });

  test('check page is in Welsh after clicking Welsh language link', async ({ citChildDoBPage }) => {
    await runChangePageLanguageTest('cy', citChildDoBPage);
  });

  test('check if page components are in correct visible state', async ({ citChildDoBPage }) => {
    await expect.soft(citChildDoBPage.childDetailsTitle).toBeVisible();
    await expect.soft(citChildDoBPage.childDoBHeading).toBeVisible();
    await expect.soft(citChildDoBPage.childDoBTooltip).toBeVisible();
    await expect.soft(citChildDoBPage.dayText).toBeVisible();
    await expect.soft(citChildDoBPage.monthText).toBeVisible();
    await expect.soft(citChildDoBPage.yearText).toBeVisible();
    await expect.soft(citChildDoBPage.dayLabel).toBeVisible();
    await expect.soft(citChildDoBPage.monthLabel).toBeVisible();
    await expect.soft(citChildDoBPage.yearLabel).toBeVisible();
    await expect.soft(citChildDoBPage.contactUsForHelpDropdownLink).toBeVisible();
    await expect.soft(citChildDoBPage.contactACourtHeading).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.findACourtLink).toBeHidden({ timeout: 500 });

    await expect.soft(citChildDoBPage.errorDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDaySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.realDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeHidden({ timeout: 500 });

    await expect.soft(citChildDoBPage.saveAndContinue).toBeVisible();
    await expect.soft(citChildDoBPage.saveAsDraft).toBeVisible();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing save and continue button without filling required fields results in date summary error', async ({
    citChildDoBPage,
  }) => {
    await citChildDoBPage.clickSaveAndContinue();

    await expect.soft(citChildDoBPage.errorDateSummary).toBeVisible();
    await expect.soft(citChildDoBPage.errorDaySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.realDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check filling month and year only then clicking save and continue button results in day summary error', async ({
    citChildDoBPage,
  }) => {
    await citChildDoBPage.fillMonthLabel('01');
    await citChildDoBPage.fillYearLabel('2020');
    await citChildDoBPage.clickSaveAndContinue();

    await expect.soft(citChildDoBPage.errorDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDaySummary).toBeVisible();
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.realDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check filling day and year only then clicking save and continue button results in month summary error', async ({
    citChildDoBPage,
  }) => {
    await citChildDoBPage.fillDayLabel('01');
    await citChildDoBPage.fillYearLabel('2020');
    await citChildDoBPage.clickSaveAndContinue();

    await expect.soft(citChildDoBPage.errorDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDaySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeVisible();
    await expect.soft(citChildDoBPage.errorYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.realDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check filling day and month only then clicking save and continue button results in year summary error', async ({
    citChildDoBPage,
  }) => {
    await citChildDoBPage.fillDayLabel('01');
    await citChildDoBPage.fillMonthLabel('01');
    await citChildDoBPage.clickSaveAndContinue();

    await expect.soft(citChildDoBPage.errorDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDaySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorYearSummary).toBeVisible();
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.realDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check filling year only then clicking save and continue button results in day and month summary error', async ({
    citChildDoBPage,
  }) => {
    await citChildDoBPage.fillYearLabel('2020');
    await citChildDoBPage.clickSaveAndContinue();

    await expect.soft(citChildDoBPage.errorDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDaySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeVisible();
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.realDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check filling month only then click save and continue button results in day and month summary error', async ({
    citChildDoBPage,
  }) => {
    await citChildDoBPage.fillMonthLabel('01');
    await citChildDoBPage.clickSaveAndContinue();

    await expect.soft(citChildDoBPage.errorDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDaySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeVisible();
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.realDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check filling day only then clicking save and continue button results in day and year summary error', async ({
    citChildDoBPage,
  }) => {
    await citChildDoBPage.fillDayLabel('01');
    await citChildDoBPage.clickSaveAndContinue();

    await expect.soft(citChildDoBPage.errorDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDaySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeVisible();
    await expect.soft(citChildDoBPage.realDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check filling invalid date then clicking save and continue button results in real date summary error', async ({
    citChildDoBPage,
  }) => {
    await citChildDoBPage.fillDayLabel('01');
    await citChildDoBPage.fillMonthLabel('13');
    await citChildDoBPage.fillYearLabel('2020');
    await citChildDoBPage.clickSaveAndContinue();

    await expect.soft(citChildDoBPage.errorDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDaySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.realDateSummary).toBeVisible();
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check filling date that makes child over 18 results in over 18 summary error', async ({ citChildDoBPage }) => {
    await citChildDoBPage.fillDayLabel('01');
    await citChildDoBPage.fillMonthLabel('01');
    await citChildDoBPage.fillYearLabel('1900');
    await citChildDoBPage.clickSaveAndContinue();

    await expect.soft(citChildDoBPage.errorDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDaySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.realDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeVisible();
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeHidden({ timeout: 500 });
  });

  test('check filling date in the future results in past date summary error', async ({ citChildDoBPage }) => {
    const date = new Date();
    const year = date.getFullYear() + 1;

    await citChildDoBPage.fillDayLabel('01');
    await citChildDoBPage.fillMonthLabel('01');
    await citChildDoBPage.fillYearLabel(year.toString());
    await citChildDoBPage.clickSaveAndContinue();

    await expect.soft(citChildDoBPage.errorDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDaySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayMonthSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDayYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorMonthYearSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.realDateSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorOver18Summary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildDoBPage.errorDateInPastSummary).toBeVisible();
  });

  test('check fill in correct date, saving draft then going back to page preserves date data', async ({
    page,
    citChildDoBPage,
  }) => {
    await citChildDoBPage.fillDayLabel('01');
    await citChildDoBPage.fillMonthLabel('01');
    await citChildDoBPage.fillYearLabel('2020');
    await citChildDoBPage.clickSaveAsDraft();
    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/save-as-draft`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await page.goBack();

    const expectedDayValue = '1';
    const expectedMonthValue = '1';
    const expectedYearValue = '2020';

    const actualDayValue = await citChildDoBPage.dayLabel.inputValue();
    const actualMonthValue = await citChildDoBPage.monthLabel.inputValue();
    const actualYearValue = await citChildDoBPage.yearLabel.inputValue();

    await expect.soft(actualDayValue).toBe(expectedDayValue);
    await expect.soft(actualMonthValue).toBe(expectedMonthValue);
    await expect.soft(actualYearValue).toBe(expectedYearValue);

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing draft button then continuing with application maintains filled in date labels', async ({
    page,
    citSaveAsDraftPage,
    citTaskListPage,
    citChildFullNamePage,
    citChildFullNameAfterAdoptionPage,
    citChildDoBPage,
  }) => {
    await citChildDoBPage.fillDayLabel('01');
    await citChildDoBPage.fillMonthLabel('01');
    await citChildDoBPage.fillYearLabel('2020');
    await citChildDoBPage.clickSaveAsDraft();

    let expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/save-as-draft`;
    let actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await citSaveAsDraftPage.clickContinueWithYourApplicationButton();

    expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/task-list`;
    actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await citTaskListPage.clickChildDetailsLink();

    await citChildFullNamePage.clickSaveAndContinue();

    await citChildFullNameAfterAdoptionPage.clickSaveAndContinue();

    const expectedDayValue = '1';
    const expectedMonthValue = '1';
    const expectedYearValue = '2020';

    const actualDayValue = await citChildDoBPage.dayLabel.inputValue();
    const actualMonthValue = await citChildDoBPage.monthLabel.inputValue();
    const actualYearValue = await citChildDoBPage.yearLabel.inputValue();

    await expect.soft(actualDayValue).toBe(expectedDayValue);
    await expect.soft(actualMonthValue).toBe(expectedMonthValue);
    await expect.soft(actualYearValue).toBe(expectedYearValue);

    expect(test.info().errors).toHaveLength(0);
  });

  test('check inserting valid date then pressing save amd continue advances to next step', async ({
    page,
    citChildDoBPage,
  }) => {
    await citChildDoBPage.fillDayLabel('01');
    await citChildDoBPage.fillMonthLabel('01');
    await citChildDoBPage.fillYearLabel('2020');

    await citChildDoBPage.clickSaveAndContinue();

    const exepctedUrl = `${urlConfig.citizenFrontendBaseUrl}/task-list`;
    const actualUrl = page.url();

    await expect(actualUrl).toBe(exepctedUrl);
  });
});
