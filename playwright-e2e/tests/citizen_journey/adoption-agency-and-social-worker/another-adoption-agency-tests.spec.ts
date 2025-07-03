import { expect, test } from '../../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../../hooks/createDeleteUser.hook';
import { urlConfig } from '../../../utils/urls';
import { runChangePageLanguageTest, runPageLanguageTest } from '../test-utils';

test.describe('Citizen Journey another adoption agency test single parent', () => {
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
    await page.goto(`${urlConfig.citizenFrontendBaseUrl}/children/adoption-agency`);
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  test('check default page is in English', async ({ citAnotherAdoptionAgencyPage }) => {
    await runPageLanguageTest('en', citAnotherAdoptionAgencyPage);
  });

  test('check page is in Welsh afler clicking Welsh language link', async ({ citAnotherAdoptionAgencyPage }) => {
    await runChangePageLanguageTest('cy', citAnotherAdoptionAgencyPage);
  });

  test('check if page components are in correct visible state', async ({ citAnotherAdoptionAgencyPage }) => {
    await expect.soft(citAnotherAdoptionAgencyPage.applicationDetailsTitle).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.anotherAdoptionAgencyHeading).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.nameOfAdoptionAgencyHeading).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.nameOfAdoptionAgencyLabel).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.nameOfYourContactHeading).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.nameOfYourContactLabel).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.phoneNumberHeading).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.phoneNumberLabel).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.addressLineOneHeading).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.addressLineOneLabel).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.townOrCityHeading).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.townOrCityLabel).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.postcodeHeading).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.postcodeLabel).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.emailAddressHeading).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.emailAddressLabel).toBeVisible();

    await expect.soft(citAnotherAdoptionAgencyPage.saveAndContinue).toBeVisible();
    await expect.soft(citAnotherAdoptionAgencyPage.saveAsDraft).toBeVisible();
  });

  test('check save and continuing with no valid input results in error', async ({ citAnotherAdoptionAgencyPage }) => {
    await citAnotherAdoptionAgencyPage.clickSaveAndContinue();

    expect(citAnotherAdoptionAgencyPage.errorSummary);
  });

  test('check filling valid data then clicking save and continue goes to task list page', async ({
    citAnotherAdoptionAgencyPage,
    page
  }) => {
    await citAnotherAdoptionAgencyPage.fillAdoptionAgencyLabel('agency');
    await citAnotherAdoptionAgencyPage.fillNameOfYourContactLabel('test contact');
    await citAnotherAdoptionAgencyPage.fillPhoneNumberLabel('01622 123456');
    await citAnotherAdoptionAgencyPage.fillAddressOneLabel('test');
    await citAnotherAdoptionAgencyPage.fillTownOrCityLabel('town');
    await citAnotherAdoptionAgencyPage.fillPostcodeLabel('SW1A 0AA');
    await citAnotherAdoptionAgencyPage.fillEmailAddressLabel('test@justice.gov.uk');

    await citAnotherAdoptionAgencyPage.clickSaveAndContinue();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/task-list`;
    const actualUrl = page.url();

    await expect(actualUrl).toBe(expectedUrl);
  });
});
