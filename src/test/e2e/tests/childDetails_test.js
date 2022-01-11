const config = require('../config');

Feature('Child Details');

Scenario(
  'Child Details placement order details event',
  async ({ loginPage, childDetailsPlacementOrderPage, taskListPage }) => {
    await loginPage.signInWithCitizenUser(config.citizenUserOne);
    await taskListPage.goToTaskListPage();
    await taskListPage.selectChildPlacementOrderDetails();
    await childDetailsPlacementOrderPage.childDetailsPlacementOrderSection();
  }
);

Scenario(
  'Child Details Birth certificate details event',
  async ({ loginPage, childrenBirthCertificatePage, taskListPage }) => {
    await loginPage.signInWithCitizenUser(config.citizenUserOne);
    await taskListPage.goToTaskListPage();
    await taskListPage.selectChildrenBirthCertificate();
    await childrenBirthCertificatePage.childDetailsBirthCertificaterSection();
    await taskListPage.verifyChildBirthCertificateDetailsStatus();
  }
);

Scenario(
  'Child Adoption certificate details event',
  async ({ loginPage, childAdoptionCertificateDetailsPage, taskListPage }) => {
    await loginPage.signInWithCitizenUser(config.citizenUserOne);
    await taskListPage.goToTaskListPage();
    await taskListPage.selectChildAdoptionCertificateDetails();
    await childAdoptionCertificateDetailsPage.childAdoptionCertificateDetailsSection();
    await taskListPage.verifyAdoptionCertificateDetailStatus();
  }
);

Scenario('Child birth mother details event', async ({ loginPage, childBirthMothersDetailsPage, taskListPage }) => {
  await loginPage.signInWithCitizenUser(config.citizenUserOne);
  await taskListPage.goToTaskListPage();
  await taskListPage.selectChildBirthMotherCertificateDetails();
  await childBirthMothersDetailsPage.childBirthMothersDetailsSection();
  await taskListPage.verifyChildBirthMotherCertificateDetailsStatus();
});
