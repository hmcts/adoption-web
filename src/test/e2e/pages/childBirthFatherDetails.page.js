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

  async childBirthFatherDetailsSection() {
    await I.retry(3).waitForText("Is the birth father's name on the birth certificate?");
    await I.retry(3).click(this.fields.birthFatherNameOnCertificate);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText("What is the full name of the child's birth father?");
    await I.retry(3).fillField(this.fields.birthFatherFirstNames, 'Jack');
    await I.retry(3).fillField(this.fields.birthFatherLastNames, 'Frank');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("Is the child's birth father still alive?");
    await I.retry(3).click(this.fields.birthFatherStillAlive);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText("What is the nationality of the child's birth father?");
    await I.retry(3).click(this.fields.britishCitizen);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("What is the occupation of the child's birth father?");
    await I.retry(3).fillField(this.fields.birthFatherOccupation, 'unknown');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText('Do you have the birth father’s last known address?');
    await I.retry(3).click(this.fields.birthFatherAddressKnown);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).click(this.fields.enterAddressManually);
    await I.wait(2);
    await I.retry(3).click(this.fields.enterInternationalAddress);
    await I.retry(3).waitForText("What is the birth father's last known address?");
    await I.retry(3).fillField(this.fields.birthFatherAddress1, 'Koenigstrasse 28');
    await I.retry(3).fillField(this.fields.birthFatherAddressTown, 'Belvedere');
    await I.retry(3).fillField(this.fields.birthFatherAddressPostcode, '99425');
    await I.retry(3).fillField(this.fields.birthFatherAddressCountry, 'Germany');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
