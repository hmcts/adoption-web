const { I } = inject();

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
    await I.fillField(this.adopAgency.adopAgencyOrLaName, 'Hillingdon');
    await I.fillField(this.adopAgency.adopAgencyOrLaPhoneNumber, '09876543210');
    await I.fillField(this.adopAgency.adopAgencyOrLaContactName, 'Jake');
    await I.fillField(this.adopAgency.adopAgencyOrLaContactEmail, 'test@example.com');
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
  childSocialWorkerDetails() {
    I.waitForText("Details about the child's social worker", 30);
    I.fillField(this.socialWorker.socialWorkerName, 'Social Worker');
    I.fillField(this.socialWorker.socialWorkerPhoneNumber, '09876543210');
    I.fillField(this.socialWorker.socialWorkerEmail, 'social.worker@example.com');
    I.fillField(this.socialWorker.socialWorkerTeamEmail, 'social.workerTeam@example.com');
    I.wait('2');
    I.click('Save and continue');
    I.wait('2');
  },
};
