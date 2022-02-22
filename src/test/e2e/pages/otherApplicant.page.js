const config = require('../config');
const { I } = inject();

module.exports = {
  fields: {
    applicant2AddressSameAsApplicant1_No: 'input[id$="applicant2AddressSameAsApplicant1-2"]',
    postcodeLookup: 'input[id$="applicant2AddressPostcode"]',
    addressList: 'select[id$="applicant2SelectAddress"]',
    findAddressButton: 'Find address',
    applicant1EmailAddress: 'input[id$="applicant2EmailAddress"]',
    applicant2ContactDetailsConsent: 'input[id$="applicant2ContactDetailsConsent"]',
    applicant1PhoneNumber: 'input[id$="applicant2PhoneNumber"]',
    lookupOption: '8B, CHURCH ROAD, UXBRIDGE, UB8 3NA',
    postcode: 'UB8 3NA',
  },

  otherApplicantContactDetailsSection() {
    I.wait('3');
    I.click(this.fields.applicant2AddressSameAsApplicant1_No);
    I.click('Save and continue');
    I.wait('3');
    I.fillField(this.fields.postcodeLookup, this.fields.postcode);
    I.click(this.fields.findAddressButton);
    I.waitForText('addresses found');
    I.waitForElement(locate(this.fields.addressList).find('option').withText(this.fields.lookupOption));
    I.selectOption(this.fields.addressList, this.fields.lookupOption);
    I.click('Save and continue');
    I.wait('2');
    I.fillField(this.fields.applicant1EmailAddress, 'test@test.com');
    I.fillField(this.fields.applicant1PhoneNumber, '09876543210');
    I.click(this.fields.applicant2ContactDetailsConsent);
    I.click('Save and continue');
    I.wait('3');
  },
};
