const config = require('../config');

Feature('Save As Draft tests').retry(1);

Scenario(
  'Verify CUI save as draft in child adoption agency ',
  async ({ loginPage, landingPage, taskListPage, childAdoptionAgencyDetailsPage, saveAsDraftPage }) => {
    await loginPage.createCitizenUserAndSignIn();
    await landingPage.seeTheLandingPage();
    await landingPage.selectApplyWithMySpouseSection();

    await taskListPage.selectChildAdoptionAgencyDetails();
    await childAdoptionAgencyDetailsPage.childAdoptionAgencyDetailsSaveAsDraft();
    await saveAsDraftPage.saveAsDraftConfirmation();
    await taskListPage.verifyChildAdoptionAgencyInProgresStatus();
  }
);

Scenario(
  'Verify LA save as draft in child birth father details',
  async ({
    loginPage,
    landingPage,
    taskListPage,
    childsDetailsPage,
    childBirthFatherDetailsPage,
    childAdoptionAgencyDetailsPage,
    primaryApplicantDetailsPage,
    primaryApplicantPersonalDetailsPage,
    reviewPayAndSubmitPage,
    dateChildMovedinDetailsPage,
    chooseYourFamilyCourtDetailsPage,
  }) => {
    await loginPage.createCitizenUserAndSignIn();
    await landingPage.seeTheLandingPage();
    await landingPage.selectApplyOnMyownSection();

    //  Add application details

    await taskListPage.selectDateChildMovedInDetails();
    await dateChildMovedinDetailsPage.dateChildMovedInSection('10', '10', '2020');
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
    await taskListPage.verifyPrimaryApplicantPersonalDetailsStatus();

    await taskListPage.selectReviewPayAndSubmitDetails();
    await reviewPayAndSubmitPage.selectNoPCQOption();
    await reviewPayAndSubmitPage.reviewYourAnswersAndContinue();
    await reviewPayAndSubmitPage.statementOfTruthDetailsSectionForSingleApplicant();
    await reviewPayAndSubmitPage.reviewAndPay();
    await reviewPayAndSubmitPage.adoptionCourtFeesByCard();
    const caseId = await reviewPayAndSubmitPage.getCaseIDAfterAplicationSubmit();

    await landingPage.searchForCaseInLALandingPage(caseId);
    await taskListPage.selectChildBirthFatherDetails();
    await childBirthFatherDetailsPage.childBirthFatherDetailsSaveAsDraft();
    await taskListPage.verifyChildBirthFatherInProgresStatus();
  }
);
