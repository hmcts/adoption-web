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

Scenario(
  'Enter primary applicant personal details',
  async ({ I, primaryApplicantPersonalDetailsPage, taskListPage }) => {
    await I.goToPage(config.baseUrl);
    await I.signIn(config.citizenUserOne);
    await taskListPage.goToTaskListPage();
    await taskListPage.selectFirstApplicantPersonalDetails();
    await primaryApplicantPersonalDetailsPage.primaryApplicantPersonalDetailsSection();
  }
);
