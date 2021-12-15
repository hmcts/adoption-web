const config = require('../config');

Feature('Smoke tests @smoke-tests');

Scenario('Sign in as citizen and create a case', async ({ I, landingPage }) => {
  await I.goToPage(config.baseUrl);
  await I.signIn(config.citizenUserOne);
  await landingPage.seeTheLandingPage();
});
