const { I } = inject();

module.exports = {
  fields: {
    applyingWith: 'input[id$="applyingWith"]',
  },
  async seeTheLandingPage() {
    I.wait('2');
    await I.seeElement(this.fields.applyingWith);
  },
};
