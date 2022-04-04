Feature('Adoption agency or local authority details  Error Scenarios').retry(1);

Scenario(
  'Error scenarios in Adoption agency page',
  async ({ loginPage, landingPage, taskListPage, childAdoptionAgencyDetailsPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await landingPage.seeTheLandingPage();
    await landingPage.selectApplyWithMySpouseSection();
    await taskListPage.selectChildAdoptionAgencyDetails();
    await childAdoptionAgencyDetailsPage.errorWithOutSelectingAdoptionAgencyOption();
  }
);

Scenario(
  'Error scenarios in childs social worker page',
  async ({ loginPage, landingPage, taskListPage, childAdoptionAgencyDetailsPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await landingPage.seeTheLandingPage();
    await landingPage.selectApplyWithMySpouseSection();
    await taskListPage.selectChildAdoptionAgencyDetails();
    await childAdoptionAgencyDetailsPage.childAdoptionAgencyDetailsSection();
    await childAdoptionAgencyDetailsPage.noOtherAdoptionDetails();
    await childAdoptionAgencyDetailsPage.errorsInChildSocialWorkerPage();
  }
);
