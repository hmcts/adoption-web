const { I } = inject();
const adoptionAgencyDetails = require('../fixtures/caseData/childAdoptionAgencyDetails');
module.exports = {
  localAuthority: {
    localAuthorityName: 'input[id$="localAuthorityName"]',
    localAuthorityPhoneNumber: 'input[id$="localAuthorityPhoneNumber"]',
    localAuthorityContactName: 'input[id$="localAuthorityContactName"]',
    localAuthorityContactEmail: 'input[id$="localAuthorityContactEmail"]',
    hasAnotherAdopAgencyOrLA: 'input[id$="hasAnotherAdopAgencyOrLA"]',
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

  socialWorker: {
    socialWorkerName: 'input[id$="socialWorkerName"]',
    socialWorkerPhoneNumber: 'input[id$="socialWorkerPhoneNumber"]',
    socialWorkerEmail: 'input[id$="socialWorkerEmail"]',
    childLocalAuthority: 'input[id$="childLocalAuthority"]',
  },

  async childAdoptionAgencyDetailsSection() {
    await I.retry(3).waitForText('Local authority details', 30);
    await I.retry(3).fillField(this.localAuthority.localAuthorityName, adoptionAgencyDetails.adopAgencyOrLaName);

    await I.retry(3).fillField(
      this.localAuthority.localAuthorityContactName,
      adoptionAgencyDetails.adopAgencyOrLaContactName
    );
    await I.retry(3).fillField(
      this.localAuthority.localAuthorityPhoneNumber,
      adoptionAgencyDetails.adopAgencyOrLaPhoneNumber
    );
    await I.retry(3).fillField(
      this.localAuthority.localAuthorityContactEmail,
      adoptionAgencyDetails.adopAgencyOrLaContactEmail
    );
    await I.wait(2);
    await I.retry(3).click('Save and continue');
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
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaContactEmail, 'test.another@gov.uk');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },
  async childSocialWorkerDetails() {
    await I.retry(3).waitForText("Child's social worker details", 30);
    await I.retry(3).fillField(this.socialWorker.socialWorkerName, 'Social Worker');
    await I.retry(3).fillField(this.socialWorker.socialWorkerPhoneNumber, '09876543210');
    await I.retry(3).fillField(this.socialWorker.socialWorkerEmail, 'social.workerTest@gov.uk');
    await I.retry(3).fillField(this.socialWorker.childLocalAuthority, 'CARE TAKER');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
  async childAdoptionAgencyDetailsSaveAsDraft() {
    await I.retry(3).fillField(this.localAuthority.localAuthorityName, adoptionAgencyDetails.adopAgencyOrLaName);

    await I.retry(3).fillField(
      this.localAuthority.localAuthorityContactName,
      adoptionAgencyDetails.adopAgencyOrLaContactName
    );
    await I.retry(3).fillField(
      this.localAuthority.localAuthorityPhoneNumber,
      adoptionAgencyDetails.adopAgencyOrLaPhoneNumber
    );
    await I.retry(3).fillField(
      this.localAuthority.localAuthorityContactEmail,
      adoptionAgencyDetails.adopAgencyOrLaContactEmail
    );
    await I.wait(2);
    await I.retry(3).click('Save as draft');
    await I.wait(2);
  },
};
