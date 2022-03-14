const { I } = inject();
const adoptionAgencyDetails = require('../fixtures/caseData/childAdoptionAgencyDetails');
module.exports = {
  adopAgency: {
    adopAgencyOrLaName: 'input[id$="adopAgencyOrLaName"]',
    adopAgencyOrLaPhoneNumber: 'input[id$="adopAgencyOrLaPhoneNumber"]',
    adopAgencyOrLaContactName: 'input[id$="adopAgencyOrLaContactName"]',
    adopAgencyOrLaContactEmail: 'input[id$="adopAgencyOrLaContactEmail"]',
    hasAnotherAdopAgencyOrLA: 'input[id$="hasAnotherAdopAgencyOrLA"]',
  },
  socialWorker: {
    socialWorkerName: 'input[id$="socialWorkerName"]',
    socialWorkerPhoneNumber: 'input[id$="socialWorkerPhoneNumber"]',
    socialWorkerEmail: 'input[id$="socialWorkerEmail"]',
    socialWorkerTeamEmail: 'input[id$="socialWorkerTeamEmail"]',
  },

  async childAdoptionAgencyDetailsSection() {
    await I.waitForText('Adoption agency or local authority details', 30);
    await I.fillField(this.adopAgency.adopAgencyOrLaName, adoptionAgencyDetails.adopAgencyOrLaName);
    await I.fillField(this.adopAgency.adopAgencyOrLaPhoneNumber, adoptionAgencyDetails.adopAgencyOrLaPhoneNumber);
    await I.fillField(this.adopAgency.adopAgencyOrLaContactName, adoptionAgencyDetails.adopAgencyOrLaContactName);
    await I.fillField(this.adopAgency.adopAgencyOrLaContactEmail, adoptionAgencyDetails.adopAgencyOrLaContactEmail);
    await I.wait('2');
    await I.click('Save and continue');
    await I.waitForText('Was there another adoption agency or local authority involved in placing the child?', 30);
    await I.click(this.adopAgency.hasAnotherAdopAgencyOrLA);
    await I.wait('2');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('Adoption agency or local authority details', 30);
    await I.fillField(this.adopAgency.adopAgencyOrLaName, 'Swansea');
    await I.fillField(this.adopAgency.adopAgencyOrLaPhoneNumber, '09876543210');
    await I.fillField(this.adopAgency.adopAgencyOrLaContactName, 'Freddie');
    await I.fillField(this.adopAgency.adopAgencyOrLaContactEmail, 'test.another@example.com');
    await I.wait('2');
    await I.click('Save and continue');
    await I.wait('2');
  },
  async childSocialWorkerDetails() {
    await I.waitForText("Details about the child's social worker", 30);
    await I.fillField(this.socialWorker.socialWorkerName, 'Social Worker');
    await I.fillField(this.socialWorker.socialWorkerPhoneNumber, '09876543210');
    await I.fillField(this.socialWorker.socialWorkerEmail, 'social.worker@example.com');
    await I.fillField(this.socialWorker.socialWorkerTeamEmail, 'social.workerTeam@example.com');
    await I.wait('2');
    await I.click('Save and continue');
    await I.wait('4');
  },
};
