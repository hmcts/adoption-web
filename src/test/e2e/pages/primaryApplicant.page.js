const config = require('../config');
const { I } = inject();

module.exports = {
  fields: {
    postcodeLookup: 'input[id$="applicant1AddressPostcode"]',
    addressList: 'select[id$="applicant1SelectAddress"]',
    findAddressButton: 'Find address',
    applicant1ContactDetailsConsent: 'input[id$="applicant1ContactDetailsConsent"]',
    applicant1EmailAddress: 'input[id$="applicant1EmailAddress"]',
    applicant1PhoneNumber: 'input[id$="applicant1PhoneNumber"]',
    lookupOption: 'FLAT 2, CAVERSHAM HOUSE 15-17, CHURCH ROAD, CAVERSHAM, READING, RG4 7AA',
    postcode: 'RG4 7AA',
  },

  async primaryApplicantContactDetailsSection() {
    await I.retry(3).waitForText("What's your home address?");
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Enter a real postcode');
    await I.retry(3).fillField(this.fields.postcodeLookup, this.fields.postcode);
    await I.retry(3).click(this.fields.findAddressButton);
    await I.retry(3).waitForText('addresses found');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('Select an address');
    await I.retry(3).waitForElement(locate(this.fields.addressList).find('option').withText(this.fields.lookupOption));
    await I.retry(3).selectOption(this.fields.addressList, this.fields.lookupOption);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('Enter your email address');
    await I.retry(3).see('Enter a UK telephone number');
    await I.retry(3).see('Please answer the question');
    await I.retry(3).fillField(this.fields.applicant1EmailAddress, 'test@test.com');
    await I.retry(3).fillField(this.fields.applicant1PhoneNumber, '09876543210');
    await I.wait(2);
    await I.retry(3).click(this.fields.applicant1ContactDetailsConsent);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
