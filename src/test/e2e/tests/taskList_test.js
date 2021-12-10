const config = require('../config');

Feature('Task list page');

Scenario('Verify task list page', async ({ I, landingPage }) => {
  await I.goToPage(config.baseUrl);
  await I.signIn(config.citizenUserOne);
  await landingPage.seeTheLandingPage();
});
