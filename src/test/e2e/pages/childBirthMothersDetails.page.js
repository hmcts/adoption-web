const { I } = inject();

const childBirthMothersDetails = require('../fixtures/caseData/childBirthMothersDetails');
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
    birthMotherLastAddressDateDay: 'input[id$="birthMotherLastAddressDate-day"]',
    birthMotherLastAddressDateMonth: 'input[id$="birthMotherLastAddressDate-month"]',
    birthMotherLastAddressDateYear: 'input[id$="birthMotherLastAddressDate-year"]',
    birthMotherServeOrderYes: '#birthMotherServedWith',
    birthMotherServeOrderNo: '#birthMotherServedWith-2',
    birthMotherServerOrderReason: '#birthMotherNotServedWithReason',
  },

  async childBirthMothersDetailsSection() {
    await I.retry(3).waitForText("What is the full name of the child's birth mother?");
    await I.retry(3).fillField(this.fields.birthMotherFirstNames, childBirthMothersDetails.birthMotherFirstNames);
    await I.retry(3).fillField(this.fields.birthMotherLastNames, childBirthMothersDetails.birthMotherLastNames);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("Is the child's birth mother still alive?");
    await I.retry(3).click(this.fields.birthMotherStillAlive);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(3);
    await I.retry(3).waitForText("What is the nationality of the child's birth mother?", 30);
    await I.retry(3).click(this.fields.britishCitizen);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("What is the occupation of the child's birth mother?", 30);
    await I.retry(3).fillField(this.fields.birthMotherOccupation, childBirthMothersDetails.birthMotherOccupation);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("Do you have the birth mother's last known address?", 30);
    await I.retry(3).click(this.fields.birthMotherAddressKnown);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("What is the birth mother's last known address?", 30);
    await I.retry(3).click(this.fields.enterAddressManually);
    await I.wait(2);
    await I.retry(3).click(this.fields.enterInternationalAddress);
    await I.retry(3).fillField(this.fields.birthMotherAddress1, childBirthMothersDetails.birthMotherAddress1);
    await I.retry(3).fillField(this.fields.birthMotherAddressTown, childBirthMothersDetails.birthMotherAddressTown);
    await I.retry(3).fillField(
      this.fields.birthMotherAddressPostcode,
      childBirthMothersDetails.birthMotherAddressPostcode
    );
    await I.retry(3).fillField(
      this.fields.birthMotherAddressCountry,
      childBirthMothersDetails.birthMotherAddressCountry
    );
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('When was the last date this address was confirmed?', 30);
    await I.retry(3).fillField(
      this.fields.birthMotherLastAddressDateDay,
      childBirthMothersDetails.birthMotherLastAddressDateDay
    );
    await I.retry(3).fillField(
      this.fields.birthMotherLastAddressDateMonth,
      childBirthMothersDetails.birthMotherLastAddressDateMonth
    );
    await I.wait(2);
    await I.retry(3).fillField(
      this.fields.birthMotherLastAddressDateYear,
      childBirthMothersDetails.birthMotherLastAddressDateYear
    );
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see(childBirthMothersDetails.birthMotherServerOrderTitle);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText(childBirthMothersDetails.serverOrderErrorMessage);
    await I.retry(3).click(this.fields.birthMotherServeOrderYes);
    await I.retry(3).click(this.fields.birthMotherServeOrderNo);
    await I.retry(3).click('Save and continue');
    await I.retry(3).see('Enter more detail');
    await I.wait(2);
    await I.retry(3).fillField(
      this.fields.birthMotherServerOrderReason,
      childBirthMothersDetails.reasonForNotToServeOrder
    );
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
