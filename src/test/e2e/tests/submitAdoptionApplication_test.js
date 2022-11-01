const createCase = require('../helpers/createCUICase.js');
Feature('Create application').retry(1);
Scenario(
  'Create full application and submit @cross-browser',
  async ({
    landingPage,
    taskListPage,
    childDetailsPlacementOrderPage,
    childrenBirthCertificatePage,
    childBirthMothersDetailsPage,
    childBirthFatherDetailsPage,
    childOtherParentDetailsPage,
    childSiblingDetailsPage,
    uploadDocumentsDetailsPage,
    laCheckYourAnswersPage,
  }) => {
    // CUI - create case
    const caseId = await createCase.createCUICase();
    await landingPage.searchForCaseInLALandingPage(caseId);

    //  LA - Add child's details

    await taskListPage.selectChildrenBirthCertificate();
    await childrenBirthCertificatePage.childDetailsBirthCertificaterSection();
    await taskListPage.verifyChildBirthCertificateDetailsStatus();

    await taskListPage.selectChildBirthMotherDetails();
    await childBirthMothersDetailsPage.childBirthMothersDetailsSection();
    await taskListPage.verifyChildBirthMotherDetailsStatus();

    await taskListPage.selectChildBirthFatherDetails();
    await childBirthFatherDetailsPage.childBirthFatherDetailsSection();
    await taskListPage.verifyChildBirthFatherDetailsStatus();

    await taskListPage.selectChildOtherParentDetails();
    await childOtherParentDetailsPage.childOtherParentDetailsSection();

    await taskListPage.verifyChildOtherParentDetailsStatus();

    await taskListPage.selectChildPlacementOrderDetails();
    await childDetailsPlacementOrderPage.childDetailsPlacementOrderSection();
    await taskListPage.verifyChildPlacementOrderDetailsStatus();

    await taskListPage.selectSiblingDetails();
    await childSiblingDetailsPage.childDetailsSiblingSection();
    await taskListPage.verifySiblingDetailsStatus();

    await taskListPage.selectUploadDocumentsDetails();
    // TODO bug Created for this change
    // await uploadDocumentsDetailsPage.uploadDocumentsSection();
    await uploadDocumentsDetailsPage.uploadDocumentsSectionWithCantNotUploadOption();
    await taskListPage.verifyUploadDocumentsStatus();
    await taskListPage.selectReviewAndSubmit();

    await laCheckYourAnswersPage.laCheckYourAnswersContinue();
    await laCheckYourAnswersPage.laStatementOfTruthPage();
    await laCheckYourAnswersPage.laSubmitApplicationConfirmationPage();
  }
);
