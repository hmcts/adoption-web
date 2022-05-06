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
    await I.retry(3).waitForText(
      'Was there another adoption agency or local authority involved in placing the child?',
      30
    );
    await I.retry(3).click(this.adopAgency.hasAnotherAdopAgencyOrLA);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
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
    await I.wait(2);
  },
  async childSocialWorkerDetails() {
    await I.retry(3).waitForText("Details about the child's social worker", 30);
    await I.retry(3).fillField(this.socialWorker.socialWorkerName, adoptionAgencyDetails.socialWorkerName);
    await I.retry(3).fillField(
      this.socialWorker.socialWorkerPhoneNumber,
      adoptionAgencyDetails.socialWorkerPhoneNumber
    );
    await I.retry(3).fillField(this.socialWorker.socialWorkerEmail, adoptionAgencyDetails.socialWorkerEmail);
    await I.retry(3).fillField(this.socialWorker.socialWorkerTeamEmail, adoptionAgencyDetails.socialWorkerTeamEmail);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async childAdoptionAgencyDetailsSectionEmpty() {
    await I.retry(3).waitForText('Adoption agency or local authority details', 30);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Enter a name');
    await I.retry(3).see('Enter a UK telephone number');
    await I.retry(3).see('Enter a name');
    await I.retry(3).see('Enter an email address');
  },
};
