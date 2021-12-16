const config = require('../config');

Feature('Other applicant details section');

Scenario('Enter other applicant contact details', async ({ I, otherApplicantDetailsPage, taskListPage }) => {
  await I.goToPage(config.baseUrl);
  await I.signIn(config.citizenUserOne);
  await taskListPage.goToTaskListPage();
  await taskListPage.selectOtherApplicantContactDetails();
  await otherApplicantDetailsPage.otherApplicantContactDetailsSection();
});
