const { I } = inject();

module.exports = {
  fields: {
    applyingWith: 'input[id$="applyingWith"]',
  },
  async seeTheLandingPage() {
    I.wait('2');
    await I.seeElement(this.fields.applyingWith);
  },

  selectApplyOnMyownSection() {
    I.click(this.fields.applyingWith);
    I.click('Save and continue');
    I.wait('2');
  },
};
