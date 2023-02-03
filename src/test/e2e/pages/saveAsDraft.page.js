const { I } = inject();

module.exports = {
  fields: {
    dateChildMovedInDay: 'input[id$="dateChildMovedIn-day"]',
    dateChildMovedInMonth: 'input[id$="dateChildMovedIn-month"]',
    dateChildMovedInYear: 'input[id$="dateChildMovedIn-year"]',
    continueButton: "//form[@id='main-form']//button[contains(text(), 'Continue with your application')]",
  },

  async saveAsDraftConfirmation() {
    await I.retry(3).see('Your application has been saved');
    await I.retry(3).click(this.fields.continueButton);
    await I.wait(4);
  },
};
