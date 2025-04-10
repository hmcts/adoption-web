import { expect, test } from '../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../hooks/createDeleteUser.hook';
import { urlConfig } from '../../utils/urls';
test.describe('Citizen Journey task list page test single parent', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(async ({ signIn, citApplyingWithPage }) => {
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
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  test('check default page is in English', async ({ page }) => {
    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^en/);
  });

  test('check page is in Welsh after clicking Welsh language link', async ({ page, citTaskListPage }) => {
    await citTaskListPage.clickLanguageLink();

    const langAttribute = await page.getAttribute('html', 'lang');

    expect(langAttribute).toMatch(/^cy/);
  });

  test('check number of applicants status is marked completed', async ({ citTaskListPage }) => {
    const expected = 'Completed';

    const actual = await citTaskListPage.numberOfApplicantsStatus.textContent();

    expect(actual).toContain(expected);
  });

  test('check date child moved in is marked not started', async ({ citTaskListPage }) => {
    const expected = 'Not Started';

    const actual = await citTaskListPage.dateChildMovedInStatus.textContent();

    expect(actual).toContain(expected);
  });

  test('check child detail is marked not started', async ({ citTaskListPage }) => {
    const expected = 'Not Started';

    const actual = await citTaskListPage.childDetailsStatus.textContent();

    expect(actual).toContain(expected);
  });

  test('check adoption agency is marked not started', async ({ citTaskListPage }) => {
    const expected = 'Not Started';

    const actual = await citTaskListPage.adoptionAgencyStatus.textContent();

    expect(actual).toContain(expected);
  });

  test('check family court is marked not started', async ({ citTaskListPage }) => {
    const expected = 'Not Started';

    const actual = await citTaskListPage.familyCourtStatus.textContent();

    expect(actual).toContain(expected);
  });

  test('check first personal detail is marked in progress', async ({ citTaskListPage }) => {
    const expected = 'In Progress';

    const actual = await citTaskListPage.firstApplicantPersonalDetailsStatus.textContent();

    expect(actual).toContain(expected);
  });

  test('check first contact details is marked not started', async ({ citTaskListPage }) => {
    const expected = 'Not Started';

    const actual = await citTaskListPage.firstApplicantContactDetailsStatus.textContent();

    expect(actual).toContain(expected);
  });

  test('check second personal details to be hidden', async ({ citTaskListPage }) => {
    await expect.soft(citTaskListPage.secondApplicantPersonalDetailsStatus).toBeHidden({ timeout: 500 });
    await expect.soft(citTaskListPage.secondApplicantContactDetailsStatus).toBeHidden({ timeout: 500 });

    expect(test.info().errors).toHaveLength(0);
  });

  test('check review pay and submit your application status to be cannot start yet', async ({ citTaskListPage }) => {
    const expected = 'Cannot start yet';

    const actual = await citTaskListPage.reviewPayAndSubmitStatus.textContent();

    expect(actual).toBe(expected);
  });

  test('check number of applicants link goes to expected URL', async ({ citTaskListPage, page }) => {
    const expected = `${urlConfig.citizenFrontendBaseUrl}/applying-with`;

    await citTaskListPage.clickNumberOfApplicantsLink();

    expect(page.url()).toBe(expected);
  });

  test('check date child moved in link goes to expected URL', async ({ citTaskListPage, page }) => {
    const expected = `${urlConfig.citizenFrontendBaseUrl}/date-child-moved-in`;

    await citTaskListPage.clickDateChildMovedInLink();

    expect(page.url()).toBe(expected);
  });

  test('check child details link goes to expected URL', async ({ citTaskListPage, page }) => {
    const expected = `${urlConfig.citizenFrontendBaseUrl}/children/full-name`;

    await citTaskListPage.clickChildDetailsLink();

    expect(page.url()).toBe(expected);
  });

  test('check adoption agency link goes to expected URL', async ({ citTaskListPage, page }) => {
    const expected = `${urlConfig.citizenFrontendBaseUrl}/children/social-worker`;

    await citTaskListPage.clickAdoptionAgencyLink();

    expect(page.url()).toBe(expected);
  });

  test('check family court link goes to expected URL', async ({ citTaskListPage, page }) => {
    const expected = `${urlConfig.citizenFrontendBaseUrl}/children/find-placement-order-court`;

    await citTaskListPage.clickFamilyCourtLink();

    expect(page.url()).toBe(expected);
  });

  test('check applicant 1 personal details link goes to expected URL', async ({ citTaskListPage, page }) => {
    const expected = `${urlConfig.citizenFrontendBaseUrl}/applicant1/full-name`;

    await citTaskListPage.clickFirstApplicantPersonalDetailsLink();

    expect(page.url()).toBe(expected);
  });

  test('check applicant 1 contact details link goes to expected URL', async ({ citTaskListPage, page }) => {
    const expected = `${urlConfig.citizenFrontendBaseUrl}/applicant1/address/lookup`;

    await citTaskListPage.clickFirstAppicantContactDetailsLink();

    expect(page.url()).toBe(expected);
  });
});
