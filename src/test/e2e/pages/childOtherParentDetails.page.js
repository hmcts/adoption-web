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
    await I.retry(3).waitForText('Is there another person who has parental responsibility for the child?');
    await I.retry(3).click(this.fields.otherParentExists);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).fillField(this.fields.otherParentFirstNames, 'Andrew');
    await I.retry(3).fillField(this.fields.otherParentLastNames, 'Bill');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText(
      'Do you have the address of the other person with parental responsibility for the child?'
    );
    await I.retry(3).click(this.fields.otherParentAddressKnown);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).click(this.fields.enterAddressManually);
    await I.wait(2);
    await I.retry(3).click(this.fields.enterInternationalAddress);
    await I.wait(2);
    await I.retry(3).waitForText("What is the other parent's last known address?");
    await I.retry(3).fillField(this.fields.otherParentAddress1, '90 Riverview Road');
    await I.retry(3).fillField(this.fields.otherParentAddressTown, 'Trail');
    await I.retry(3).fillField(this.fields.otherParentAddressPostcode, 'BC V1R 7N9');
    await I.retry(3).fillField(this.fields.otherParentAddressCountry, 'Canada');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
