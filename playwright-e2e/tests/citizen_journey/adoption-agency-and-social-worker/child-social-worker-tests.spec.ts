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
    await expect.soft(citChildSocialWorkerDetailsPage.nameOfChildSocialWorkerText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.nameOfChildSocialWorkerLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.phoneNumberText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.phoneNumberLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.emailAddressText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.emailAddressLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.childLocalAuthorityText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.localAuthorityInputLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.localAuthorityDropdown).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.localAuthorityEmailText).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.localAuthorityEmailLabel).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.contactUsForHelpDropdownLink).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.contactACourtHeading).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.findACourtLink).toBeHidden({ timeout: 500 });

    await expect.soft(citChildSocialWorkerDetailsPage.errorNameOfChildSocialWorkerSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorNoOptionalChildEmailSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorNoChildEmailSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterLocalAuthoritySummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorNonGovernmentEmail).toBeHidden({ timeout: 500 });

    await expect.soft(citChildSocialWorkerDetailsPage.saveAndContinue).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.saveAsDraft).toBeVisible();

    expect(test.info().errors).toHaveLength(0);
  });

  test('check pressing save and conitnue button without filling required field results in relevant errors', async ({
    citChildSocialWorkerDetailsPage,
  }) => {
    await citChildSocialWorkerDetailsPage.clickSaveAndContinue();

    await expect.soft(citChildSocialWorkerDetailsPage.errorNameOfChildSocialWorkerSummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorNoOptionalChildEmailSummary).toBeHidden({ timeout: 500 });
    await expect.soft(citChildSocialWorkerDetailsPage.errorNoChildEmailSummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterLocalAuthoritySummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorNonGovernmentEmail).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check incorrect format email results then pressing save and continue button results in relevant errors', async ({
    citChildSocialWorkerDetailsPage,
  }) => {
    await citChildSocialWorkerDetailsPage.fillEmailAddressLabel('test');
    await citChildSocialWorkerDetailsPage.clickSaveAndContinue();

    await expect.soft(citChildSocialWorkerDetailsPage.errorNameOfChildSocialWorkerSummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorNoOptionalChildEmailSummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorNoChildEmailSummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorEnterLocalAuthoritySummary).toBeVisible();
    await expect.soft(citChildSocialWorkerDetailsPage.errorNonGovernmentEmail).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check adding incorrect phone number then pressing save and continue button results in UK telephone number error', async ({
    citChildSocialWorkerDetailsPage,
  }) => {
    await citChildSocialWorkerDetailsPage.fillNameOfChildSocialWorkerLabel('test');
    await citChildSocialWorkerDetailsPage.fillPhoneNumberLabel('01622');
    await citChildSocialWorkerDetailsPage.selectLocalAuthority('Sandwell');
    await citChildSocialWorkerDetailsPage.fillLocalAuthorityEmailLabel('ASTS@justice.gov.uk');
    await citChildSocialWorkerDetailsPage.clickSaveAndContinue();

    await expect(citChildSocialWorkerDetailsPage.errorEnterUKPhoneNumberSummary).toBeVisible();
  });

  test('check adding non approved goverment email address then pressing svae and continue button results in non approved error', async ({
    citChildSocialWorkerDetailsPage,
  }) => {
    await citChildSocialWorkerDetailsPage.fillNameOfChildSocialWorkerLabel('test');
    await citChildSocialWorkerDetailsPage.fillPhoneNumberLabel('01622 123456');
    await citChildSocialWorkerDetailsPage.selectLocalAuthority('Sandwell');
    await citChildSocialWorkerDetailsPage.fillLocalAuthorityEmailLabel('ASTS@justice.uk');
    await citChildSocialWorkerDetailsPage.clickSaveAndContinue();

    await expect(citChildSocialWorkerDetailsPage.errorNonGovernmentEmail).toBeHidden({ timeout: 500 });
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

    const expectedUrl = 'https://adoption-web.aat.platform.hmcts.net/save-as-draft';
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);

    await page.goBack();

    const expectedSocialWorkerValue = 'test';
    const expectedPhoneNumberValue = '01622 123456';
    const expectedLocalAuthoritValue = 'Sandwell Metropolitan Council';
    const expectedLocalAuthorityEmailValue = 'austen.stevens@justice.gov.uk';

    const actualSocialWorkerValue = await citChildSocialWorkerDetailsPage.nameOfChildSocialWorkerLabel.inputValue();
    const actualPhoneNumberValue = await citChildSocialWorkerDetailsPage.phoneNumberLabel.inputValue();
    const actualLocalAuthorityValue = await citChildSocialWorkerDetailsPage.localAuthorityInputLabel.inputValue();
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
    await citChildSocialWorkerDetailsPage.selectLocalAuthority('Sandwell');
    await citChildSocialWorkerDetailsPage.fillLocalAuthorityEmailLabel('austen.stevens@justice.gov.uk');
    await citChildSocialWorkerDetailsPage.clickSaveAndContinue();

    const expectedUrl = 'https://adoption-web.aat.platform.hmcts.net/children/applicant-social-worker';
    const actualUrl = page.url();
    await expect(actualUrl).toBe(expectedUrl);
  });
});
