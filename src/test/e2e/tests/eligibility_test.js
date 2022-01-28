const config = require('../config');

Feature('Applicant Eligibility Criteria').retry(3);

Scenario('Verify applicant eligible to adopt', async ({ landingPage, loginPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await landingPage.seeTheLandingPage();
});
