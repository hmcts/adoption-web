const config = require('../config');

Feature('Child Details');

Scenario(
  'Child Details placement order details event',
  async ({ loginPage, childDetailsPlacementOrderPage, taskListPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await taskListPage.goToTaskListPage();
    await taskListPage.selectChildPlacementOrderDetails();
    await childDetailsPlacementOrderPage.childDetailsPlacementOrderSection();
  }
);

Scenario(
  'Child Details Birth certificate details event',
  async ({ loginPage, childrenBirthCertificatePage, taskListPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await taskListPage.goToTaskListPage();
    await taskListPage.selectChildrenBirthCertificate();
    await childrenBirthCertificatePage.childDetailsBirthCertificaterSection();
    await taskListPage.verifyChildBirthCertificateDetailsStatus();
  }
);

Scenario(
  'Child Adoption certificate details event',
  async ({ loginPage, childAdoptionCertificateDetailsPage, taskListPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await taskListPage.goToTaskListPage();
    await taskListPage.selectChildAdoptionCertificateDetails();
    await childAdoptionCertificateDetailsPage.childAdoptionCertificateDetailsSection();
    await taskListPage.verifyAdoptionCertificateDetailStatus();
  }
);

Scenario('Child birth mother details event', async ({ loginPage, childBirthMothersDetailsPage, taskListPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await taskListPage.goToTaskListPage();
  await taskListPage.selectChildBirthMotherDetails();
  await childBirthMothersDetailsPage.childBirthMothersDetailsSection();
  await taskListPage.verifyChildBirthMotherDetailsStatus();
});

Scenario('Child birth father details event', async ({ loginPage, childBirthFatherDetailsPage, taskListPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await taskListPage.goToTaskListPage();
  await taskListPage.selectChildBirthFatherDetails();
  await childBirthFatherDetailsPage.childBirthFatherDetailsSection();
  await taskListPage.verifyChildBirthFatherDetailsStatus();
});

Scenario('Child other parent details event', async ({ loginPage, childOtherParentDetailsPage, taskListPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await taskListPage.goToTaskListPage();
  await taskListPage.selectChildOtherParentDetails();
  await childOtherParentDetailsPage.childOtherParentDetailsSection();
  await taskListPage.verifyChildOtherParentDetailsStatus();
});

Scenario(
  'Child adoption agency or local authority details event',
  async ({ loginPage, childAdoptionAgencyDetailsPage, taskListPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await taskListPage.goToTaskListPage();
    await taskListPage.selectChildAdoptionAgencyDetails();
    await childAdoptionAgencyDetailsPage.childAdoptionAgencyDetailsSection();
  }
);
Scenario('Child sibling details event', async ({ loginPage, childSiblingDetailsPage, taskListPage }) => {
  await loginPage.createCitizenUserAndSignIn();
  await taskListPage.goToTaskListPage();
  await taskListPage.selectSiblingDetails();
  await childSiblingDetailsPage.childDetailsSiblingSection();
});
