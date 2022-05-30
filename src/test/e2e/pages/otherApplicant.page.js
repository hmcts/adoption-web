const config = require('../config');
const { I } = inject();

module.exports = {
  fields: {
    applicant2AddressSameAsApplicant1_No: 'input[id$="applicant2AddressSameAsApplicant1-2"]',
    postcodeLookup: 'input[id$="applicant2AddressPostcode"]',
    addressList: 'select[id$="applicant2SelectAddress"]',
    findAddressButton: 'Find address',
    applicant2EmailAddress: 'input[id$="applicant2EmailAddress"]',
    applicant2ContactDetailsConsent: 'input[id$="applicant2ContactDetailsConsent"]',
    applicant1PhoneNumber: 'input[id$="applicant2PhoneNumber"]',
    lookupOption: '8B, CHURCH ROAD, UXBRIDGE, UB8 3NA',
    postcode: 'UB8 3NA',
    applicant2LanguageEnglish: 'input[id$="applicant2LanguagePreference"]',
    applicant2LanguageWelsh: 'input[id$="applicant2LanguagePreference-2ss"]',
  },

  async otherApplicantContactDetailsSection() {
    await I.wait(3);
    await I.retry(3).click(this.fields.applicant2AddressSameAsApplicant1_No);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).fillField(this.fields.postcodeLookup, this.fields.postcode);
    await I.retry(3).click(this.fields.findAddressButton);
    await I.retry(3).waitForText('addresses found');
    await I.retry(3).waitForElement(locate(this.fields.addressList).find('option').withText(this.fields.lookupOption));
    await I.retry(3).selectOption(this.fields.addressList, this.fields.lookupOption);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.applicant2EmailAddress, 'test@test.com');
    await I.retry(3).fillField(this.fields.applicant1PhoneNumber, '09876543210');
    await I.retry(3).click(this.fields.applicant2ContactDetailsConsent);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText('What language do you want to receive emails and documents in?');
    await I.retry(3).click(this.fields.applicant2LanguageEnglish);
    await I.wait(4);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
