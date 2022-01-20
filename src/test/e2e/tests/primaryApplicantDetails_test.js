const config = require('../config');

Feature('Primary applicant details section');

Scenario(
  'Enter primary applicant contact details',
  async ({ loginPage, primaryApplicantDetailsPage, taskListPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await taskListPage.goToTaskListPage();
    await taskListPage.selectPrimaryApplicantContactDetails();
    await primaryApplicantDetailsPage.primaryApplicantContactDetailsSection();
  }
);

Scenario(
  'Enter primary applicant personal details',
  async ({ loginPage, primaryApplicantPersonalDetailsPage, taskListPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await taskListPage.goToTaskListPage();
    await taskListPage.selectFirstApplicantPersonalDetails();
    await primaryApplicantPersonalDetailsPage.primaryApplicantPersonalDetailsSection();
  }
);
