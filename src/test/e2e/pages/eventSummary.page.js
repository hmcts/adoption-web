const { I } = inject();

module.exports = {
  fields: {
    summary: '#field-trigger-summary',
    description: '#field-trigger-description',
  },

  async provideSummary(summary, description) {
    await I.fillField(this.fields.summary, summary);
    await I.fillField(this.fields.description, description);
  },

  async submit(button, locator = '.hmcts-banner--success') {
    await I.retryUntilExists(() => I.click(button), locator);
  },
};
