const config = require('../config');
const { I } = inject();
const primaryApplicantDetails = require('../fixtures/caseData/primaryApplicantDetails');
module.exports = {
  fields: {
    postcodeLookup: 'input[id$="applicant1AddressPostcode"]',
    addressList: 'select[id$="applicant1SelectAddress"]',
    findAddressButton: 'Find address',
    applicant1EmailAddress: 'input[id$="applicant1EmailAddress"]',
    applicant1PhoneNumber: 'input[id$="applicant1PhoneNumber"]',
    applicant1LanguageEnglish: 'input[id$="applicant1LanguagePreference"]',
    applicant1LanguageWelsh: 'input[id$="applicant1LanguagePreference-2ss"]',
  },
  async primaryApplicantContactDetailsSection() {
    await I.retry(3).waitForText("What's your home address?");
    await I.retry(3).fillField(this.fields.postcodeLookup, primaryApplicantDetails.primaryApplicantPostcode);
    await I.retry(3).click(this.fields.findAddressButton);
    await I.retry(3).waitForText('addresses found');
    await I.retry(3).waitForElement(
      locate(this.fields.addressList)
        .find('option')
        .withText(primaryApplicantDetails.primaryApplicantAddressLookupOption)
    );
    await I.retry(3).selectOption(this.fields.addressList, primaryApplicantDetails.primaryApplicantAddressLookupOption);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).fillField(
      this.fields.applicant1EmailAddress,
      primaryApplicantDetails.primaryApplicantEmailAddress
    );
    await I.retry(3).fillField(this.fields.applicant1PhoneNumber, primaryApplicantDetails.primaryApplicantPhoneNumber);
    await I.wait(4);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('What language do you want to receive emails and documents in?');
    await I.retry(3).click(this.fields.applicant1LanguageEnglish);
    await I.wait(4);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
  async primaryApplicantContactDetailsSectionEmpty() {
    await I.retry(3).waitForText("What's your home address?");
    await I.retry(3).click('Find address');
    await I.wait(4);
    await I.retry(3).waitForText('There is a problem', 30);
    await I.retry(3).waitForText('Enter a postcode, like AA1 1AA', 30);
    await I.retry(3).fillField(this.fields.postcodeLookup, primaryApplicantDetails.primaryApplicantPostcode);
    await I.retry(3).click(this.fields.findAddressButton);
    await I.retry(3).waitForText('addresses found');
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('Select an address', 30);
    await I.retry(3).waitForElement(
      locate(this.fields.addressList)
        .find('option')
        .withText(primaryApplicantDetails.primaryApplicantAddressLookupOption)
    );
    await I.retry(3).selectOption(this.fields.addressList, primaryApplicantDetails.primaryApplicantAddressLookupOption);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('What are your contact details?');
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('Enter your email address', 30);
    await I.retry(3).waitForText('Enter a UK telephone number', 30);
    await I.retry(3).waitForText('Select whether you are happy to be served court orders by email.', 30);
    await I.wait(4);
    await I.retry(3).fillField(
      this.fields.applicant1EmailAddress,
      primaryApplicantDetails.primaryApplicantEmailAddress
    );
    await I.retry(3).fillField(this.fields.applicant1PhoneNumber, primaryApplicantDetails.primaryApplicantPhoneNumber);
    await I.wait(4);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('What language do you want to receive emails and documents in?');
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('Select whether you want to receive emails and documents in English or Welsh', 30);
    await I.wait(4);
    await I.retry(3).click(this.fields.applicant1LanguageEnglish);
    await I.wait(4);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
