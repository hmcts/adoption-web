Feature('Landing Page Error Scenario').retry(1);

Scenario('User continue to next page without selecting any option', async ({ loginPage, landingPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await landingPage.seeTheLandingPage();
  await landingPage.errorWithOutSelectOption();
});
