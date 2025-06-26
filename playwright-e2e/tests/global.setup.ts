import { test as setup } from '../fixtures/fixtures';
/**
 * Sets up test sessions for all required user roles and stores session data.
 *
 * This setup script can be reused for each user type individually.
 * Note: Manually signing out duiring tests will invalidate the stored session.
 * For ExUI users, sessions are currently valid for 8 hours.
 */
setup.describe('Set up users and retrieve tokens', () => {
  /**
   * Retrieve an IDAM bearer token at the beginning of the test run
   *
   * This token is used to authorise user creation and is stored as an
   * environment variable (`CREATE_USER_BEARER_TOKEN`) for reuse across the test suite
   */
  setup('Retrieve IDAM token for citizen user creation', async ({ idamUtils }) => {
    const bearerToken = await idamUtils.generateIdamToken({
      grantType: 'client_credentials',
      clientId: 'adoption-web',
      clientSecret: process.env.IDAM_SECRET as string,
      scope: 'profile roles',
    });
    process.env.CREATE_USER_BEARER_TOKEN = bearerToken;
  });

  setup('Retrieve IDAM token for case creation', async ({ idamUtils }) => {
    const authToken = await idamUtils.generateIdamToken({
      grantType: "password",
      username: process.env.CCD_DATA_STORE_CLIENT_USERNAME as string,
      password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD as string,
      clientId: 'adoption-web',
      clientSecret: process.env.IDAM_SECRET as string,
      scope: "openid profile roles",
      redirectUri: process.env.MANAGE_CASE_REDIRECT_URI as string,
    });
  process.env.CREATE_CASE_TOKEN = authToken; 
  });

  setup('Retrieve IDAM token for case creation', async ({ idamUtils }) => {
    const authToken = await idamUtils.generateIdamToken({
      grantType: "password",
      username: process.env.CCD_DATA_STORE_CLIENT_USERNAME as string,
      password: process.env.CCD_DATA_STORE_CLIENT_PASSWORD as string,
      clientId: 'adoption-web',
      clientSecret: process.env.IDAM_SECRET as string,
      scope: "openid profile roles",
      redirectUri: process.env.MANAGE_CASE_REDIRECT_URI as string,
    });
  process.env.CREATE_CASE_TOKEN = authToken; 
  });

});
