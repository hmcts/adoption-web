import { expect, test } from '../../../fixtures/fixtures';
import { urlConfig } from '../../../utils/urls';
test.describe('Citizen Journey child social worker test single parent', () => {
  let userEmail: string;
  let userPassword: string;

  test.beforeEach(async ({ signIn, citizenUserUtils, citApplyingWithPage, citTaskListPage }) => {
    const userInfo = await citizenUserUtils.createUser();
    if (userInfo) {
      userEmail = userInfo.email as string;
      userPassword = userInfo.password;
    }
    await signIn.navigateTo();
    await signIn.signIn(userEmail, userPassword);
    await citApplyingWithPage.checkApplyingOnMyOwnRadioButton();
    await citApplyingWithPage.clickSaveAndContinue();
    await citTaskListPage.clickAdoptionAgencyLink();
  });

  test('check default page is in English', async ({ page }) => {
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

  test('check if page components are in correct visible state', async ({ citChildSocialWorkerDetailsPage }) => {
    await expect.soft(citChildSocialWorkerDetailsPage.applicationDetailsTitle).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.childSocialWorkerTitle).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.childSocialWorkerSubtitle).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.nameOfChildSocialWorkerText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.nameOfChildSocialWorkerLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.phoneNumberText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.phoneNumberLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.emailAddressText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.emailAddressLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.emailAddressHint).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.childLocalAuthorityText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.childLocalAuthorityInputLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.childLocalAuthorityDropdown).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.localAuthorityEmailText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.localAuthorityEmailLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.localAuthorityEmailHint).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.contactUsForHelpDropdownLink).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.contactACourtHeading).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.findACourtLink).toBeHidden({ timeout: 500 });

    await expect.soft(citChildSocialWorkerDetailsPage.errorNameOfChildSocialWorkerSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeHidden({ timeout: 500 });
    await expect
      .soft(citChildSocialWorkerDetailsPage.errorEmailFormatOptionalEmailSummary)
      .toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorNoEmailSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterLocalAuthoritySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorNonGovernmentEmail).toBeHidden({ timeout: 500 });

    await expect.soft(citChildSocialWorkerDetailsPage.saveAndContinue).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.saveAsDraft).toBeVisible();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing save and continue button without filling required field results in relevant errors', async ({
    citChildSocialWorkerDetailsPage,
  }) => {
    await citChildSocialWorkerDetailsPage.clickSaveAndContinue();

    await expect.soft(citChildSocialWorkerDetailsPage.errorNameOfChildSocialWorkerSummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeVisible();
    await expect
      .soft(citChildSocialWorkerDetailsPage.errorEmailFormatOptionalEmailSummary)
      .toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorNoEmailSummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterLocalAuthoritySummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorNonGovernmentEmail).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check adding non approved emails then pressing save and continue button results in relevant errors', async ({
    citChildSocialWorkerDetailsPage,
  }) => {
    await citChildSocialWorkerDetailsPage.fillEmailAddressLabel('test@mailnator.com');
    await citChildSocialWorkerDetailsPage.fillLocalAuthorityEmailLabel('test@mailnator.com');
    await citChildSocialWorkerDetailsPage.clickSaveAndContinue();

    await expect(citChildSocialWorkerDetailsPage.errorNonGovernmentEmail.nth(0)).toBeVisible();
    await expect(citChildSocialWorkerDetailsPage.errorNonGovernmentEmail.nth(1)).toBeVisible();
  });

  test('check adding incorrect phone number then pressing save and continue button results in UK telephone number error', async ({
    citChildSocialWorkerDetailsPage,
  }) => {
    await citChildSocialWorkerDetailsPage.fillPhoneNumberLabel('01622');
    await citChildSocialWorkerDetailsPage.clickSaveAndContinue();

    await expect(citChildSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeVisible();
  });

  test('check inserting data, saving draft then going back to page preserves data', async ({
    page,
    citChildSocialWorkerDetailsPage,
  }) => {
    await citChildSocialWorkerDetailsPage.fillNameOfChildSocialWorkerLabel('test');
    await citChildSocialWorkerDetailsPage.fillPhoneNumberLabel('01622 123456');
    await citChildSocialWorkerDetailsPage.selectLocalAuthority('Sandwell');
    await citChildSocialWorkerDetailsPage.fillLocalAuthorityEmailLabel('austen.stevens@justice.gov.uk');
    await citChildSocialWorkerDetailsPage.clickSaveAsDraft();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/save-as-draft`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await page.goBack();

    const expectedSocialWorkerValue = 'test';
    const expectedPhoneNumberValue = '01622 123456';
    const expectedLocalAuthoritValue = 'Sandwell Metropolitan Council';
    const expectedLocalAuthorityEmailValue = 'austen.stevens@justice.gov.uk';

    const actualSocialWorkerValue = await citChildSocialWorkerDetailsPage.nameOfChildSocialWorkerLabel.inputValue();
    const actualPhoneNumberValue = await citChildSocialWorkerDetailsPage.phoneNumberLabel.inputValue();
    const actualLocalAuthorityValue = await citChildSocialWorkerDetailsPage.childLocalAuthorityInputLabel.inputValue();
    const actualLocalAuthorityEmailValue = await citChildSocialWorkerDetailsPage.localAuthorityEmailLabel.inputValue();

    await expect.soft(actualSocialWorkerValue).toBe(expectedSocialWorkerValue);
    await expect.soft(actualPhoneNumberValue).toBe(expectedPhoneNumberValue);
    await expect.soft(actualLocalAuthorityValue).toBe(expectedLocalAuthoritValue);
    await expect.soft(actualLocalAuthorityEmailValue).toBe(expectedLocalAuthorityEmailValue);

    expect(test.info().errors).toHaveLength(0);
  });

  test('check inserting correct data then pressing save and continue advances to the next step', async ({
    page,
    citChildSocialWorkerDetailsPage,
  }) => {
    await citChildSocialWorkerDetailsPage.fillNameOfChildSocialWorkerLabel('test');
    await citChildSocialWorkerDetailsPage.fillPhoneNumberLabel('01622 123456');
    await citChildSocialWorkerDetailsPage.fillEmailAddressLabel('austen.stevens@justice.gov.uk');
    await citChildSocialWorkerDetailsPage.selectLocalAuthority('Sandwell');
    await citChildSocialWorkerDetailsPage.fillLocalAuthorityEmailLabel('austen.stevens@justice.gov.uk');
    await citChildSocialWorkerDetailsPage.clickSaveAndContinue();

    const expectedUrl = `${urlConfig.citizenFrontendBaseUrl}/children/applicant-social-worker`;
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);
  });
});
