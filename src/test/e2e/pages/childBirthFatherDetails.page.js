const { I } = inject();

module.exports = {
  fields: {
    birthFatherNameOnCertificate: 'input[id$="birthFatherNameOnCertificate"]',
    birthFatherFirstNames: 'input[id$="birthFatherFirstNames"]',
    birthFatherLastNames: 'input[id$="birthFatherLastNames"]',
    birthFatherStillAlive: 'input[id$="birthFatherStillAlive"]',
    britishCitizen: 'input[id$="birthFatherNationality"]',
    citizenOfDifferentCountry: 'input[id$="birthFatherNationality-3"]',
    addAnotherNationality: 'input[id$="addAnotherNationality"]',
    birthFatherOccupation: 'input[id$="birthFatherOccupation"]',
    birthFatherAddressKnown: 'input[id$="birthFatherAddressKnown"]',
    enterAddressManually: 'a[id$="enterAddressManually"]',
    enterInternationalAddress: 'a[id$="enter-international-address"]',
    birthFatherAddress1: 'input[id$="birthFatherAddress1"]',
    birthFatherAddressTown: 'input[id$="birthFatherAddressTown"]',
    birthFatherAddressPostcode: 'input[id$="birthFatherAddressPostcode"]',
    birthFatherAddressCountry: 'input[id$="birthFatherAddressCountry"]',
  },

  childBirthFatherDetailsSection() {
    I.waitForText("Is the birth father's name on the birth certificate?");
    I.click(this.fields.birthFatherNameOnCertificate);
    I.wait('2');
    I.click('Save and continue');
    I.waitForText("What is the full name of the child's birth father?");
    I.fillField(this.fields.birthFatherFirstNames, 'Jack');
    I.fillField(this.fields.birthFatherLastNames, 'Frank');
    I.wait('2');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText("Is the child's birth Father still alive?");
    I.click(this.fields.birthFatherStillAlive);
    I.wait('2');
    I.click('Save and continue');
    I.waitForText("What is the nationality of the child's birth father?");
    I.click(this.fields.britishCitizen);
    I.click(this.fields.citizenOfDifferentCountry);
    I.fillField(this.fields.addAnotherNationality, 'Germany');
    I.click('Add');
    I.wait('2');
    I.click('Save and continue');
    I.waitForText("What is the occupation of the child's birth father?");
    I.fillField(this.fields.birthFatherOccupation, 'unknown');
    I.wait('2');
    I.click('Save and continue');
    I.waitForText('Do you have the birth father’s last known address?');
    I.click(this.fields.birthFatherAddressKnown);
    I.wait('2');
    I.click('Save and continue');
    I.click(this.fields.enterAddressManually);
    I.wait('2');
    I.click(this.fields.enterInternationalAddress);
    I.waitForText("What is the birth father's last known address?");
    I.fillField(this.fields.birthFatherAddress1, 'Koenigstrasse 28');
    I.fillField(this.fields.birthFatherAddressTown, 'Belvedere');
    I.fillField(this.fields.birthFatherAddressPostcode, '99425');
    I.fillField(this.fields.birthFatherAddressCountry, 'Germany');
    I.wait('2');
    I.click('Save and continue');
  },
};
