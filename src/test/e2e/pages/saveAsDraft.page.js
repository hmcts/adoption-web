const { I } = inject();

module.exports = {
  fields: {
    dateChildMovedInDay: 'input[id$="dateChildMovedIn-day"]',
    dateChildMovedInMonth: 'input[id$="dateChildMovedIn-month"]',
    dateChildMovedInYear: 'input[id$="dateChildMovedIn-year"]',
  },

  async saveAsDraftConfirmation() {
    await I.retry(3).see('Your application has been saved');
    await I.retry(3).click('Continue with your application');
    await I.wait(4);
  },
};
