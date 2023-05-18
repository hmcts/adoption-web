/* Feature('E2E Negative').retry(1);

Scenario(
  'Create full application and submit negative @cross-browser',
  async (
    { */
/* loginPage,
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
    chooseYourFamilyCourtDetailsPage, */
/*  }
  ) => { */
/*Number of applicants*/
/* await loginPage.createCitizenUserAndSignIn();
    await landingPage.seeTheLandingPage();
    await landingPage.continueWithoutSelection();
    await landingPage.selectApplyWithMySpouseSection(); */
/*Date child moved in with you*/
/* await taskListPage.selectDateChildMovedInDetails();
    await dateChildMovedinDetailsPage.dateChildMovedInSectionWithoutData();
    await taskListPage.verifyDateChildMovedInStatus(); */
/*Child's details*/
/* await taskListPage.selectChildChildDetails();
    await childsDetailsPage.childFullNameSectionBlankFields();
    await childsDetailsPage.childNameAfterAdoptionDetailsSectionBlankFields();
    await childsDetailsPage.childDOBSectionBlankFields();
    await taskListPage.verifyChildDetailsStatus(); */
/*Adoption agency and social worker*/
/* await taskListPage.selectChildAdoptionAgencyDetails();
    await childAdoptionAgencyDetailsPage.childSocialWorkerDetailsSectionWithOutDetails();
    await childAdoptionAgencyDetailsPage.childSocialWorkerDetailsSection();
    await childAdoptionAgencyDetailsPage.yourSocialWorkerDetailsSectionWithOutDetails();
    await childAdoptionAgencyDetailsPage.yourSocialWorkerDetailsSection();
    await childAdoptionAgencyDetailsPage.adoptionAgencySelectionNoDetails();
    await childAdoptionAgencyDetailsPage.childAdoptionAgencyDetailsSectionWithOutDetails();
    await taskListPage.verifyChildAdoptionAgencyDetailsStatus; */
/*First Applicant contact details*/
/* await taskListPage.selectPrimaryApplicantContactDetails();
    await primaryApplicantDetailsPage.primaryApplicantContactDetailsSectionEmpty();
    await taskListPage.verifyPrimaryApplicantContactDetailsStatus(); */
/*First Applicant personal details*/
/* await taskListPage.selectFirstApplicantPersonalDetails();
    await primaryApplicantPersonalDetailsPage.primaryApplicantPersonalDetailsSectionEmptyfields();
    await primaryApplicantPersonalDetailsPage.additionalDetailsForApplicant1();
    await taskListPage.verifyPrimaryApplicantPersonalDetailsStatus(); */
/*Second Applicant contact details*/
/* await taskListPage.selectOtherApplicantContactDetails();
    await otherApplicantDetailsPage.otherApplicantContactDetailsSectionEmptyFields();
    await taskListPage.verifySecondApplicantPersonalDetailsStatus(); */
/*Second Applicant personal details*/
/* await taskListPage.selectOtherApplicantPersonalDetails();
    await otherApplicantPersonalDetailsPage.otherApplicantPersonalDetailsSectionEmpty();
    await otherApplicantPersonalDetailsPage.additionalDetailsForApplicant2();
    await taskListPage.verifyOtherApplicantPersonalDetailsStatus(); */
/*Family Court details*/
/* await taskListPage.selectChooseYourFamilyCourtDetails();
    await chooseYourFamilyCourtDetailsPage.childDetailsFindFamilyCourtSectionEmptyFields();
    await taskListPage.verifyChooseYourFamilyCourtStatus(); */
/*Payment details*/
/* await taskListPage.selectReviewPayAndSubmitDetails();
    await reviewPayAndSubmitPage.selectNoPCQOption();
    await reviewPayAndSubmitPage.changeValueFromReviewYourAnswers();
    await dateChildMovedinDetailsPage.editDateChildMovedInSection();
    await reviewPayAndSubmitPage.reviewYourAnswersAndContinue();
    await reviewPayAndSubmitPage.statementOfTruthDetailsSectionEmpty();
    await reviewPayAndSubmitPage.reviewAndPay();
    await reviewPayAndSubmitPage.paymentCancellation();
    await reviewPayAndSubmitPage.reviewAndPay();
    await reviewPayAndSubmitPage.adoptionCourtFeesByCard(); */
//}

//will be covered as part of LA portal journey
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
// await taskListPage.selectUploadDocumentsDetails();
// await uploadDocumentsDetailsPage.uploadDocumentsSectionEmpty();
// await taskListPage.verifyUploadDocumentsStatus();
//);
