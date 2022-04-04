const config = require('../config');

Feature('Applicant Eligibility Criteria ').retry(1);

Scenario('Verify applicant eligible to adopt @master', async ({ landingPage, loginPage }) => {
  await loginPage.signInFromEligibility();
  await landingPage.seeTheLandingPage();
});
