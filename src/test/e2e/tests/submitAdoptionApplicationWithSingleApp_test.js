Feature('Single applicant creat application').retry(1);

Scenario(
  'Submit application with single applicant',
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
    primaryApplicantDetailsPage,
    primaryApplicantPersonalDetailsPage,
    reviewPayAndSubmitPage,
    uploadDocumentsDetailsPage,
    dateChildMovedinDetailsPage,
    chooseYourFamilyCourtDetailsPage,
  }) => {
    await loginPage.createCitizenUserAndSignIn();
    await landingPage.seeTheLandingPage();
    await landingPage.selectApplyWithOnMyOwnSection();

    await taskListPage.selectDateChildMovedInDetails();
    await dateChildMovedinDetailsPage.dateChildMovedInSection('10', '10', '2020');
    await taskListPage.verifyDateChildMovedInStatus();

    await taskListPage.selectChildAdoptionAgencyDetails();
    await childAdoptionAgencyDetailsPage.childAdoptionAgencyDetailsSection();
    await childAdoptionAgencyDetailsPage.childOtherAdoptionAgencyDetailsSection();
    await childAdoptionAgencyDetailsPage.childSocialWorkerDetails();
    await taskListPage.verifyChildAdoptionAgencyDetailsStatus;

    await taskListPage.selectPrimaryApplicantContactDetails();
    await primaryApplicantDetailsPage.primaryApplicantContactDetailsSection();
    await taskListPage.verifyPrimaryApplicantContactDetailsStatus();

    await taskListPage.selectFirstApplicantPersonalDetails();
    await primaryApplicantPersonalDetailsPage.primaryApplicantPersonalDetailsSection();
    await taskListPage.verifyPrimaryApplicantPersonalDetailsStatus();

    await taskListPage.selectChildrenBirthCertificate();
    await childrenBirthCertificatePage.childDetailsBirthCertificaterSection();
    await taskListPage.verifyChildBirthCertificateDetailsStatus();

    await taskListPage.selectChildAdoptionCertificateDetails();
    await childAdoptionCertificateDetailsPage.childNameAfterAdoptionDetailsSection();
    await taskListPage.verifyAdoptionCertificateDetailStatus();

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

    await taskListPage.selectSiblingDetails();
    await childSiblingDetailsPage.childDetailsSiblingSection();
    await taskListPage.verifySiblingDetailsStatus();

    await taskListPage.selectChooseYourFamilyCourtDetails();
    await chooseYourFamilyCourtDetailsPage.childDetailsFindFamilyCourtSection();
    await taskListPage.verifyChooseYourFamilyCourtStatus();

    await taskListPage.selectUploadDocumentsDetails();
    await uploadDocumentsDetailsPage.uploadDocumentsSectionWithCantNotUploadOption();
    await taskListPage.verifyUploadDocumentsStatus();

    await taskListPage.selectReviewPayAndSubmitDetails();
    await reviewPayAndSubmitPage.selectNoPCQOption();
    await reviewPayAndSubmitPage.changeValueFromReviewYourAnswers();
    await dateChildMovedinDetailsPage.dateChildMovedInSection('10', '12', '2020');
    await reviewPayAndSubmitPage.reviewYourAnswersAndContinue();
    await reviewPayAndSubmitPage.statementOfTruthDetailsSection();
    await reviewPayAndSubmitPage.adoptionCourtFeesByCard();
  }
);
