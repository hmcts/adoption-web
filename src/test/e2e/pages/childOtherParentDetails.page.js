const { I } = inject();

const childOtherParentDetails = require('../fixtures/caseData/childOtherParentDetails');
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
    otherParentLastAddressDateDay: 'input[id$="otherParentLastAddressDate-day"]',
    otherParentLastAddressDateMonth: 'input[id$="otherParentLastAddressDate-month"]',
    otherParentLastAddressDateYear: 'input[id$="otherParentLastAddressDate-year"]',
  },

  async childOtherParentDetailsSection() {
    await I.retry(3).waitForText('Is there another person who has parental responsibility for the child?');
    await I.retry(3).click(this.fields.otherParentExists);
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.retry(3).fillField(this.fields.otherParentFirstNames, childOtherParentDetails.otherParentFirstNames);
    await I.retry(3).fillField(this.fields.otherParentLastNames, childOtherParentDetails.otherParentLastNames);
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
    await I.retry(3).fillField(this.fields.otherParentAddress1, childOtherParentDetails.otherParentAddress1);
    await I.retry(3).fillField(this.fields.otherParentAddressTown, childOtherParentDetails.otherParentAddressTown);
    await I.retry(3).fillField(
      this.fields.otherParentAddressPostcode,
      childOtherParentDetails.otherParentAddressPostcode
    );
    await I.retry(3).fillField(
      this.fields.otherParentAddressCountry,
      childOtherParentDetails.otherParentAddressCountry
    );
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);

    await I.retry(3).waitForText('When was the last date this address was confirmed?');
    await I.retry(3).fillField(this.fields.otherParentLastAddressDateDay, '26');
    await I.retry(3).fillField(this.fields.otherParentLastAddressDateMonth, '06');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.otherParentLastAddressDateYear, '1980');
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
