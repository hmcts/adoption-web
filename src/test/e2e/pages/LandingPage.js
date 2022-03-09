const { I } = inject();

module.exports = {
  fields: {
    applyingWith: 'input[id$="applyingWith"]',
    applyWithMySpouse: 'input[id$="applyingWith-2"]',
  },
  async seeTheLandingPage() {
    await I.wait('2');
    await I.seeElement(this.fields.applyingWith);
  },

  async selectApplyOnMyownSection() {
    await I.click(this.fields.applyingWith);
    await I.click('Save and continue');
    await I.wait('2');
  },

  async selectApplyWithMySpouseSection() {
    await I.click(this.fields.applyWithMySpouse);
    await I.click('Save and continue');
    await I.wait('2');
  },
};
