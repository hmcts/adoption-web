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

  primaryApplicantContactDetailsSection() {
    I.waitForText("What's your home address?");
    I.fillField(this.fields.postcodeLookup, this.fields.postcode);
    I.click(this.fields.findAddressButton);
    I.waitForText('addresses found');
    I.waitForElement(locate(this.fields.addressList).find('option').withText(this.fields.lookupOption));
    I.selectOption(this.fields.addressList, this.fields.lookupOption);
    I.click('Save and continue');
    I.wait('2');
    I.fillField(this.fields.applicant1EmailAddress, 'test@test.com');
    I.fillField(this.fields.applicant1PhoneNumber, '09876543210');
    I.wait('2');
    I.click(this.fields.applicant1ContactDetailsConsent);
    I.click('Save and continue');
    I.wait('3');
  },
};
