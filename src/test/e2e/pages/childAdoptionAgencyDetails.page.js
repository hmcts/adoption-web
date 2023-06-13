const { I } = inject();
const adoptionAgencyDetails = require('../fixtures/caseData/childAdoptionAgencyDetails');
const childSocialWorkerDetails = require('../fixtures/caseData/childSocialWorkerDetails');
const applicantOrYourSocialWorkerDetails = require('../fixtures/caseData/applicantOrYourSocialWorkerDetails');

module.exports = {
  childSocialWorker: {
    childSocialWorkerName: 'input[id$="childSocialWorkerName"]',
    childSocialWorkerPhoneNumber: 'input[id$="childSocialWorkerPhoneNumber"]',
    childSocialWorkerEmail: 'input[id$="childSocialWorkerEmail"]',
    childLocalAuthority: '#location-picker',
    childLocalAuthorityPicker: '#location-picker__option--0',
    childLocalAuthorityEmail: 'input[id$="childLocalAuthorityEmail"]',
    saveAndContinue: '//*[@id="main-form-submit"]',
  },

  yourSocialWorker: {
    applicantSocialWorkerName: '//*[@id="applicantSocialWorkerName"]',
    applicantSocialWorkerPhoneNumber: 'input[id$="applicantSocialWorkerPhoneNumber"]',
    applicantSocialWorkerEmail: 'input[id$="applicantSocialWorkerEmail"]',
    applicantLocalAuthority: '#location-picker',
    applicantLocalAuthorityNamePicker: '#location-picker__option--1',
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
      childSocialWorkerDetails.childLocalAuthorityHintText
    );
    await I.wait(4);
    await I.retry(3).click(this.childSocialWorker.childLocalAuthorityPicker);
    await I.retry(3).fillField(
      this.childSocialWorker.childLocalAuthorityEmail,
      childSocialWorkerDetails.childLocalAuthorityEmail
    );
    await I.wait(4);
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
      applicantOrYourSocialWorkerDetails.applicantLocalAuthorityHintText
    );
    await I.wait(4);
    await I.retry(3).click(this.yourSocialWorker.applicantLocalAuthorityNamePicker);
    await I.retry(3).fillField(
      this.yourSocialWorker.applicantLocalAuthorityEmail,
      applicantOrYourSocialWorkerDetails.applicantLocalAuthorityEmail
    );
    await I.wait(4);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async childAdoptionAgencyDetailsSection() {
    await I.wait(4);
    await I.retry(3).waitForText('Is there another adoption agency or local authority involved?', 30);
    await I.retry(3).click(this.adopAgency.hasAnotherAdopAgencyOrLA);
    await I.wait(4);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
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
    await I.wait(4);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
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
      childSocialWorkerDetails.childLocalAuthorityHintText
    );
    await I.wait(4);
    await I.retry(3).click(this.childSocialWorker.childLocalAuthorityPicker);

    await I.retry(3).fillField(
      this.childSocialWorker.childLocalAuthorityEmail,
      childSocialWorkerDetails.childLocalAuthorityEmail
    );
    await I.wait(4);
    await I.retry(3).click('Save as draft');
    await I.wait(4);
  },

  async childWithNoAdoptionAgencyDetailsSection() {
    await I.wait(4);
    await I.retry(3).waitForText('Is there another adoption agency or local authority involved?', 30);
    await I.retry(3).click(this.adopAgency.hasNoAdopAgencyOrLA);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async childSocialWorkerDetailsSectionWithOutDetails() {
    await I.retry(3).waitForText("Child's social worker details", 30);
    await I.wait(4);
    await I.retry(3).waitForSelector(this.childSocialWorker.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see('Enter name of child’s social worker');
    await I.retry(3).see('Enter a UK telephone number');
    await I.retry(3).see('Enter name of local authority');
    await I.retry(3).see('Enter an email address in the correct format, like name@gov.uk');
    await I.retry(3).fillField(
      this.childSocialWorker.childLocalAuthorityEmail,
      childSocialWorkerDetails.childSocialWorkerEmailInvalid
    );
    await I.retry(3).waitForSelector(this.childSocialWorker.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.retry(3).see('Enter an email address that ends in gov.uk');
  },

  async yourSocialWorkerDetailsSectionWithOutDetails() {
    await I.retry(3).waitForText('Your social worker details', 30);
    await I.retry(3).waitForSelector(this.childSocialWorker.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(3);
    await I.retry(3).waitForText('Enter a name', 30);
    await I.retry(3).waitForText('Enter a UK telephone number', 30);
    await I.retry(3).waitForText('Enter a name', 30);
    await I.retry(3).waitForText('Enter an email address in the correct format, like name@gov.uk', 30);
    await I.retry(3).fillField(
      this.yourSocialWorker.applicantLocalAuthorityEmail,
      applicantOrYourSocialWorkerDetails.applicantLocalAuthorityEmailInvalid
    );
    await I.retry(3).fillField(
      this.yourSocialWorker.applicantSocialWorkerPhoneNumber,
      applicantOrYourSocialWorkerDetails.applicantSocialWorkerPhoneNumberInvalid
    );
    await I.wait(4);
    await I.retry(3).waitForSelector(this.childSocialWorker.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see('Enter an email address that ends in gov.uk');
    await I.retry(3).see('Enter a UK telephone number');
  },

  async adoptionAgencySelectionNoDetails() {
    await I.wait(4);
    await I.retry(3).waitForText('Is there another adoption agency or local authority involved?', 30);
    await I.retry(3).waitForSelector(this.childSocialWorker.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(6);
    await I.retry(3).see('Please answer the question');
    await I.retry(3).click(this.adopAgency.hasAnotherAdopAgencyOrLA);
    await I.wait(4);
    await I.retry(3).waitForSelector(this.childSocialWorker.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
  async childAdoptionAgencyDetailsSectionWithOutDetails() {
    await I.retry(3).waitForText('Adoption agency or local authority details', 30);
    await I.wait(4);
    await I.retry(3).waitForSelector(this.childSocialWorker.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText('Enter name of adoption agency or local authority', 30);
    await I.retry(3).see('Enter name of adoption agency or local authority');
    await I.retry(3).see('Enter name of your contact');
    await I.retry(3).see('Enter a UK telephone number');
    await I.retry(3).see('Enter the first line of the address');
    await I.retry(3).see('Enter the town or city');
    await I.retry(3).see('Enter postcode, like AA1 1AA');
    await I.retry(3).see('Enter an email address');
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaContactName, adoptionAgencyDetails.adopAgencyContactName);
    await I.retry(3).fillField(
      this.adopAgency.adopAgencyOrLaPhoneNumber,
      adoptionAgencyDetails.adopAgencyPhoneNumberInvalid
    );
    await I.retry(3).fillField(
      this.adopAgency.adopAgencyPostcode,
      adoptionAgencyDetails.adopAgencyAddressPostcodeInvalid
    );
    await I.retry(3).fillField(
      this.adopAgency.adopAgencyOrLaContactEmail,
      adoptionAgencyDetails.adopAgencyContactEmailInvalid
    );
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaName, adoptionAgencyDetails.adopAgencyName);
    await I.retry(3).fillField(this.adopAgency.adopAgencyAddressLine1, adoptionAgencyDetails.adopAgencyAddressLine1);
    await I.retry(3).fillField(this.adopAgency.adopAgencyTown, adoptionAgencyDetails.adopAgencyAddressTown);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see('Enter a UK telephone number');
    await I.retry(3).see('Enter postcode, like AA1 1AA');
    await I.retry(3).see('Enter an email address in the correct format, like name@example.com');
    await I.retry(3).fillField(this.adopAgency.adopAgencyOrLaPhoneNumber, adoptionAgencyDetails.adopAgencyPhoneNumber);
    await I.retry(3).fillField(this.adopAgency.adopAgencyPostcode, adoptionAgencyDetails.adopAgencyAddressPostcode);
    await I.retry(3).fillField(
      this.adopAgency.adopAgencyOrLaContactEmail,
      adoptionAgencyDetails.adopAgencyContactEmail
    );
    await I.wait(4);
    await I.retry(3).waitForSelector(this.childSocialWorker.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
