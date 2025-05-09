import { expect, test } from '../../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../../hooks/createDeleteUser.hook';
import { urlConfig } from '../../../utils/urls';
import { runChangePageLanguageTest, runPageLanguageTest } from '../test-utils';

test.describe('Citizen Journey child name test single parent', () => {
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
    await citTaskListPage.clickChildDetailsLink();
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  test('check default page is in English', async ({ citChildFullNamePage }) => {
    await runPageLanguageTest('en', citChildFullNamePage);
  });

  test('check page is in Welsh after clicking Welsh language link', async ({ citChildFullNamePage }) => {
    await runChangePageLanguageTest('cy', citChildFullNamePage);
  });

  test('check if page components are in correct visible state', async ({ citChildFullNamePage }) => {
    await expect.soft(citChildFullNamePage.childDetailsTitle).toBeVisible();
    await expect.soft(citChildFullNamePage.childFullNameHeading).toBeVisible();

    await expect.soft(citChildFullNamePage.childHeadingTip).toBeVisible();
    await expect.soft(citChildFullNamePage.firstNameTooltip).toBeVisible();
    await expect.soft(citChildFullNamePage.lastNameTooltip).toBeVisible();

    await expect.soft(citChildFullNamePage.firstName).toBeVisible();
    await expect.soft(citChildFullNamePage.lastName).toBeVisible();
    await expect.soft(citChildFullNamePage.contactUsForHelpDropdownLink).toBeVisible();
    await expect.soft(citChildFullNamePage.contactACourtHeading).toBeHidden({ timeout: 500 });
    await expect.soft(citChildFullNamePage.findACourtLink).toBeHidden({ timeout: 500 });

    await expect.soft(citChildFullNamePage.saveAndContinue).toBeVisible();
    await expect.soft(citChildFullNamePage.saveAsDraft).toBeVisible();

    await expect.soft(citChildFullNamePage.errorFirstNameSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildFullNamePage.errorLastNameSummary).toBeHidden({ timeout: 500 });
    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing save and continue button without filling required fields results in first name and last name error summaries', async ({
    citChildFullNamePage,
  }) => {
    await citChildFullNamePage.clickSaveAndContinue();

    await expect.soft(citChildFullNamePage.errorFirstNameSummary).toBeVisible();
    await expect.soft(citChildFullNamePage.errorLastNameSummary).toBeVisible();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing save and continue button filling in first name results in last name error summary', async ({
    citChildFullNamePage,
  }) => {
    await citChildFullNamePage.fillFirstNameLabel('Joe');
    await citChildFullNamePage.clickSaveAndContinue();

    await expect.soft(citChildFullNamePage.errorFirstNameSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildFullNamePage.errorLastNameSummary).toBeVisible();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing save and continue button filling in last name results in first name error summary', async ({
    citChildFullNamePage,
  }) => {
    await citChildFullNamePage.fillLastNameLabel('Smith');
    await citChildFullNamePage.clickSaveAndContinue();

    await expect.soft(citChildFullNamePage.errorFirstNameSummary).toBeVisible();
    await expect.soft(citChildFullNamePage.errorLastNameSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing draft button maintains filled first name label', async ({ page, citChildFullNamePage }) => {
    await citChildFullNamePage.fillFirstNameLabel('Joe');
    await citChildFullNamePage.clickSaveAsDraft();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/save-as-draft`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await page.goBack();

    const expectedLabelValue = 'Joe';
    const actualLabelValue = await citChildFullNamePage.firstName.inputValue();
    await expect(actualLabelValue).toContain(expectedLabelValue);
  });

  test('check pressing draft button maintains filled last name label', async ({ page, citChildFullNamePage }) => {
    await citChildFullNamePage.fillLastNameLabel('Smith');
    await citChildFullNamePage.clickSaveAsDraft();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/save-as-draft`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await page.goBack();

    const expectedLabelValue = 'Smith';
    const actualLabelValue = await citChildFullNamePage.lastName.inputValue();
    await expect(actualLabelValue).toContain(expectedLabelValue);
  });

  test('check pressing draft button maintains filled first name and last name labels', async ({
    page,
    citChildFullNamePage,
  }) => {
    await citChildFullNamePage.fillFirstNameLabel('Joe');
    await citChildFullNamePage.fillLastNameLabel('Smith');
    await citChildFullNamePage.clickSaveAsDraft();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/save-as-draft`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await page.goBack();

    const expectedFirstNameLabelValue = 'Joe';
    const expectedLastNameLabelValue = 'Smith';
    const actualFirstNameLabelValue = await citChildFullNamePage.firstName.inputValue();
    const actualLastNameLabelValue = await citChildFullNamePage.lastName.inputValue();

    await expect.soft(actualFirstNameLabelValue).toBe(expectedFirstNameLabelValue);
    await expect.soft(actualLastNameLabelValue).toBe(expectedLastNameLabelValue);

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing draft button then continuing with application maintains filled first name and last name labels', async ({
    page,
    citSaveAsDraftPage,
    citTaskListPage,
    citChildFullNamePage,
  }) => {
    await citChildFullNamePage.fillFirstNameLabel('Joe');
    await citChildFullNamePage.fillLastNameLabel('Smith');
    await citChildFullNamePage.clickSaveAsDraft();

    let expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/save-as-draft`;
    let actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await citSaveAsDraftPage.clickContinueWithYourApplicationButton();

    expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/task-list`;
    actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await citTaskListPage.clickChildDetailsLink();

    const expectedFirstNameLabelValue = 'Joe';
    const expectedLastNameLabelValue = 'Smith';
    const actualFirstNameLabelValue = await citChildFullNamePage.firstName.inputValue();
    const actualLastNameLabelValue = await citChildFullNamePage.lastName.inputValue();

    await expect.soft(actualFirstNameLabelValue).toBe(expectedFirstNameLabelValue);
    await expect.soft(actualLastNameLabelValue).toBe(expectedLastNameLabelValue);

    expect(test.info().errors).toHaveLength(0);
  });

  test('check inserting valid name data then pressing save and continue advances to next step', async ({
    page,
    citChildFullNamePage,
  }) => {
    await citChildFullNamePage.fillFirstNameLabel('Joe');
    await citChildFullNamePage.fillLastNameLabel('Smith');

    await citChildFullNamePage.clickSaveAndContinue();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/children/full-name-after-adoption`;
    const actualUrl = page.url();

    expect(actualUrl).toBe(expectedUrl);
  });
});
