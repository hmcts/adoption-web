const { I } = inject();

module.exports = {
  fields: {
    birthMotherFirstNames: 'input[id$="birthMotherFirstNames"]',
    birthMotherLastNames: 'input[id$="birthMotherLastNames"]',
    birthMotherStillAlive: 'input[id$="birthMotherStillAlive"]',
    britishCitizen: 'input[id$="birthMotherNationality"]',
    citizenOfDifferentCountry: 'input[id$="birthMotherNationality-3"]',
    addAnotherNationality: 'input[id$="addAnotherNationality"]',
    birthMotherOccupation: 'input[id$="birthMotherOccupation"]',
    birthMotherAddressKnown: 'input[id$="birthMotherAddressKnown"]',
    enterAddressManually: 'a[id$="enterAddressManually"]',
    enterInternationalAddress: 'a[id$="enter-international-address"]',
    birthMotherAddress1: 'input[id$="birthMotherAddress1"]',
    birthMotherAddressTown: 'input[id$="birthMotherAddressTown"]',
    birthMotherAddressPostcode: 'input[id$="birthMotherAddressPostcode"]',
    birthMotherAddressCountry: 'input[id$="birthMotherAddressCountry"]',
  },

  async childBirthMothersDetailsSection() {
    await I.retry(3).waitForText("What is the full name of the child's birth mother?");
    await I.retry(3).fillField(this.fields.birthMotherFirstNames, 'Marie');
    await I.retry(3).fillField(this.fields.birthMotherLastNames, 'Stopes');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("Is the child's birth mother still alive?");
    await I.retry(3).click(this.fields.birthMotherStillAlive);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText("What is the nationality of the child's birth mother?");
    await I.retry(3).click(this.fields.britishCitizen);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("What is the occupation of the child's birth mother?");
    await I.retry(3).fillField(this.fields.birthMotherOccupation, 'Software Engineer');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText("Do you have the birth mother's last known address?");
    await I.retry(3).click(this.fields.birthMotherAddressKnown);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).click(this.fields.enterAddressManually);
    await I.wait(2);
    await I.retry(3).click(this.fields.enterInternationalAddress);
    await I.retry(3).waitForText("What is the birth mother's last known address?");
    await I.retry(3).fillField(this.fields.birthMotherAddress1, '90 Riverview Road');
    await I.retry(3).fillField(this.fields.birthMotherAddressTown, 'Trail');
    await I.retry(3).fillField(this.fields.birthMotherAddressPostcode, 'BC V1R 7N9');
    await I.retry(3).fillField(this.fields.birthMotherAddressCountry, 'Canada');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
