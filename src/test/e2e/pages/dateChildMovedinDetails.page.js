const { I } = inject();

module.exports = {
  fields: {
    dateChildMovedInDay: 'input[id$="dateChildMovedIn-day"]',
    dateChildMovedInMonth: 'input[id$="dateChildMovedIn-month"]',
    dateChildMovedInYear: 'input[id$="dateChildMovedIn-year"]',
  },
  async dateChildMovedInSection(date, month, year) {
    await I.retry(3).waitForText('When did the child move in with you?', 30);
    await I.retry(3).fillField(this.fields.dateChildMovedInDay, date);
    await I.retry(3).fillField(this.fields.dateChildMovedInMonth, month);
    await I.wait(2);
    await I.retry(3).fillField(this.fields.dateChildMovedInYear, year);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async dateChildMovedInSectionWithoutData(date, month, year) {
    await I.retry(3).waitForText('When did the child move in with you?', 30);
    await I.retry(3).click('Save and continue');
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Enter your date of birth');
    await I.wait(4);
    await I.retry(3).fillField(this.fields.dateChildMovedInDay, date);
    await I.retry(3).fillField(this.fields.dateChildMovedInMonth, month);
    await I.wait(2);
    await I.retry(3).fillField(this.fields.dateChildMovedInYear, year);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
