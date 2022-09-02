Feature('E2E Negative').retry(1);

Scenario(
  'Create full application and submit negative @cross-browser',
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
  }) => {
    await loginPage.createCitizenUserAndSignIn();
    await landingPage.seeTheLandingPage();
    await landingPage.continueWithoutSelection();
    await landingPage.selectApplyWithMySpouseSection();

    await taskListPage.selectDateChildMovedInDetails();
    await dateChildMovedinDetailsPage.dateChildMovedInSectionWithoutData();
    await taskListPage.verifyDateChildMovedInStatus();

    await taskListPage.selectChildAdoptionAgencyDetails();
    await childAdoptionAgencyDetailsPage.childSocialWorkerDetailsSection();
    await childAdoptionAgencyDetailsPage.yourSocialWorkerDetailsSection();
    await childAdoptionAgencyDetailsPage.childAdoptionAgencyDetailsSection();
    await taskListPage.verifyChildAdoptionAgencyDetailsStatus;

    await taskListPage.selectPrimaryApplicantContactDetails();
    await primaryApplicantDetailsPage.primaryApplicantContactDetailsSectionEmpty();
    await taskListPage.verifyPrimaryApplicantContactDetailsStatus();

    await taskListPage.selectFirstApplicantPersonalDetails();
    await primaryApplicantPersonalDetailsPage.primaryApplicantPersonalDetailsSectionEmptyfields();
    await taskListPage.verifyPrimaryApplicantPersonalDetailsStatus();

    await taskListPage.selectOtherApplicantContactDetails();
    await otherApplicantDetailsPage.otherApplicantContactDetailsSection();
    await taskListPage.verifySecondApplicantPersonalDetailsStatus();

    await taskListPage.selectOtherApplicantPersonalDetails();
    await otherApplicantPersonalDetailsPage.otherApplicantPersonalDetailsSectionEmpty();
    await taskListPage.verifyOtherApplicantPersonalDetailsStatus();

    //TODO in future stories

    // await taskListPage.selectChildrenBirthCertificate();
    // await childrenBirthCertificatePage.childDetailsBirthCertificaterSection();
    // await taskListPage.verifyChildBirthCertificateDetailsStatus();
    //
    // await taskListPage.selectChildChildDetails();
    // await childsDetailsPage.childFullNameSection();
    // await childsDetailsPage.childNameAfterAdoptionDetailsSection();
    // await taskListPage.verifyChildDetailsStatus();
    //
    // await taskListPage.selectChildBirthMotherDetails();
    // await childBirthMothersDetailsPage.childBirthMothersDetailsSection();
    // await taskListPage.verifyChildBirthMotherDetailsStatus();
    //
    // await taskListPage.selectChildBirthFatherDetails();
    // await childBirthFatherDetailsPage.childBirthFatherDetailsSection();
    // await taskListPage.verifyChildBirthFatherDetailsStatus();
    //
    // await taskListPage.selectChildOtherParentDetails();
    // await childOtherParentDetailsPage.childOtherParentDetailsSection();
    // await taskListPage.verifyChildOtherParentDetailsStatus();
    //
    // await taskListPage.selectChildPlacementOrderDetails();
    // await childDetailsPlacementOrderPage.childDetailsPlacementOrderSection();
    //
    // await taskListPage.selectSiblingDetails();
    // await childSiblingDetailsPage.childDetailsSiblingSection();
    // await taskListPage.verifySiblingDetailsStatus();

    await taskListPage.selectChooseYourFamilyCourtDetails();
    await chooseYourFamilyCourtDetailsPage.childDetailsFindFamilyCourtSection();
    await taskListPage.verifyChooseYourFamilyCourtStatus();

    // await taskListPage.selectUploadDocumentsDetails();
    // await uploadDocumentsDetailsPage.uploadDocumentsSectionEmpty();
    // await taskListPage.verifyUploadDocumentsStatus();

    await taskListPage.selectReviewPayAndSubmitDetails();
    await reviewPayAndSubmitPage.selectNoPCQOption();
    await reviewPayAndSubmitPage.changeValueFromReviewYourAnswers();
    await dateChildMovedinDetailsPage.editDateChildMovedInSection();
    await reviewPayAndSubmitPage.reviewYourAnswersAndContinue();
    await reviewPayAndSubmitPage.statementOfTruthDetailsSectionEmpty();
    await reviewPayAndSubmitPage.paymentCancellation();
    await reviewPayAndSubmitPage.adoptionCourtFeesByCard();
  }
);
