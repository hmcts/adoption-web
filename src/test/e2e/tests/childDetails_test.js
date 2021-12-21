const config = require('../config');

Feature('Child Details');

Scenario('Child Details placement order details event', async ({ I, childDetailsPlacementOrderPage, taskListPage }) => {
  await I.goToPage(config.baseUrl);
  await I.signIn(config.citizenUserOne);
  await taskListPage.goToTaskListPage();
  await taskListPage.selectChildPlacementOrderDetails();
  await childDetailsPlacementOrderPage.childDetailsPlacementOrderSection();
});

Scenario(
  'Child Details Birth certificate details details event',
  async ({ I, childrenBirthCertificatePage, taskListPage }) => {
    await I.goToPage(config.baseUrl);
    await I.signIn(config.citizenUserOne);
    await taskListPage.goToTaskListPage();
    await taskListPage.selectChildrenBirthCertificate();
    await childrenBirthCertificatePage.childDetailsBirthCertificaterSection();
  }
);
