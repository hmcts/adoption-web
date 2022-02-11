const config = require('../config');
const { I } = inject();

module.exports = {
  fields: {
    postcodeLookup: 'input[id$="applicant1AddressPostcode"]',
    addressList: 'select[id$="applicant1SelectAddress"]',
    findAddressButton: 'Find address',
    applicant1ContactDetails: 'input[id$="applicant1ContactDetails"]',
    applicant1EmailAddress: 'input[id$="applicant1EmailAddress"]',
    applicant1ContactDetails2: 'input[id$="applicant1ContactDetails-2"]',
    applicant1PhoneNumber: 'input[id$="applicant1PhoneNumber"]',
    lookupOption: 'FLAT 2, CAVERSHAM HOUSE 15-17, CHURCH ROAD, CAVERSHAM, READING, RG4 7AA',
    postcode: 'RG4 7AA',
  },

  primaryApplicantContactDetailsSection() {
    I.fillField(this.fields.postcodeLookup, this.fields.postcode);
    I.click(this.fields.findAddressButton);
    I.waitForText('addresses found');
    I.waitForElement(locate(this.fields.addressList).find('option').withText(this.fields.lookupOption));
    I.selectOption(this.fields.addressList, this.fields.lookupOption);
    I.click('Save and continue');
    I.wait('2');
    I.click(this.fields.applicant1ContactDetails);
    I.fillField(this.fields.applicant1EmailAddress, 'test@test.com');
    I.click(this.fields.applicant1ContactDetails2);
    I.fillField(this.fields.applicant1PhoneNumber, '09876543210');
    I.click('Save and continue');
    I.wait('3');
  },
};
