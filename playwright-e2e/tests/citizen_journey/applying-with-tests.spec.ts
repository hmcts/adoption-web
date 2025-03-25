import { expect, test } from '../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../hooks/createDeleteUser.hook';
import { Config } from '../../utils/urls';

test.describe('Citizen Journey Applying with page test', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(async ({ signIn }) => {
    const userInfo = await setupUser();
    if (userInfo) {
      userEmail = userInfo.email;
      userPassword = userInfo.password;
      userId = userInfo.id;
    }
    await signIn.navigateTo();
    await signIn.signIn(userEmail, userPassword);
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  test('check default page is in English', async ({ page }) => {
    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^en/);
  });

  test('check page is Welsh after Welsh link is clicked', async ({ page, citApplyingWithPage }) => {
    await citApplyingWithPage.clickLanguageLink();

    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^cy/);
  });

  test('check default page component visibility', async ({ citApplyingWithPage }) => {
    await expect.soft(citApplyingWithPage.applicationDetailsTitle).toBeVisible();
    await expect.soft(citApplyingWithPage.applicationWithHeading).toBeVisible();
    await expect.soft(citApplyingWithPage.applyingOnMyOwnRadioButton).toBeVisible();
    await expect.soft(citApplyingWithPage.applyingWithSpouseRadioButton).toBeVisible();
    await expect.soft(citApplyingWithPage.applyingWithPartnerNotSpouseRadioButton).toBeVisible();

    await expect.soft(citApplyingWithPage.saveAndContinue).toBeVisible();
    await expect.soft(citApplyingWithPage.saveAsDraft).toBeVisible();

    await expect.soft(citApplyingWithPage.contactACourtHeading).toBeHidden({ timeout: 500 });
    expect(test.info().errors).toHaveLength(0);
  });

  test('check default page radio buttons are unchecked', async ({ citApplyingWithPage }) => {
    await expect.soft(citApplyingWithPage.applyingOnMyOwnRadioButton).not.toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithSpouseRadioButton).not.toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithPartnerNotSpouseRadioButton).not.toBeChecked();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check applying for own radio button is checked and remainder radio buttons are unchecked', async ({
    citApplyingWithPage,
  }) => {
    await citApplyingWithPage.checkApplyingOnMyOwnRadioButton();
    await expect.soft(citApplyingWithPage.applyingOnMyOwnRadioButton).toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithSpouseRadioButton).not.toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithPartnerNotSpouseRadioButton).not.toBeChecked();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check applying with spouse radio button is and remainder radio buttons are unchecked', async ({
    citApplyingWithPage,
  }) => {
    await citApplyingWithPage.checkApplyingWithSpouseRadioButton();
    await expect.soft(citApplyingWithPage.applyingOnMyOwnRadioButton).not.toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithSpouseRadioButton).toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithPartnerNotSpouseRadioButton).not.toBeChecked();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check apply with spouse partner radio button is remainder and radio buttons are unchecked', async ({
    citApplyingWithPage,
  }) => {
    await citApplyingWithPage.checkApplyingWithPartnerNotSpouseRadioButton();
    await expect.soft(citApplyingWithPage.applyingOnMyOwnRadioButton).not.toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithSpouseRadioButton).not.toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithPartnerNotSpouseRadioButton).toBeChecked();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check one radio button can be checked at a time', async ({ citApplyingWithPage }) => {
    await citApplyingWithPage.checkApplyingOnMyOwnRadioButton();
    await expect.soft(citApplyingWithPage.applyingOnMyOwnRadioButton).toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithSpouseRadioButton).not.toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithPartnerNotSpouseRadioButton).not.toBeChecked();

    await citApplyingWithPage.checkApplyingWithSpouseRadioButton();
    await expect.soft(citApplyingWithPage.applyingOnMyOwnRadioButton).not.toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithSpouseRadioButton).toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithPartnerNotSpouseRadioButton).not.toBeChecked();

    await citApplyingWithPage.checkApplyingWithPartnerNotSpouseRadioButton();
    await expect.soft(citApplyingWithPage.applyingOnMyOwnRadioButton).not.toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithSpouseRadioButton).not.toBeChecked();
    await expect.soft(citApplyingWithPage.applyingWithPartnerNotSpouseRadioButton).toBeChecked();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check default page clicking Save and Continue button results in Error', async ({ citApplyingWithPage }) => {
    await citApplyingWithPage.clickSaveAndContinue();

    await expect(citApplyingWithPage.errorSummary).toBeHidden({ timeout: 500 });
  });

  test('check default page clicking save as draft buttons transfer to task list page', async ({
    page,
    citApplyingWithPage,
  }) => {
    await citApplyingWithPage.clickSaveAsDraft();

    const expectedUrl = `${Config.citizenFrontendBaseUrl}save-as-draft`;

    expect(page.url()).toBe(expectedUrl);
  });

  test('check page transfer to task list page after checking applying for own radio button', async ({
    page,
    citApplyingWithPage,
  }) => {
    await citApplyingWithPage.checkApplyingOnMyOwnRadioButton();
    await citApplyingWithPage.clickSaveAndContinue();

    const expectedUrl = `${Config.citizenFrontendBaseUrl}task-list`;

    expect(page.url()).toBe(expectedUrl);
  });
});
