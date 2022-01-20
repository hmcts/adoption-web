const config = require('../config');

Feature('Task list page');

Scenario('Verify task list page', async ({ loginPage, landingPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await landingPage.seeTheLandingPage();
});
