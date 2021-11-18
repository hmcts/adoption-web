const config = require('../e2e/config');

Feature('Smoke tests @smoke-tests');

Scenario('Sign in as citizen and create a case', async ({I,landingPage}) => {
  console.log(`${process.env.ADOP_WEB_URL}`);
  await I.goToPage(`${process.env.ADOP_WEB_URL}`);
  await I.signIn(config.legalProfessionalUserOne);
  await landingPage.seeTheLandingPage();
});
