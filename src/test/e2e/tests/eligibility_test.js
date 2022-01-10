const config = require('../config');

Feature('Applicant Eligibility Criteria @cross-browser');

Scenario('Verify applicant eligible to adopt', async ({ landingPage, loginPage }) => {
  await loginPage.signInFromEligibility(config.citizenUserOne);
  await landingPage.seeTheLandingPage();
});
