const { I } = inject();

module.exports = {
  fields: {
    dateChildMovedInDay: 'input[id$="dateChildMovedIn-day"]',
    dateChildMovedInMonth: 'input[id$="dateChildMovedIn-month"]',
    dateChildMovedInYear: 'input[id$="dateChildMovedIn-year"]',
  },
  async dateChildMovedInSection(date, month, year) {
    await I.waitForText('When did the child move in with you?', 30);
    await I.fillField(this.fields.dateChildMovedInDay, date);
    await I.fillField(this.fields.dateChildMovedInMonth, month);
    await I.wait('2');
    await I.fillField(this.fields.dateChildMovedInYear, year);
    await I.click('Save and continue');
    await I.wait('4');
  },
};
