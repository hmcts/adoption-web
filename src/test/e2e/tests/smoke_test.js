const config = require('../config');

Feature('Smoke tests @cross-browser').retry(1);

Scenario('Sign in as citizen and create a case', async ({ loginPage, landingPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await landingPage.seeTheLandingPage();
});
