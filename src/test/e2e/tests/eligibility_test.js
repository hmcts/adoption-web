const config = require('../config');

Feature('Applicant Eligibility Criteria @functional-tests');

Scenario('Verify applicant eligible to adopt', async ({ landingPage, loginPage }) => {
  await loginPage.signInFromEligibility(config.citizenUserOne);
  await landingPage.seeTheLandingPage();
});
