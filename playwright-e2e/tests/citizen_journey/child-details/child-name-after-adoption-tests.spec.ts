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
});
