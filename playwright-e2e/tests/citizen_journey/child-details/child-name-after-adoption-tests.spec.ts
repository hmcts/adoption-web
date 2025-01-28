import { expect, test } from '../../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../../hooks/createDeleteUser.hook';
test.describe('Citizen Journey child name after adoption test single parent', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(async ({ signIn, citApplyingWithPage, citTaskListPage, citChildFullNamePage }) => {
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
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  test('check default page is in English', async ({ page }) => {
    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^en/);
  });

  test('check page is in Welsh after clicking Welsh language link', async ({
    page,
    citChildFullNameAfterAdoptionPage,
  }) => {
    await citChildFullNameAfterAdoptionPage.clickLanguageLink();

    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^cy/);
  });

  test('check if page components are in correct visible state', async ({ citChildFullNameAfterAdoptionPage }) => {
    await expect.soft(citChildFullNameAfterAdoptionPage.childDetailsTitle).toBeVisible();
    await expect.soft(citChildFullNameAfterAdoptionPage.childFullNameAfterAdoptionHeading).toBeVisible();
    await expect.soft(citChildFullNameAfterAdoptionPage.firstName).toBeVisible();
    await expect.soft(citChildFullNameAfterAdoptionPage.lastName).toBeVisible();
    await expect.soft(citChildFullNameAfterAdoptionPage.contactUsForHelpDropdownLink).toBeVisible();
    await expect.soft(citChildFullNameAfterAdoptionPage.contactACourtHeading).toBeHidden({ timeout: 500 });
    await expect.soft(citChildFullNameAfterAdoptionPage.findACourtLink).toBeHidden({ timeout: 500 });

    await expect.soft(citChildFullNameAfterAdoptionPage.saveAndContinue).toBeVisible();
    await expect.soft(citChildFullNameAfterAdoptionPage.saveAsDraft).toBeVisible();

    await expect.soft(citChildFullNameAfterAdoptionPage.errorFirstNameSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildFullNameAfterAdoptionPage.errorLastNameSummary).toBeHidden({ timeout: 500 });
    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing save and continue button without filling required fields results in first name and last name error summaries', async ({
    citChildFullNameAfterAdoptionPage,
  }) => {
    await citChildFullNameAfterAdoptionPage.clickSaveAndContinue();

    await expect.soft(citChildFullNameAfterAdoptionPage.errorFirstNameSummary).toBeVisible();
    await expect.soft(citChildFullNameAfterAdoptionPage.errorLastNameSummary).toBeVisible();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing save and continue button filling in first name results in last name error summary', async ({
    citChildFullNameAfterAdoptionPage,
  }) => {
    await citChildFullNameAfterAdoptionPage.fillFirstNameLabel('Joe');
    await citChildFullNameAfterAdoptionPage.clickSaveAndContinue();

    await expect.soft(citChildFullNameAfterAdoptionPage.errorFirstNameSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildFullNameAfterAdoptionPage);

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing save and continue button filling in the last name results in first name error summary', async ({
    citChildFullNameAfterAdoptionPage,
  }) => {
    await citChildFullNameAfterAdoptionPage.fillLastNameLabel('Smith');
    await citChildFullNameAfterAdoptionPage.clickSaveAndContinue();

    await expect.soft(citChildFullNameAfterAdoptionPage.errorFirstNameSummary).toBeVisible();
    await expect.soft(citChildFullNameAfterAdoptionPage.errorLastNameSummary).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing draft button maintains filled first name label', async ({
    page,
    citChildFullNameAfterAdoptionPage,
  }) => {
    await citChildFullNameAfterAdoptionPage.fillFirstNameLabel('Joe');
    await citChildFullNameAfterAdoptionPage.clickSaveAsDraft();

    const expectedUrl = 'https://adoption-web.aat.platform.hmcts.net/save-as-draft';
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await page.goBack();

    const expectedLabelValue = 'Joe';
    const actualLabelValue = await citChildFullNameAfterAdoptionPage.firstName.inputValue();
    await expect(actualLabelValue).toContain(expectedLabelValue);
  });

  test('check pressing draft button maintains filled last name label', async ({
    page,
    citChildFullNameAfterAdoptionPage,
  }) => {
    await citChildFullNameAfterAdoptionPage.fillLastNameLabel('Smith');
    await citChildFullNameAfterAdoptionPage.clickSaveAsDraft();

    const expectedUrl = 'https://adoption-web.aat.platform.hmcts.net/save-as-draft';
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await page.goBack();

    const expectedLabelValue = 'Smith';
    const actualLabelValue = await citChildFullNameAfterAdoptionPage.lastName.inputValue();
    await expect(actualLabelValue).toContain(expectedLabelValue);
  });

  test('check pressing draft button maintains filled first name and last name labels', async ({
    page,
    citChildFullNameAfterAdoptionPage,
  }) => {
    await citChildFullNameAfterAdoptionPage.fillFirstNameLabel('Joe');
    await citChildFullNameAfterAdoptionPage.fillLastNameLabel('Smith');
    await citChildFullNameAfterAdoptionPage.clickSaveAsDraft();

    const expectedUrl = 'https://adoption-web.aat.platform.hmcts.net/save-as-draft';
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await page.goBack();

    const expectedFirstNameLabelValue = 'Joe';
    const expectedLastNameLabelValue = 'Smith';
    const actualFirstNameLabelValue = await citChildFullNameAfterAdoptionPage.firstName.inputValue();
    const actualLastNameLabelValue = await citChildFullNameAfterAdoptionPage.lastName.inputValue();

    await expect.soft(actualFirstNameLabelValue).toBe(expectedFirstNameLabelValue);
    await expect.soft(actualLastNameLabelValue).toBe(expectedLastNameLabelValue);

    expect(test.info().errors).toHaveLength(0);
  });

  test('check inserting valid name data then pressing save and continue advances to next step', async ({
    page,
    citChildFullNameAfterAdoptionPage,
  }) => {
    await citChildFullNameAfterAdoptionPage.fillFirstNameLabel('Joe');
    await citChildFullNameAfterAdoptionPage.fillLastNameLabel('Smith');

    await citChildFullNameAfterAdoptionPage.clickSaveAndContinue();

    const expectedUrl = 'https://adoption-web.aat.platform.hmcts.net/children/date-of-birth';
    const actualUrl = page.url();

    expect(actualUrl).toBe(expectedUrl);
  });
});
