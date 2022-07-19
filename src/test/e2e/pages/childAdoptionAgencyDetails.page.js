const { I } = inject();
const adoptionAgencyDetails = require('../fixtures/caseData/childAdoptionAgencyDetails');
module.exports = {
  adopAgency: {
    adopAgencyOrLaName: 'input[id$="adopAgencyOrLaName"]',
    adopAgencyOrLaPhoneNumber: 'input[id$="adopAgencyOrLaPhoneNumber"]',
    adopAgencyOrLaContactName: 'input[id$="adopAgencyOrLaContactName"]',
    adopAgencyOrLaContactEmail: 'input[id$="adopAgencyOrLaContactEmail"]',
    hasAnotherAdopAgencyOrLA: 'input[id$="hasAnotherAdopAgencyOrLA"]',
    hasAnotherAdopAgencyOrLA_NO: 'input[id$="hasAnotherAdopAgencyOrLA-2"]',
  },
  socialWorker: {
    socialWorkerName: 'input[id$="socialWorkerName"]',
    socialWorkerPhoneNumber: 'input[id$="socialWorkerPhoneNumber"]',
    socialWorkerEmail: 'input[id$="socialWorkerEmail"]',
    socialWorkerTeamEmail: 'input[id$="socialWorkerTeamEmail"]',
  },

  async childAdoptionAgencyDetailsSection() {
    await I.retry(3).waitForText('Adoption agency or local authority details', 30);
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaName, adoptionAgencyDetails.adopAgencyOrLaName);
    await I.retry(3).fillField(
      this.adopAgency.adopAgencyOrLaPhoneNumber,
      adoptionAgencyDetails.adopAgencyOrLaPhoneNumber
    );
    await I.retry(3).fillField(
      this.adopAgency.adopAgencyOrLaContactName,
      adoptionAgencyDetails.adopAgencyOrLaContactName
    );
    await I.retry(3).fillField(
      this.adopAgency.adopAgencyOrLaContactEmail,
      adoptionAgencyDetails.adopAgencyOrLaContactEmail
    );
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText(
      'Was there another adoption agency or local authority involved in placing the child?',
      30
    );
  },

  async childOtherAdoptionAgencyDetailsSection() {
    await I.retry(3).click(this.adopAgency.hasAnotherAdopAgencyOrLA);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Adoption agency or local authority details', 30);
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaName, 'Swansea');
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaPhoneNumber, '09876543210');
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaContactName, 'Freddie');
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaContactEmail, 'test.another@example.com');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },
  async childSocialWorkerDetails() {
    await I.retry(3).waitForText("Details about the child's social worker", 30);
    await I.retry(3).fillField(this.socialWorker.socialWorkerName, 'Social Worker');
    await I.retry(3).fillField(this.socialWorker.socialWorkerPhoneNumber, '09876543210');
    await I.retry(3).fillField(this.socialWorker.socialWorkerEmail, 'social.worker@example.com');
    await I.retry(3).fillField(this.socialWorker.socialWorkerTeamEmail, 'social.workerTeam@example.com');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async noOtherAdoptionDetails() {
    await I.retry(3).click(this.adopAgency.hasAnotherAdopAgencyOrLA_NO);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see("Details about the child's social worker", 'h1');
  },

  async errorWithOutSelectingAdoptionAgencyOption() {
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see('Enter a name', '#adopAgencyOrLaName-error');
    await I.retry(3).see('Enter a UK telephone number', '#adopAgencyOrLaPhoneNumber-error');
    await I.retry(3).see('Enter a name', '#adopAgencyOrLaContactName-error');
    await I.retry(3).see('Enter an email address', '#adopAgencyOrLaContactEmail-error');
  },

  async errorsInChildSocialWorkerPage() {
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see('Enter a name', '#socialWorkerName-error');
    await I.retry(3).see('Enter a UK telephone number', '#socialWorkerPhoneNumber-error');
    await I.retry(3).see('Enter an email address', '#socialWorkerEmail-error');
  },
};
