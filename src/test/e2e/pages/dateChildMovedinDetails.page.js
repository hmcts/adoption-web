const { I } = inject();
const childBasicDetails = require('../fixtures/caseData/childBasicDetails');
module.exports = {
  fields: {
    dateChildMovedInDay: 'input[id$="dateChildMovedIn-day"]',
    dateChildMovedInMonth: 'input[id$="dateChildMovedIn-month"]',
    dateChildMovedInYear: 'input[id$="dateChildMovedIn-year"]',
    saveAndContinue: '//*[@id="main-form-submit"]',
  },
  async dateChildMovedInSection() {
    await I.retry(3).waitForText('When did the child move in with you?', 30);
    await I.retry(3).fillField(this.fields.dateChildMovedInDay, childBasicDetails.dateChildMovedIn);
    await I.retry(3).fillField(this.fields.dateChildMovedInMonth, childBasicDetails.monthChildMovedIn);
    await I.wait(4);
    await I.retry(3).fillField(this.fields.dateChildMovedInYear, childBasicDetails.yearChildMovedIn);
    await I.retry(3).waitForSelector(this.fields.saveAndContinue, 30);
    await I.retry(3).click(this.fields.saveAndContinue);
    await I.wait(6);
  },

  async dateChildMovedInSectionWithoutData() {
    await I.retry(3).waitForText('When did the child move in with you?', 30);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText('There is a problem', 30);
    await I.retry(3).see('Enter the date the child moved in with you');
    await I.wait(4);
    await I.retry(3).fillField(this.fields.dateChildMovedInDay, childBasicDetails.dateChildMovedInInvalid);
    await I.retry(3).fillField(this.fields.dateChildMovedInMonth, childBasicDetails.monthChildMovedInInvalid);
    await I.wait(4);
    await I.retry(3).fillField(this.fields.dateChildMovedInYear, childBasicDetails.yearChildMovedInInvalid);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText('There is a problem', 30);
    await I.retry(3).waitForText('Must be a real date', 30);
    await I.wait(4);
    await I.retry(3).fillField(this.fields.dateChildMovedInDay, childBasicDetails.dateChildMovedIn);
    await I.retry(3).fillField(this.fields.dateChildMovedInMonth, childBasicDetails.monthChildMovedIn);
    await I.wait(4);
    await I.retry(3).fillField(this.fields.dateChildMovedInYear, childBasicDetails.yearChildMovedIn);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async editDateChildMovedInSection() {
    await I.retry(3).waitForText('When did the child move in with you?', 30);
    await I.retry(3).fillField(this.fields.dateChildMovedInDay, childBasicDetails.dateChildMovedInEdited);
    await I.retry(3).fillField(this.fields.dateChildMovedInMonth, childBasicDetails.monthChildMovedInEdited);
    await I.wait(4);
    await I.retry(3).fillField(this.fields.dateChildMovedInYear, childBasicDetails.yearChildMovedInEdited);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
