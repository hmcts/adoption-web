import { test } from '../fixtures/fixtures';

test.describe('Create case', () => {
  let userInfo: { email: string; password: string };

  test.beforeEach(async ({ idamUtils, citizenUserUtils }) => {
    userInfo = await citizenUserUtils.createUser();
    const authToken = await idamUtils.generateIdamToken({
      grantType: "password",
      username: userInfo.email as string,
      password: userInfo.password as string,
      clientId: process.env.CCD_DATA_STORE_CLIENT_ID as string,
      clientSecret: process.env.IDAM_SECRET as string,
      scope: "openid profile roles",
    });
  process.env.CREATE_CASE_TOKEN = authToken; 
  });

  test('create citizen case', async ({ caseHelperUtils }) => {

    const newCase = await caseHelperUtils.createCase( {
      applicant1FirstName: 'John',
      applicant1LastName: 'Doe',
      applicant1Email: 'john.doe@example.com',
    });
  });
});
