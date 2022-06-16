const config = require('../config');

Feature('Save As Draft tests').retry(1);

Scenario(
  'Verify child adoption agency save as draft',
  async ({ loginPage, landingPage, taskListPage, childAdoptionAgencyDetailsPage, saveAsDraftPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await landingPage.seeTheLandingPage();
    await landingPage.selectApplyWithMySpouseSection();

    await taskListPage.selectChildAdoptionAgencyDetails();
    await childAdoptionAgencyDetailsPage.childAdoptionAgencyDetailsSaveAsDraft();
    await saveAsDraftPage.saveAsDraftConfirmation();
    await taskListPage.verifyChildAdoptionAgencyInProgresStatus();
  }
);

//TODO waiting for  LA Save as Draft functionality

// Scenario(
//   'Verify child birth father details save as draft',
//   async ({ loginPage, landingPage, taskListPage, childBirthFatherDetailsPage, saveAsDraftPage }) => {
//     await loginPage.createCitizenUserAndSignIn();
//     await landingPage.seeTheLandingPage();
//     await landingPage.selectApplyWithMySpouseSection();
//
//     await taskListPage.selectChildBirthFatherDetails();
//     await childBirthFatherDetailsPage.childBirthFatherDetailsSaveAsDraft();
//     await saveAsDraftPage.saveAsDraftConfirmation();
//     await taskListPage.verifyChildBirthFatherInProgresStatus();
//   }
// );
