const { I } = inject();

module.exports = {
  fields: {
    dateChildMovedInDay: 'input[id$="dateChildMovedIn-day"]',
    dateChildMovedInMonth: 'input[id$="dateChildMovedIn-month"]',
    dateChildMovedInYear: 'input[id$="dateChildMovedIn-year"]',
  },
  async dateChildMovedInSection() {
    await I.waitForText('When did the child move in with you?', 30);
    await I.fillField(this.fields.dateChildMovedInDay, '26');
    await I.fillField(this.fields.dateChildMovedInMonth, '06');
    await I.wait('2');
    await I.fillField(this.fields.dateChildMovedInYear, '2020');
    await I.click('Save and continue');
    await I.wait('2');
  },
};
