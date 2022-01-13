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

  childOtherParentDetailsSection() {
    I.waitForText('Is there another person who has parental responsibility for the child?');
    I.click(this.fields.otherParentExists);
    I.wait('2');
    I.click('Save and continue');
    I.fillField(this.fields.otherParentFirstNames, 'Andrew');
    I.fillField(this.fields.otherParentLastNames, 'Bill');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('Do you have the address of the other person with parental responsibility for the child?');
    I.click(this.fields.otherParentAddressKnown);
    I.click('Save and continue');
    I.wait('2');
    I.click(this.fields.enterAddressManually);
    I.wait('2');
    I.click(this.fields.enterInternationalAddress);
    I.wait('2');
    I.waitForText("What is the other parent's last known address?");
    I.fillField(this.fields.otherParentAddress1, '90 Riverview Road');
    I.fillField(this.fields.otherParentAddressTown, 'Trail');
    I.fillField(this.fields.otherParentAddressPostcode, 'BC V1R 7N9');
    I.fillField(this.fields.otherParentAddressCountry, 'Canada');
    I.wait('2');
    I.click('Save and continue');
  },
};
