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

  async otherApplicantContactDetailsSection() {
    await I.wait('3');
    await I.click(this.fields.applicant2AddressSameAsApplicant1_No);
    await I.click('Save and continue');
    await I.wait('4');
    await I.fillField(this.fields.postcodeLookup, this.fields.postcode);
    await I.click(this.fields.findAddressButton);
    await I.waitForText('addresses found');
    await I.waitForElement(locate(this.fields.addressList).find('option').withText(this.fields.lookupOption));
    await I.selectOption(this.fields.addressList, this.fields.lookupOption);
    await I.click('Save and continue');
    await I.wait('2');
    await I.fillField(this.fields.applicant1EmailAddress, 'test@test.com');
    await I.fillField(this.fields.applicant1PhoneNumber, '09876543210');
    await I.click(this.fields.applicant2ContactDetailsConsent);
    await I.click('Save and continue');
    await I.wait('4');
  },
};
