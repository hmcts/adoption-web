const config = require('../config');

Feature('Other applicant details section').retry(3);

Scenario('Enter other applicant contact details', async ({ loginPage, otherApplicantDetailsPage, taskListPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await taskListPage.goToTaskListPage();
  await taskListPage.selectOtherApplicantContactDetails();
  await otherApplicantDetailsPage.otherApplicantContactDetailsSection();
});

Scenario(
  'Enter other applicant personal details',
  async ({ loginPage, otherApplicantPersonalDetailsPage, taskListPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await taskListPage.goToTaskListPage();
    await taskListPage.selectOtherApplicantPersonalDetails();
    await otherApplicantPersonalDetailsPage.otherApplicantPersonalDetailsSection();
    await taskListPage.verifyOtherApplicantPersonalDetailsStatus();
  }
);
