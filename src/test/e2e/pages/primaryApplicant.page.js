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
    await I.waitForText("What's your home address?");
    await I.fillField(this.fields.postcodeLookup, this.fields.postcode);
    await I.click(this.fields.findAddressButton);
    await I.waitForText('addresses found');
    await I.waitForElement(locate(this.fields.addressList).find('option').withText(this.fields.lookupOption));
    await I.selectOption(this.fields.addressList, this.fields.lookupOption);
    await I.click('Save and continue');
    await I.wait('2');
    await I.fillField(this.fields.applicant1EmailAddress, 'test@test.com');
    await I.fillField(this.fields.applicant1PhoneNumber, '09876543210');
    await I.wait('2');
    await I.click(this.fields.applicant1ContactDetailsConsent);
    await I.click('Save and continue');
    await I.wait('4');
  },
};
