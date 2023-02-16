Feature('Create application').retry(1);
Scenario(
  'Create full application and submit @cross-browser',
  async ({
    loginPage,
    landingPage,
    taskListPage,
    childDetailsPlacementOrderPage,
    childrenBirthCertificatePage,
    childsDetailsPage,
    childBirthMothersDetailsPage,
    childBirthFatherDetailsPage,
    childOtherParentDetailsPage,
    childAdoptionAgencyDetailsPage,
    childSiblingDetailsPage,
    otherApplicantDetailsPage,
    otherApplicantPersonalDetailsPage,
    primaryApplicantDetailsPage,
    primaryApplicantPersonalDetailsPage,
    reviewPayAndSubmitPage,
    uploadDocumentsDetailsPage,
    dateChildMovedinDetailsPage,
    chooseYourFamilyCourtDetailsPage,
    laCheckYourAnswersPage,
  }) => {
    await loginPage.createCitizenUserAndSignIn();
    await landingPage.seeTheLandingPage();
    await landingPage.selectApplyWithMySpouseSection();

    //  Add application details

    await taskListPage.selectDateChildMovedInDetails();
    await dateChildMovedinDetailsPage.dateChildMovedInSection();
    await taskListPage.verifyDateChildMovedInStatus();

    await taskListPage.selectChildChildDetails();
    await childsDetailsPage.childFullNameSection();
    await childsDetailsPage.childNameAfterAdoptionDetailsSection();
    await childsDetailsPage.childDOBSection();
    await taskListPage.verifyChildDetailsStatus();

    await taskListPage.selectChildAdoptionAgencyDetails();
    await childAdoptionAgencyDetailsPage.childSocialWorkerDetailsSection();
    await childAdoptionAgencyDetailsPage.yourSocialWorkerDetailsSection();
    await childAdoptionAgencyDetailsPage.childAdoptionAgencyDetailsSection();
    await taskListPage.verifyChildAdoptionAgencyDetailsStatus;

    await taskListPage.selectChooseYourFamilyCourtDetails();
    await chooseYourFamilyCourtDetailsPage.childDetailsFindFamilyCourtSection();
    await taskListPage.verifyChooseYourFamilyCourtStatus();

    // Add applicant's details

    await taskListPage.selectPrimaryApplicantContactDetails();
    await primaryApplicantDetailsPage.primaryApplicantContactDetailsSection();
    await taskListPage.verifyPrimaryApplicantContactDetailsStatus();

    await taskListPage.selectFirstApplicantPersonalDetails();
    await primaryApplicantPersonalDetailsPage.primaryApplicantPersonalDetailsSection();
    await primaryApplicantPersonalDetailsPage.additionalDetailsForApplicant1();
    await taskListPage.verifyPrimaryApplicantPersonalDetailsStatus();

    await taskListPage.selectOtherApplicantContactDetails();
    await otherApplicantDetailsPage.otherApplicantContactDetailsSection();
    await taskListPage.verifySecondApplicantPersonalDetailsStatus();

    await taskListPage.selectOtherApplicantPersonalDetails();
    await otherApplicantPersonalDetailsPage.otherApplicantPersonalDetailsSection();
    await otherApplicantPersonalDetailsPage.additionalDetailsForApplicant2();
    await taskListPage.verifyOtherApplicantPersonalDetailsStatus();

    await taskListPage.selectReviewPayAndSubmitDetails();
    await reviewPayAndSubmitPage.selectNoPCQOption();
    await reviewPayAndSubmitPage.changeValueFromReviewYourAnswers();
    await dateChildMovedinDetailsPage.editDateChildMovedInSection();
    await reviewPayAndSubmitPage.reviewYourAnswersAndContinue();
    await reviewPayAndSubmitPage.statementOfTruthDetailsSection();
    await reviewPayAndSubmitPage.reviewAndPay();
    await reviewPayAndSubmitPage.adoptionCourtFeesByCard();
    const caseId = await reviewPayAndSubmitPage.getCaseIDAfterAplicationSubmit();

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
