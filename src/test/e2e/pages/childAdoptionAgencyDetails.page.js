const { I } = inject();
const adoptionAgencyDetails = require('../fixtures/caseData/childAdoptionAgencyDetails');
const childSocialWorkerDetails = require('../fixtures/caseData/childSocialWorkerDetails');
const applicantOrYourSocialWorkerDetails = require('../fixtures/caseData/applicantOrYourSocialWorkerDetails');
module.exports = {
  childSocialWorker: {
    childSocialWorkerName: 'input[id$="childSocialWorkerName"]',
    childSocialWorkerPhoneNumber: 'input[id$="childSocialWorkerPhoneNumber"]',
    childSocialWorkerEmail: 'input[id$="childSocialWorkerEmail"]',
    childLocalAuthority: 'input[id$="childLocalAuthority"]',
    childLocalAuthorityEmail: 'input[id$="childLocalAuthorityEmail"]',
  },

  yourSocialWorker: {
    applicantSocialWorkerName: 'input[id$="applicantSocialWorkerName"]',
    applicantSocialWorkerPhoneNumber: 'input[id$="applicantSocialWorkerPhoneNumber"]',
    applicantSocialWorkerEmail: 'input[id$="applicantSocialWorkerEmail"]',
    applicantLocalAuthority: 'input[id$="applicantLocalAuthority"]',
    applicantLocalAuthorityEmail: 'input[id$="applicantLocalAuthorityEmail"]',
  },

  adopAgency: {
    adopAgencyOrLaName: 'input[id$="adopAgencyOrLaName"]',
    adopAgencyOrLaPhoneNumber: 'input[id$="adopAgencyOrLaPhoneNumber"]',
    adopAgencyOrLaContactName: 'input[id$="adopAgencyOrLaContactName"]',
    adopAgencyOrLaContactEmail: 'input[id$="adopAgencyOrLaContactEmail"]',
    hasAnotherAdopAgencyOrLA: 'input[id$="hasAnotherAdopAgencyOrLA"]',
    hasNoAdopAgencyOrLA: 'input[id$="hasAnotherAdopAgencyOrLA-2"]',
    adopAgencyAddressLine1: 'input[id$="adopAgencyAddressLine1"]',
    adopAgencyTown: 'input[id$="adopAgencyTown"]',
    adopAgencyPostcode: 'input[id$="adopAgencyPostcode"]',
  },

  async childSocialWorkerDetailsSection() {
    await I.retry(3).waitForText("Child's social worker details", 30);
    await I.retry(3).fillField(
      this.childSocialWorker.childSocialWorkerName,
      childSocialWorkerDetails.childSocialWorkerName
    );
    await I.retry(3).fillField(
      this.childSocialWorker.childSocialWorkerPhoneNumber,
      childSocialWorkerDetails.childSocialWorkerPhoneNumber
    );
    await I.retry(3).fillField(
      this.childSocialWorker.childSocialWorkerEmail,
      childSocialWorkerDetails.childSocialWorkerEmail
    );
    await I.retry(3).fillField(
      this.childSocialWorker.childLocalAuthority,
      childSocialWorkerDetails.childLocalAuthority
    );
    await I.retry(3).fillField(
      this.childSocialWorker.childLocalAuthorityEmail,
      childSocialWorkerDetails.childLocalAuthorityEmail
    );
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async yourSocialWorkerDetailsSection() {
    await I.retry(3).waitForText('Your social worker details', 30);
    await I.retry(3).fillField(
      this.yourSocialWorker.applicantSocialWorkerName,
      applicantOrYourSocialWorkerDetails.applicantSocialWorkerName
    );
    await I.retry(3).fillField(
      this.yourSocialWorker.applicantSocialWorkerPhoneNumber,
      applicantOrYourSocialWorkerDetails.applicantSocialWorkerPhoneNumber
    );
    await I.retry(3).fillField(
      this.yourSocialWorker.applicantSocialWorkerEmail,
      applicantOrYourSocialWorkerDetails.applicantSocialWorkerEmail
    );
    await I.retry(3).fillField(
      this.yourSocialWorker.applicantLocalAuthority,
      applicantOrYourSocialWorkerDetails.applicantLocalAuthority
    );
    await I.retry(3).fillField(
      this.yourSocialWorker.applicantLocalAuthorityEmail,
      applicantOrYourSocialWorkerDetails.applicantLocalAuthorityEmail
    );
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async childAdoptionAgencyDetailsSection() {
    await I.retry(3).waitForText('Is there another adoption agency or local authority involved?', 30);
    await I.retry(3).click(this.adopAgency.hasAnotherAdopAgencyOrLA);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Adoption agency or local authority details', 30);
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaName, adoptionAgencyDetails.adopAgencyName);
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaContactName, adoptionAgencyDetails.adopAgencyContactName);
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaPhoneNumber, adoptionAgencyDetails.adopAgencyPhoneNumber);
    await I.retry(3).fillField(this.adopAgency.adopAgencyAddressLine1, adoptionAgencyDetails.adopAgencyAddressLine1);
    await I.retry(3).fillField(this.adopAgency.adopAgencyTown, adoptionAgencyDetails.adopAgencyAddressTown);
    await I.retry(3).fillField(this.adopAgency.adopAgencyPostcode, adoptionAgencyDetails.adopAgencyAddressPostcode);
    await I.retry(3).fillField(
      this.adopAgency.adopAgencyOrLaContactEmail,
      adoptionAgencyDetails.adopAgencyContactEmail
    );
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },

  async childAdoptionAgencyDetailsSaveAsDraft() {
    await I.retry(3).waitForText("Child's social worker details", 30);
    await I.retry(3).fillField(
      this.childSocialWorker.childSocialWorkerName,
      childSocialWorkerDetails.childSocialWorkerName
    );
    await I.retry(3).fillField(
      this.childSocialWorker.childSocialWorkerPhoneNumber,
      childSocialWorkerDetails.childSocialWorkerPhoneNumber
    );
    await I.retry(3).fillField(
      this.childSocialWorker.childSocialWorkerEmail,
      childSocialWorkerDetails.childSocialWorkerEmail
    );
    await I.retry(3).fillField(
      this.childSocialWorker.childLocalAuthority,
      childSocialWorkerDetails.childLocalAuthority
    );
    await I.retry(3).fillField(
      this.childSocialWorker.childLocalAuthorityEmail,
      childSocialWorkerDetails.childLocalAuthorityEmail
    );
    await I.wait(2);
    await I.retry(3).click('Save as draft');
    await I.wait(2);
  },

  async childWithNoAdoptionAgencyDetailsSection() {
    await I.retry(3).waitForText('Is there another adoption agency or local authority involved?', 30);
    await I.retry(3).click(this.adopAgency.hasNoAdopAgencyOrLA);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },
};
