Feature('Creat application');

Scenario(
  'Creat full application and submit @cross-browser',
  async ({
    loginPage,
    landingPage,
    taskListPage,
    childDetailsPlacementOrderPage,
    childrenBirthCertificatePage,
    childAdoptionCertificateDetailsPage,
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
    await landingPage.selectApplyWithMySpouseSection();

    // await taskListPage.selectDateChildMovedInDetails();
    // await dateChildMovedinDetailsPage.dateChildMovedInSection('10', '10', '2020');
    // await taskListPage.verifyDateChildMovedInStatus();
    //
    // await taskListPage.selectPrimaryApplicantContactDetails();
    // await primaryApplicantDetailsPage.primaryApplicantContactDetailsSection();
    // await taskListPage.verifyPrimaryApplicantContactDetailsStatus();
    //
    // await taskListPage.selectFirstApplicantPersonalDetails();
    // await primaryApplicantPersonalDetailsPage.primaryApplicantPersonalDetailsSection();
    // await taskListPage.verifyPrimaryApplicantPersonalDetailsStatus();
    //
    // await taskListPage.selectOtherApplicantContactDetails();
    // await otherApplicantDetailsPage.otherApplicantContactDetailsSection();
    // await taskListPage.verifySecondApplicantPersonalDetailsStatus();
    //
    // await taskListPage.selectOtherApplicantPersonalDetails();
    // await otherApplicantPersonalDetailsPage.otherApplicantPersonalDetailsSection();
    // await taskListPage.verifyOtherApplicantPersonalDetailsStatus();
    //
    // await taskListPage.selectChildPlacementOrderDetails();
    // await childDetailsPlacementOrderPage.childDetailsPlacementOrderSection();
    //
    // await taskListPage.selectChildrenBirthCertificate();
    // await childrenBirthCertificatePage.childDetailsBirthCertificaterSection();
    // await taskListPage.verifyChildBirthCertificateDetailsStatus();
    //
    // await taskListPage.selectChildAdoptionCertificateDetails();
    // await childAdoptionCertificateDetailsPage.childAdoptionCertificateDetailsSection();
    // await taskListPage.verifyAdoptionCertificateDetailStatus();
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
    // await taskListPage.selectChildAdoptionAgencyDetails();
    // await childAdoptionAgencyDetailsPage.childAdoptionAgencyDetailsSection();
    // await childAdoptionAgencyDetailsPage.childSocialWorkerDetails();
    // await taskListPage.verifyChildAdoptionAgencyDetailsStatus;
    //
    // await taskListPage.selectSiblingDetails();
    // await childSiblingDetailsPage.childDetailsSiblingSection();
    // await taskListPage.verifySiblingDetailsStatus();
    //
    // await taskListPage.selectChooseYourFamilyCourtDetails();
    // await chooseYourFamilyCourtDetailsPage.childDetailsFindFamilyCourtSection();
    // await taskListPage.verifyChooseYourFamilyCourtStatus();
    //
    // await taskListPage.selectUploadDocumentsDetails();
    // await uploadDocumentsDetailsPage.uploadDocumentsSection();
    // await taskListPage.verifyUploadDocumentsStatus();
    //
    // await taskListPage.selectReviewPayAndSubmitDetails();
    // await reviewPayAndSubmitPage.selectNoPCQOption();
    // await reviewPayAndSubmitPage.changeValueFromReviewYourAnswers();
    // await dateChildMovedinDetailsPage.dateChildMovedInSection('10', '12', '2020');
    // await reviewPayAndSubmitPage.reviewYourAnswersAndContinue();
    // await reviewPayAndSubmitPage.statementOfTruthDetailsSection();
    // await reviewPayAndSubmitPage.adoptionCourtFeesByCard();
  }
);
