const config = require('../config');

Feature('Primary applicant details section');

Scenario(
  'Enter primary applicant contact details',
  async ({ loginPage, primaryApplicantDetailsPage, taskListPage }) => {
    await loginPage.signInWithCitizenUser(config.citizenUserOne);
    await taskListPage.goToTaskListPage();
    await taskListPage.selectPrimaryApplicantContactDetails();
    await primaryApplicantDetailsPage.primaryApplicantContactDetailsSection();
  }
);
