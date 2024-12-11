import { expect, test } from '../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../hooks/createDeleteUser.hook';
test.describe('Citizen Journey task list page test', () => {
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
});
