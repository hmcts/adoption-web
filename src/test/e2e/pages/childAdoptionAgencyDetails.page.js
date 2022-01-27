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

  childAdoptionAgencyDetailsSection() {
    I.waitForText('Adoption agency or local authority details', 30);
    I.fillField(this.adopAgency.adopAgencyOrLaName, 'Hillingdon');
    I.fillField(this.adopAgency.adopAgencyOrLaPhoneNumber, '09876543210');
    I.fillField(this.adopAgency.adopAgencyOrLaContactName, 'Jake');
    I.fillField(this.adopAgency.adopAgencyOrLaContactEmail, 'test@example.com');
    I.wait('2');
    I.click('Save and continue');
    I.waitForText('Was there another adoption agency or local authority involved in placing the child?', 30);
    I.click(this.adopAgency.hasAnotherAdopAgencyOrLA);
    I.wait('2');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('Adoption agency or local authority details', 30);
    I.fillField(this.adopAgency.adopAgencyOrLaName, 'Swansea');
    I.fillField(this.adopAgency.adopAgencyOrLaPhoneNumber, '09876543210');
    I.fillField(this.adopAgency.adopAgencyOrLaContactName, 'Freddie');
    I.fillField(this.adopAgency.adopAgencyOrLaContactEmail, 'test.another@example.com');
    I.wait('2');
    I.click('Save and continue');
    I.wait('2');
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
