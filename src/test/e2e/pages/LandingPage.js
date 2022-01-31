const { I } = inject();

module.exports = {
  fields: {
    applyingWith: 'input[id$="applyingWith"]',
    applyWithMySpouse: 'input[id$="applyingWith-2"]',
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

  selectApplyWithMySpouseSection() {
    I.click(this.fields.applyWithMySpouse);
    I.click('Save and continue');
    I.wait('2');
  },
};
