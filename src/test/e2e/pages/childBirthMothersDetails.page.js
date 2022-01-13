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

  childBirthMothersDetailsSection() {
    I.waitForText("What is the full name of the child's birth mother?");
    I.fillField(this.fields.birthMotherFirstNames, 'Marie');
    I.fillField(this.fields.birthMotherLastNames, 'Stopes');
    I.wait('2');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText("Is the child's birth mother still alive?");
    I.click(this.fields.birthMotherStillAlive);
    I.wait('2');
    I.click('Save and continue');
    I.waitForText("What is the nationality of the child's birth mother?");
    I.click(this.fields.britishCitizen);
    //TODO uncomment these tests
    // I.click(this.fields.citizenOfDifferentCountry);
    // I.fillField(this.fields.addAnotherNationality, 'Canada');
    // I.click('Add');
    // I.wait('2');
    I.click('Save and continue');
    I.waitForText("What is the occupation of the child's birth mother?");
    I.fillField(this.fields.birthMotherOccupation, 'Software Engineer');
    I.wait('2');
    I.click('Save and continue');
    I.waitForText("Do you have the birth mother's last known address?");
    I.click(this.fields.birthMotherAddressKnown);
    I.wait('2');
    I.click('Save and continue');
    I.click(this.fields.enterAddressManually);
    I.wait('2');
    I.click(this.fields.enterInternationalAddress);
    I.waitForText("What is the birth mother's last known address?");
    I.fillField(this.fields.birthMotherAddress1, '90 Riverview Road');
    I.fillField(this.fields.birthMotherAddressTown, 'Trail');
    I.fillField(this.fields.birthMotherAddressPostcode, 'BC V1R 7N9');
    I.fillField(this.fields.birthMotherAddressCountry, 'Canada');
    I.wait('2');
    I.click('Save and continue');
  },
};
