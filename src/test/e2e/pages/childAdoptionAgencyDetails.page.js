const { I } = inject();
const adoptionAgencyDetails = require('../fixtures/caseData/childAdoptionAgencyDetails');
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
    adopAgencyAddressLine1: 'input[id$="adopAgencyAddressLine1"]',
    adopAgencyTown: 'input[id$="adopAgencyTown"]',
    adopAgencyPostcode: 'input[id$="adopAgencyPostcode"]',
  },

  async childSocialWorkerDetailsSection() {
    await I.retry(3).waitForText("Child's social worker details", 30);
    await I.retry(3).fillField(this.childSocialWorker.childSocialWorkerName, 'Social Worker');
    await I.retry(3).fillField(this.childSocialWorker.childSocialWorkerPhoneNumber, '09876543210');
    await I.retry(3).fillField(this.childSocialWorker.childSocialWorkerEmail, 'social.workerTest@gov.uk');
    await I.retry(3).fillField(this.childSocialWorker.childLocalAuthority, 'CARE TAKER');
    await I.retry(3).fillField(this.childSocialWorker.childLocalAuthorityEmail, 'local.authorityTest@gov.uk');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async yourSocialWorkerDetailsSection() {
    await I.retry(3).waitForText('Your social worker details', 30);
    await I.retry(3).fillField(this.yourSocialWorker.applicantSocialWorkerName, 'Your Social Worker');
    await I.retry(3).fillField(this.yourSocialWorker.applicantSocialWorkerPhoneNumber, '09876543210');
    await I.retry(3).fillField(this.yourSocialWorker.applicantSocialWorkerEmail, 'yoursocial.workerTest@gov.uk');
    await I.retry(3).fillField(this.yourSocialWorker.applicantLocalAuthority, 'YOUR CARE TAKER');
    await I.retry(3).fillField(this.yourSocialWorker.applicantLocalAuthorityEmail, 'yourlocal.authorityTest@gov.uk');
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
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaName, 'Swansea');
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaContactName, 'Freddie');
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaPhoneNumber, '09876543210');
    await I.retry(3).fillField(this.adopAgency.adopAgencyAddressLine1, '41');
    await I.retry(3).fillField(this.adopAgency.adopAgencyTown, 'Leeds');
    await I.retry(3).fillField(this.adopAgency.adopAgencyPostcode, 'LS7 3HJ');
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaContactEmail, 'test.another@test.com');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },

  async childAdoptionAgencyDetailsSaveAsDraft() {
    await I.retry(3).waitForText("Child's social worker details", 30);
    await I.retry(3).fillField(this.childSocialWorker.childSocialWorkerName, 'Social Worker');
    await I.retry(3).fillField(this.childSocialWorker.childSocialWorkerPhoneNumber, '09876543210');
    await I.retry(3).fillField(this.childSocialWorker.childSocialWorkerEmail, 'social.workerTest@gov.uk');
    await I.retry(3).fillField(this.childSocialWorker.childLocalAuthority, 'CARE TAKER');
    await I.retry(3).fillField(this.childSocialWorker.childLocalAuthorityEmail, 'local.authorityTest@gov.uk');
    await I.wait(2);
    await I.retry(3).click('Save as draft');
    await I.wait(2);
  },
};
