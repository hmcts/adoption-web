const { I } = inject();
const childBasicDetails = require('../fixtures/caseData/childBasicDetails');
module.exports = {
  fields: {
    dateChildMovedInDay: 'input[id$="dateChildMovedIn-day"]',
    dateChildMovedInMonth: 'input[id$="dateChildMovedIn-month"]',
    dateChildMovedInYear: 'input[id$="dateChildMovedIn-year"]',
  },
  async dateChildMovedInSection() {
    await I.retry(3).waitForText('When did the child move in with you?', 30);
    await I.retry(3).fillField(this.fields.dateChildMovedInDay, childBasicDetails.dateChildMovedIn);
    await I.retry(3).fillField(this.fields.dateChildMovedInMonth, childBasicDetails.monthChildMovedIn);
    await I.wait(2);
    await I.retry(3).fillField(this.fields.dateChildMovedInYear, childBasicDetails.yearChildMovedIn);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async dateChildMovedInSectionWithoutData() {
    await I.retry(3).waitForText('When did the child move in with you?', 30);
    await I.retry(3).click('Save and continue');
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Enter the date the child moved in with you');
    await I.wait(4);
    await I.retry(3).fillField(this.fields.dateChildMovedInDay, childBasicDetails.dateChildMovedIn);
    await I.retry(3).fillField(this.fields.dateChildMovedInMonth, childBasicDetails.monthChildMovedIn);
    await I.wait(2);
    await I.retry(3).fillField(this.fields.dateChildMovedInYear, childBasicDetails.yearChildMovedIn);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async editDateChildMovedInSection() {
    await I.retry(3).waitForText('When did the child move in with you?', 30);
    await I.retry(3).fillField(this.fields.dateChildMovedInDay, childBasicDetails.dateChildMovedInEdited);
    await I.retry(3).fillField(this.fields.dateChildMovedInMonth, childBasicDetails.monthChildMovedInEdited);
    await I.wait(2);
    await I.retry(3).fillField(this.fields.dateChildMovedInYear, childBasicDetails.yearChildMovedInEdited);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
