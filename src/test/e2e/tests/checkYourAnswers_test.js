Feature('check your answers').retry(1);
const { I } = inject();
const childBasicDetails = require('../fixtures/caseData/childBasicDetails');
Scenario(
  'Fill in the application details and review the same in check your answers page',
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
    checkYourAnswersPage,
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
    await childAdoptionAgencyDetailsPage.childWithNoAdoptionAgencyDetailsSection();
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
    await checkYourAnswersPage.verifyCheckYourAnswersKeys();
    await checkYourAnswersPage.verifyCheckYourAnswersValues();
  }
);
