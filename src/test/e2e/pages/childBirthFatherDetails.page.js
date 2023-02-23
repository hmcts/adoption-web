const { I } = inject();
const childBirthFatherDetails = require('../fixtures/caseData/childBirthFatherDetails');
const childBirthMothersDetails = require('../fixtures/caseData/childBirthMothersDetails');
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
    birthFatherLastAddressDateDay: 'input[id$="birthFatherLastAddressDate-day"]',
    birthFatherLastAddressDateMonth: 'input[id$="birthFatherLastAddressDate-month"]',
    birthFatherLastAddressDateYear: 'input[id$="birthFatherLastAddressDate-year"]',
    birthFatherServeOrderYes: '#birthFatherServedWith',
    birthFatherServeOrderNo: '#birthFatherServedWith-2',
    birthFatherServerOrderReason: '#birthFatherNotServedWithReason',
  },

  async childBirthFatherDetailsSection() {
    await I.retry(3).waitForText("Is the birth father's name on the birth certificate?");
    await I.retry(3).click(this.fields.birthFatherNameOnCertificate);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText("What is the full name of the child's birth father?");
    await I.retry(3).fillField(this.fields.birthFatherFirstNames, childBirthFatherDetails.birthFatherFirstNames);
    await I.retry(3).fillField(this.fields.birthFatherLastNames, childBirthFatherDetails.birthFatherLastNames);
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
    await I.retry(3).fillField(this.fields.birthFatherOccupation, childBirthFatherDetails.birthFatherOccupation);
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
    await I.retry(3).fillField(this.fields.birthFatherAddress1, childBirthFatherDetails.birthFatherAddress1);
    await I.retry(3).fillField(this.fields.birthFatherAddressTown, childBirthFatherDetails.birthFatherAddressTown);
    await I.retry(3).fillField(
      this.fields.birthFatherAddressPostcode,
      childBirthFatherDetails.birthFatherAddressPostcode
    );
    await I.retry(3).fillField(
      this.fields.birthFatherAddressCountry,
      childBirthFatherDetails.birthFatherAddressCountry
    );
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);

    await I.retry(3).waitForText('When was the last date this address was confirmed?');
    await I.retry(3).fillField(
      this.fields.birthFatherLastAddressDateDay,
      childBirthFatherDetails.birthFatherLastAddressDateDay
    );
    await I.retry(3).fillField(
      this.fields.birthFatherLastAddressDateMonth,
      childBirthFatherDetails.birthFatherLastAddressDateMonth
    );
    await I.wait(2);
    await I.retry(3).fillField(
      this.fields.birthFatherLastAddressDateYear,
      childBirthFatherDetails.birthFatherLastAddressDateYear
    );
    await I.retry(3).click('Save and continue');
    await I.wait(4);

    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see(childBirthFatherDetails.birthFatherServerOrderTitle);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see(childBirthFatherDetails.serverOrderErrorMessage);
    await I.retry(3).click(this.fields.birthFatherServeOrderYes);
    await I.retry(3).click(this.fields.birthFatherServeOrderNo);
    await I.retry(3).fillField(
      this.fields.birthFatherServerOrderReason,
      childBirthFatherDetails.reasonForNotToServeOrder
    );
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
  async childBirthFatherDetailsSaveAsDraft() {
    await I.retry(3).waitForText("Is the birth father's name on the birth certificate?");
    await I.retry(3).click(this.fields.birthFatherNameOnCertificate);
    await I.wait(2);
    await I.retry(3).click('Save as draft');
    await I.wait(4);
  },
};
