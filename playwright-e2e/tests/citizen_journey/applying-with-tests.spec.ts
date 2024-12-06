import { expect, test } from '../../fixtures/fixtures';
import { setupUser, teardownUser } from '../../hooks/createDeleteUser.hook';

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

  test('check page title is visible', async ({ citApplyingWithPage }) => {
    await citApplyingWithPage.applicationDetailsTitle.waitFor();
    await expect(citApplyingWithPage.applicationDetailsTitle).toBeVisible();
  });
});
