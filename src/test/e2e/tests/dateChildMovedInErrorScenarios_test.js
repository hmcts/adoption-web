Feature('Date child moved in  Error Scenario').retry(1);

Scenario(
  'User continue to next page without selecting any option',
  async ({ loginPage, landingPage, taskListPage, dateChildMovedinDetailsPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await landingPage.seeTheLandingPage();
    await landingPage.selectApplyWithMySpouseSection();
    await taskListPage.selectDateChildMovedInDetails();
    await dateChildMovedinDetailsPage.errorWithOutSelectingDateOption();
  }
);
