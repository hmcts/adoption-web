import { expect, test } from '../../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../../hooks/createDeleteUser.hook';
test.describe('Citizen Journey child social worker test single parent', () => {
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
    await citTaskListPage.clickAdoptionAgencyLink();
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  test('chekc default page is in English', async ({ page }) => {
    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^en/);
  });

  test('check page is in Welsh after clicking Welsh language link', async ({
    page,
    citChildSocialWorkerDetailsPage,
  }) => {
    await citChildSocialWorkerDetailsPage.clickLanguageLink();

    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^cy/);
  });

  test('check if page components are in correct visible state', async ({ citChildSocialWorkerDetailsPage, }) => {
    await expect.soft(citChildSocialWorkerDetailsPage.applicationDetailsTitle).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.childSocialWorkerTitle).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.nameOfChildSocialWorkerText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.nameOfChildSocialWorkerLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.phoneNumberText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.phoneNumberLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.emailAddressText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.emailAddressLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.childLocalAuthorityText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.childLocalAuthorityInputLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.childLocalAuthorityDropdown).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.localAuthorityEmailText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.localAuthorityEmailLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.contactUsForHelpDropdownLink).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.contactACourtHeading).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.findACourtLink).toBeHidden({ timeout: 500 });

    await expect.soft(citChildSocialWorkerDetailsPage.errorNameOfChildSocialWorkerSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorNoOptionalEmailSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorNoEmailSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterLocalAuthoritySummary).toBeHidden({ timeout: 500 });

    await expect.soft(citChildSocialWorkerDetailsPage.saveAndContinue).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.saveAsDraft).toBeVisible();
  });

  test('check', async ({ citChildSocialWorkerDetailsPage }) => {
    await citChildSocialWorkerDetailsPage.selectLocalAuthority('Sandwell');
  });
});
