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
  'Child Details Birth certificate details details event',
  async ({ loginPage, childrenBirthCertificatePage, taskListPage }) => {
    await loginPage.signInWithCitizenUser(config.citizenUserOne);
    await taskListPage.goToTaskListPage();
    await taskListPage.selectChildrenBirthCertificate();
    await childrenBirthCertificatePage.childDetailsBirthCertificaterSection();
  }
);
