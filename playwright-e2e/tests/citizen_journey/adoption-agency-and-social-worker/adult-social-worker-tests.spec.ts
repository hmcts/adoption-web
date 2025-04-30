import { expect, test } from '../../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../../hooks/createDeleteUser.hook';
import { urlConfig } from '../../../utils/urls';
import { runChangePageLanguageTest, runPageLanguageTest } from '../test-utils';
test.describe('Citizen Journey adult social worker test single parent', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(async ({ signIn, citApplyingWithPage, citTaskListPage, citChildSocialWorkerDetailsPage }) => {
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

    await citChildSocialWorkerDetailsPage.fillNameOfChildSocialWorkerLabel('test');
    await citChildSocialWorkerDetailsPage.fillPhoneNumberLabel('01622 123456');
    await citChildSocialWorkerDetailsPage.selectLocalAuthority('Sandwell');
    await citChildSocialWorkerDetailsPage.fillLocalAuthorityEmailLabel('austen.stevens@justice.gov.uk');
    await citChildSocialWorkerDetailsPage.clickSaveAndContinue();
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  test('check default page is in English', async ({ citAdultSocialWorkerDetailsPage }) => {
    await runPageLanguageTest('en', citAdultSocialWorkerDetailsPage);
  });

  test('check page is in Welsh after clicking Welsh language link', async ({ citAdultSocialWorkerDetailsPage }) => {
    await runChangePageLanguageTest('cy', citAdultSocialWorkerDetailsPage);
  });

  test('check if page components are in correct visible state', async ({ citAdultSocialWorkerDetailsPage }) => {
    await expect.soft(citAdultSocialWorkerDetailsPage.applicationDetailsTitle).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.adultLocalAuthorityText).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.nameOfAdultSocialWorkerText).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.nameOfAdultSocialWorkerLabel).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.phoneNumberText).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.phoneNumberLabel).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.emailAddressText).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.emailAddressLabel).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.adultLocalAuthorityText).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.localAuthorityInputLabel).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.localAuthorityDropdown).toBeHidden({ timeout: 500 });
    await expect.soft(citAdultSocialWorkerDetailsPage.localAuthorityEmailText).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.localAuthorityInputLabel).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.contactUsForHelpDropdownLink).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.contactACourtHeading).toBeHidden({ timeout: 500 });
    await expect.soft(citAdultSocialWorkerDetailsPage.findACourtLink).toBeHidden({ timeout: 500 });

    await expect.soft(citAdultSocialWorkerDetailsPage.errorNameOfAdultSocialWorkerSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citAdultSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citAdultSocialWorkerDetailsPage.errorNoOptionalAdultEmailSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citAdultSocialWorkerDetailsPage.errorNoAdultEmailSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citAdultSocialWorkerDetailsPage.errorEnterLocalAuthoritySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citAdultSocialWorkerDetailsPage.errorNonGovernmentEmail).toBeHidden({ timeout: 500 });

    await expect.soft(citAdultSocialWorkerDetailsPage.saveAndContinue).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.saveAsDraft).toBeVisible();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check if pressing save and continue button wihtout filling required field results in relevant errors', async ({
    citAdultSocialWorkerDetailsPage,
  }) => {
    await citAdultSocialWorkerDetailsPage.clickSaveAndContinue();

    await expect.soft(citAdultSocialWorkerDetailsPage.errorNameOfAdultSocialWorkerSummary).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.errorNoOptionalAdultEmailSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citAdultSocialWorkerDetailsPage.errorNoAdultEmailSummary).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.errorNonGovernmentEmail).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check incorrect format email then pressing save and continue button results in relevant errors', async ({
    citAdultSocialWorkerDetailsPage,
  }) => {
    await citAdultSocialWorkerDetailsPage.fillEmailAddressLabel('test');
    await citAdultSocialWorkerDetailsPage.clickSaveAndContinue();

    await expect.soft(citAdultSocialWorkerDetailsPage.errorNameOfAdultSocialWorkerSummary).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.errorNoOptionalAdultEmailSummary).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.errorNoAdultEmailSummary).toBeVisible();
    await expect.soft(citAdultSocialWorkerDetailsPage.errorNonGovernmentEmail).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check adding incorrect phone number then pressing save and continue button results in UK telephone number error', async ({
    citAdultSocialWorkerDetailsPage,
  }) => {
    await citAdultSocialWorkerDetailsPage.fillPhoneNumberLabel('01622');
    await citAdultSocialWorkerDetailsPage.clickSaveAndContinue();

    await expect(citAdultSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeVisible();
  });

  test('check inserting data then saving draft then going back to page preserves saved data', async ({
    page,
    citAdultSocialWorkerDetailsPage,
  }) => {
    await citAdultSocialWorkerDetailsPage.fillNameOfAdultSocialWorkerLabel('test');
    await citAdultSocialWorkerDetailsPage.fillPhoneNumberLabel('01622 123456');
    await citAdultSocialWorkerDetailsPage.selectLocalAuthority('Sandwell');
    await citAdultSocialWorkerDetailsPage.fillLocalAuthorityEmailLabel('austen.stevens@justice.gov.uk');
    await citAdultSocialWorkerDetailsPage.clickSaveAsDraft();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/save-as-draft`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await page.goBack();

    const expectedSocialWorkerValue = 'test';
    const expectedPhoneNumberValue = '01622 123456';
    const expectedLocalAuthorityValue = 'Sandwell Metropolitan Council';
    const expectedLocalAuthorityEmailValue = 'austen.stevens@justice.gov.uk';

    const actualSocialWorkerValue = await citAdultSocialWorkerDetailsPage.nameOfAdultSocialWorkerLabel.inputValue();
    const actualPhoneNumberValue = await citAdultSocialWorkerDetailsPage.phoneNumberLabel.inputValue();
    const actualLocalAuthorityValue = await citAdultSocialWorkerDetailsPage.localAuthorityInputLabel.inputValue();
    const actualLocalAuthorityEmailValue = await citAdultSocialWorkerDetailsPage.localAuthorityEmailLabel.inputValue();

    await expect.soft(actualSocialWorkerValue).toBe(expectedSocialWorkerValue);
    await expect.soft(actualPhoneNumberValue).toBe(expectedPhoneNumberValue);
    await expect.soft(actualLocalAuthorityValue).toBe(expectedLocalAuthorityValue);
    await expect.soft(actualLocalAuthorityEmailValue).toBe(expectedLocalAuthorityEmailValue);

    expect(test.info().errors).toHaveLength(0);
  });

  test('check inserting correct data then pressing save and continue advances to the next step', async ({
    page,
    citAdultSocialWorkerDetailsPage,
  }) => {
    await citAdultSocialWorkerDetailsPage.fillNameOfAdultSocialWorkerLabel('test');
    await citAdultSocialWorkerDetailsPage.fillPhoneNumberLabel('01622 123456');
    await citAdultSocialWorkerDetailsPage.selectLocalAuthority('Sandwell');
    await citAdultSocialWorkerDetailsPage.fillLocalAuthorityEmailLabel('austen.stevens@justice.gov.uk');
    await citAdultSocialWorkerDetailsPage.clickSaveAndContinue();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/children/other-adoption-agency`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);
  });
});
