const config = require('../config');

Feature('Smoke tests @smoke-tests');

Scenario('Sign in as citizen and create a case', async ({ loginPage, landingPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await landingPage.seeTheLandingPage();
});
