const { I } = inject();
const checkYourAnswersKeyDetails = require('../fixtures/caseData/checkYourAnswersPageKeysDetails');
const childBasicDetails = require('../fixtures/caseData/childBasicDetails');
const childSocialWorkerDetails = require('../fixtures/caseData/childSocialWorkerDetails');
const yourSocialWorkerDetails = require('../fixtures/caseData/applicantOrYourSocialWorkerDetails');
const familyCourtDetails = require('../fixtures/caseData/familyCourtDetails');
const primAppPersonalDetails = require('../fixtures/caseData/primaryApplicantPersonalDetails');
const primAppOtherDetails = require('../fixtures/caseData/primaryApplicantDetails');
const secAppPersonalDetails = require('../fixtures/caseData/secondApplicantPersonalDetails');
const secAppOtherDetails = require('../fixtures/caseData/secondApplicantDetails');
const childAfterAdopDetails = require('../fixtures/caseData/childAdoptionCertificateDetails');
module.exports = {
  fields: {
    saveAndContinueButton: 'input[id$="main-form-submit"]',
    saveAsDraftButton: 'input[id$="main-form-save-as-draft"]',
  },
  async verifyCheckYourAnswersKeys() {
    await I.retry(3).see(checkYourAnswersKeyDetails.reviewYourApplication);
    await I.retry(3).see(checkYourAnswersKeyDetails.reviewYourAnswers);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicationDetails);
    await I.retry(3).see(checkYourAnswersKeyDetails.numberOfApplicants);
    await I.retry(3).see(checkYourAnswersKeyDetails.dateChildMovedIn);
    await I.retry(3).see(checkYourAnswersKeyDetails.childDetailsHeader);
    await I.retry(3).see(checkYourAnswersKeyDetails.childFullName);
    await I.retry(3).see(checkYourAnswersKeyDetails.fullNameAfterAdoption);
    await I.retry(3).see(checkYourAnswersKeyDetails.childDateOfBirth);
    await I.retry(3).see(checkYourAnswersKeyDetails.childSocialWorkerDetailsHeader);
    await I.retry(3).see(checkYourAnswersKeyDetails.childSocialWorkerName);
    await I.retry(3).see(checkYourAnswersKeyDetails.childSocialWorkerPhoneNumber);
    await I.retry(3).see(checkYourAnswersKeyDetails.childSocialWorkerEmail);
    await I.retry(3).see(checkYourAnswersKeyDetails.childLocalAuthority);
    await I.retry(3).see(checkYourAnswersKeyDetails.childLAEmailAddress);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicantSocialWorkerDetails);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicantSocialWorkerName);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicantSWPhoneNumber);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicantSWEmailAddress);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicantNameOfLocalAuthority);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicantAdoptionAgencyLADetails);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicantAdditionalAdoptionAgency);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicantFamilyCourtDetails);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicantFamilyCourtName);
    await I.retry(3).see(checkYourAnswersKeyDetails.applicantPlacementCourtDetails);
    await I.retry(3).see(checkYourAnswersKeyDetails.firstApplicantDetails);
    await I.retry(3).see(checkYourAnswersKeyDetails.firstApplicantFullName);
    await I.retry(3).see(checkYourAnswersKeyDetails.firstApplicantPreviousName);
    await I.retry(3).see(checkYourAnswersKeyDetails.firstApplicantDOB);
    await I.retry(3).see(checkYourAnswersKeyDetails.firstApplicantOccupation);
    await I.retry(3).see(checkYourAnswersKeyDetails.firstApplicantAddress);
    await I.retry(3).see(checkYourAnswersKeyDetails.firstApplicantEmailAddress);
    await I.retry(3).see(checkYourAnswersKeyDetails.firstApplicantPhoneNumber);
    await I.retry(3).see(checkYourAnswersKeyDetails.firstApplicantCourtOrders);
    await I.retry(3).see(checkYourAnswersKeyDetails.firstApplicantMailLanguage);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantDetails);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantFullName);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantFullName);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantPreviousNames);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantDOB);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantOccupation);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantAddress);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantEmailAddress);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantPhoneNumber);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantCourtOrders);
    await I.retry(3).see(checkYourAnswersKeyDetails.secondApplicantDocLanguage);
    await I.retry(3).see(checkYourAnswersKeyDetails.checkYourApplication);
    await I.retry(3).see(checkYourAnswersKeyDetails.consent);
    await I.retry(3).see(checkYourAnswersKeyDetails.numberOfApplicantsValue);
  },
  async verifyCheckYourAnswersValues() {
    await I.retry(3).see(checkYourAnswersKeyDetails.numberOfApplicantsValue);
    await I.retry(3).see(childBasicDetails.dateChildMovedIn);
    await I.retry(3).see(childBasicDetails.yearChildMovedIn);
    await I.retry(3).see(
      childBasicDetails.childFirstNameBeforeAdoption + ' ' + childBasicDetails.childLastNameBeforeAdoption
    );
    await I.retry(3).see(
      childAfterAdopDetails.childrenFirstNameAfterAdoption + ' ' + childAfterAdopDetails.childrenLastNameAfterAdoption
    );
    await I.retry(3).see(childBasicDetails.dateChildMovedIn);
    await I.retry(3).see(childBasicDetails.yearChildMovedIn);
    await I.retry(3).see(childSocialWorkerDetails.childSocialWorkerName);
    await I.retry(3).see(childSocialWorkerDetails.childSocialWorkerPhoneNumber);
    await I.retry(3).see(childSocialWorkerDetails.childSocialWorkerEmail);
    await I.retry(3).see(childSocialWorkerDetails.childLocalAuthority);
    await I.retry(3).see(childSocialWorkerDetails.childLocalAuthorityEmail);
    await I.retry(3).see(yourSocialWorkerDetails.applicantSocialWorkerName);
    await I.retry(3).see(yourSocialWorkerDetails.applicantSocialWorkerPhoneNumber);
    await I.retry(3).see(yourSocialWorkerDetails.applicantSocialWorkerEmail);
    await I.retry(3).see(yourSocialWorkerDetails.applicantLocalAuthority);
    await I.retry(3).see(yourSocialWorkerDetails.applicantLocalAuthorityEmail);
    await I.retry(3).see('No');
    await I.retry(3).see(familyCourtDetails.familyCourtDetails);
    await I.retry(3).see(
      primAppPersonalDetails.primaryApplicantFirstName + ' ' + primAppPersonalDetails.primaryApplicantSecondName
    );
    await I.retry(3).see(
      primAppPersonalDetails.primaryApplicantPreviousFirstName +
        ' ' +
        primAppPersonalDetails.primaryApplicantPreviousLastName
    );
    await I.retry(3).see(primAppPersonalDetails.primaryApplicantDateOfBirth);
    await I.retry(3).see(primAppPersonalDetails.primaryApplicantYearOfBirth);
    await I.retry(3).see(primAppPersonalDetails.primaryApplicantOccupation);
    await I.retry(3).see(primAppOtherDetails.primaryApplicantEmailAddress);
    await I.retry(3).see(primAppOtherDetails.primaryApplicantPhoneNumber);
    await I.retry(3).see(
      secAppPersonalDetails.secondApplicantFirstName + ' ' + secAppPersonalDetails.secondApplicantSecondName
    );
    await I.retry(3).see(
      secAppPersonalDetails.secondApplicantPreviousFirstName +
        ' ' +
        secAppPersonalDetails.secondApplicantPreviousLastName
    );
    await I.retry(3).see(secAppPersonalDetails.secondApplicantDateOfBirth);
    await I.retry(3).see(secAppPersonalDetails.secondApplicantYearOfBirth);
    await I.retry(3).see(secAppPersonalDetails.secondApplicantOccupation);
    await I.retry(3).see(secAppOtherDetails.secondApplicantEmailAddress);
    await I.retry(3).see(secAppOtherDetails.secondApplicantPhoneNumber);
  },
};
