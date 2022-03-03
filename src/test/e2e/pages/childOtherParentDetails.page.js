const { I } = inject();

module.exports = {
  fields: {
    otherParentExists: 'input[id$="otherParentExists"]',
    otherParentFirstNames: 'input[id$="otherParentFirstNames"]',
    otherParentLastNames: 'input[id$="otherParentLastNames"]',
    otherParentAddressKnown: 'input[id$="otherParentAddressKnown"]',
    enterAddressManually: 'a[id$="enterAddressManually"]',
    enterInternationalAddress: 'a[id$="enter-international-address"]',
    otherParentAddress1: 'input[id$="otherParentAddress1"]',
    otherParentAddressTown: 'input[id$="otherParentAddressTown"]',
    otherParentAddressPostcode: 'input[id$="otherParentAddressPostcode"]',
    otherParentAddressCountry: 'input[id$="otherParentAddressCountry"]',
  },

  async childOtherParentDetailsSection() {
    await I.waitForText('Is there another person who has parental responsibility for the child?');
    await I.click(this.fields.otherParentExists);
    await I.wait('2');
    await I.click('Save and continue');
    await I.fillField(this.fields.otherParentFirstNames, 'Andrew');
    await I.fillField(this.fields.otherParentLastNames, 'Bill');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('Do you have the address of the other person with parental responsibility for the child?');
    await I.click(this.fields.otherParentAddressKnown);
    await I.click('Save and continue');
    await I.wait('2');
    await I.click(this.fields.enterAddressManually);
    await I.wait('2');
    await I.click(this.fields.enterInternationalAddress);
    await I.wait('2');
    await I.waitForText("What is the other parent's last known address?");
    await I.fillField(this.fields.otherParentAddress1, '90 Riverview Road');
    await I.fillField(this.fields.otherParentAddressTown, 'Trail');
    await I.fillField(this.fields.otherParentAddressPostcode, 'BC V1R 7N9');
    await I.fillField(this.fields.otherParentAddressCountry, 'Canada');
    await I.wait('2');
    await I.click('Save and continue');
  },
};
