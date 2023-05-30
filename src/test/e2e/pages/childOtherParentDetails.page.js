const { I } = inject();

const childOtherParentDetails = require('../fixtures/caseData/childOtherParentDetails');
const childBirthMothersDetails = require('../fixtures/caseData/childBirthMothersDetails');
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
    otherParentServeOrderYes: '#otherParentServedWith',
    otherParentServeOrderNo: '#otherParentServedWith-2',
    otherParentServerOrderReason: '#otherParentNotServedWithReason',
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

    await I.retry(3).waitForText('How parental responsibility was granted to the other person?');

    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('Select how parental responsibility was granted to the other person.');
    await I.retry(3).see('Select how parental responsibility was granted to the other person.');
    await I.retry(3).click('Birth certificate');
    await I.retry(3).click('Other');
    await I.retry(3).waitForText('Enter the reason how parental responsibility was granted to the other person.');
    await I.retry(3).see('Enter the reason how parental responsibility was granted to the other person.');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('Enter the reason how parental responsibility was granted to the other person.');
    await I.retry(3).fillField('Other', 'Reason not known');
    await I.retry(3).click('Save and continue');
    await I.wait(4);

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
    await I.retry(3).waitForText("What is the other person's last known address?");
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
    await I.retry(3).fillField(
      this.fields.otherParentLastAddressDateDay,
      childOtherParentDetails.otherParentLastAddressDateDay
    );
    await I.retry(3).fillField(
      this.fields.otherParentLastAddressDateMonth,
      childOtherParentDetails.otherParentLastAddressDateMonth
    );
    await I.wait(2);
    await I.retry(3).fillField(
      this.fields.otherParentLastAddressDateYear,
      childOtherParentDetails.otherParentLastAddressDateYear
    );
    await I.retry(3).click('Save and continue');
    await I.wait(4);

    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see(childOtherParentDetails.childOtherParentServerOrderTitle);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText(childOtherParentDetails.serverOrderErrorMessage);
    await I.retry(3).click(this.fields.otherParentServeOrderYes);
    await I.retry(3).click(this.fields.otherParentServeOrderNo);
    await I.retry(3).click('Save and continue');
    await I.retry(3).see('Enter more detail');
    await I.wait(2);
    await I.retry(3).fillField(
      this.fields.otherParentServerOrderReason,
      childOtherParentDetails.reasonForNotToServeOrder
    );
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
