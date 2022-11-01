const loginPage = require('../pages/login.page');
const landingPage = require('../pages/LandingPage');
const taskListPage = require('../pages/taskList.page');
const dateChildMovedinDetailsPage = require('../pages/dateChildMovedinDetails.page');
const childsDetailsPage = require('../pages/childsDetails.page');
const childAdoptionAgencyDetailsPage = require('../pages/childAdoptionAgencyDetails.page');
const chooseYourFamilyCourtDetailsPage = require('../pages/chooseYourFamilyCourtDetails.page');
const primaryApplicantDetailsPage = require('../pages/primaryApplicant.page');
const primaryApplicantPersonalDetailsPage = require('../pages/primaryApplicantPersonalDetails.page');
const otherApplicantDetailsPage = require('../pages/otherApplicant.page');
const otherApplicantPersonalDetailsPage = require('../pages/otherApplicantPersonalDetails.page');
const reviewPayAndSubmitPage = require('../pages/reviewPayAndSubmit.page');

module.exports.createCUICase = async () => {
  let caseId;
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
  await taskListPage.verifyPrimaryApplicantPersonalDetailsStatus();

  await taskListPage.selectOtherApplicantContactDetails();
  await otherApplicantDetailsPage.otherApplicantContactDetailsSection();
  await taskListPage.verifySecondApplicantPersonalDetailsStatus();

  await taskListPage.selectOtherApplicantPersonalDetails();
  await otherApplicantPersonalDetailsPage.otherApplicantPersonalDetailsSection();
  await taskListPage.verifyOtherApplicantPersonalDetailsStatus();

  await taskListPage.selectReviewPayAndSubmitDetails();
  await reviewPayAndSubmitPage.selectNoPCQOption();
  await reviewPayAndSubmitPage.changeValueFromReviewYourAnswers();
  await dateChildMovedinDetailsPage.editDateChildMovedInSection();
  await reviewPayAndSubmitPage.reviewYourAnswersAndContinue();
  await reviewPayAndSubmitPage.statementOfTruthDetailsSection();
  await reviewPayAndSubmitPage.adoptionCourtFeesByCard();
  caseId = await reviewPayAndSubmitPage.getCaseIDAfterAplicationSubmit();
  console.log(caseId);
  return caseId;
};
