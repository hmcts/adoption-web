import { test } from '../fixtures/fixtures';

 test.describe('Create case', () => {
    let userEmail: string;
    let userPassword: string;
    test.beforeEach(async ({ page, citizenUserUtils }) => {
    const userInfo = await citizenUserUtils.createUser();
    if (userInfo) {
      userEmail = userInfo.email;
      userPassword = userInfo.password;
    }
   });
 
   test(
    'create citizen case',
    async ({ caseUtils }) => {
       let token = await caseUtils.createCase();
       console.log(token);
    }
   );
});