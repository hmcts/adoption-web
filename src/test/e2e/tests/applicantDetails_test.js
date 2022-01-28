Feature('Number of applicants').retry(3);

Scenario('Verify apply my own option @cross-browser', async ({ loginPage, landingPage, taskListPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await landingPage.seeTheLandingPage();
  await landingPage.selectApplyOnMyownSection();
  await taskListPage.verifySecondApplicantSectionNotDisplayed();
});
