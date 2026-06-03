import { expect, test } from '../../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../../hooks/createDeleteUser.hook';
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

    await expect(
      citChildFullNamePage.page.getByRole('heading', {
        name: 'Your application has been saved',
      })
    ).toBeVisible();

    await page.goBack();
    await expect(
      citChildFullNamePage.page.getByRole('heading', { name: "What is the child's full name?" })
    ).toBeVisible();

    const expectedLabelValue = 'Joe';
    const actualLabelValue = await citChildFullNamePage.firstName.inputValue();
    expect(actualLabelValue).toContain(expectedLabelValue);
  });

  test('check pressing draft button maintains filled last name label', async ({ page, citChildFullNamePage }) => {
    await citChildFullNamePage.fillLastNameLabel('Smith');
    await citChildFullNamePage.clickSaveAsDraft();
    await expect(
      citChildFullNamePage.page.getByRole('heading', {
        name: 'Your application has been saved',
      })
    ).toBeVisible();
    await page.goBack();
    await expect(
      citChildFullNamePage.page.getByRole('heading', { name: "What is the child's full name?" })
    ).toBeVisible();
    const expectedLabelValue = 'Smith';
    const actualLabelValue = await citChildFullNamePage.lastName.inputValue();
    expect(actualLabelValue).toBe(expectedLabelValue);
  });

  test('check pressing draft button maintains filled first name and last name labels', async ({
    page,
    citChildFullNamePage,
  }) => {
    await citChildFullNamePage.fillFirstNameLabel('Joe');
    await citChildFullNamePage.fillLastNameLabel('Smith');
    await citChildFullNamePage.clickSaveAsDraft();

    await expect(
      citChildFullNamePage.page.getByRole('heading', {
        name: 'Your application has been saved',
      })
    ).toBeVisible();

    await page.goBack();
    await expect(
      citChildFullNamePage.page.getByRole('heading', { name: "What is the child's full name?" })
    ).toBeVisible();

    const expectedFirstNameLabelValue = 'Joe';
    const expectedLastNameLabelValue = 'Smith';
    const actualFirstNameLabelValue = await citChildFullNamePage.firstName.inputValue();
    const actualLastNameLabelValue = await citChildFullNamePage.lastName.inputValue();

    expect.soft(actualFirstNameLabelValue).toBe(expectedFirstNameLabelValue);
    expect.soft(actualLastNameLabelValue).toBe(expectedLastNameLabelValue);

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing draft button then continuing with application maintains filled first name and last name labels', async ({
    citSaveAsDraftPage,
    citTaskListPage,
    citChildFullNamePage,
  }) => {
    await citChildFullNamePage.fillFirstNameLabel('Joe');
    await citChildFullNamePage.fillLastNameLabel('Smith');
    await citChildFullNamePage.clickSaveAsDraft();

    await expect(
      citChildFullNamePage.page.getByRole('heading', { name: 'Your application has been saved' })
    ).toBeVisible();

    await citSaveAsDraftPage.clickContinueWithYourApplicationButton();
    await expect(
      citChildFullNamePage.page.getByRole('heading', { name: 'Apply to adopt a child placed in your care' })
    ).toBeVisible();

    await citTaskListPage.clickChildDetailsLink();

    const expectedFirstNameLabelValue = 'Joe';
    const expectedLastNameLabelValue = 'Smith';
    const actualFirstNameLabelValue = await citChildFullNamePage.firstName.inputValue();
    const actualLastNameLabelValue = await citChildFullNamePage.lastName.inputValue();

    expect.soft(actualFirstNameLabelValue).toBe(expectedFirstNameLabelValue);
    expect.soft(actualLastNameLabelValue).toBe(expectedLastNameLabelValue);

    expect(test.info().errors).toHaveLength(0);
  });

  test('check inserting valid name data then pressing save and continue advances to next step', async ({
    citChildFullNamePage,
  }) => {
    await citChildFullNamePage.fillFirstNameLabel('Joe');
    await citChildFullNamePage.fillLastNameLabel('Smith');

    await citChildFullNamePage.clickSaveAndContinue();

    await expect(
      citChildFullNamePage.page.getByRole('heading', { name: "After adoption, what will be the child's full name?" })
    ).toBeVisible();
  });
});
