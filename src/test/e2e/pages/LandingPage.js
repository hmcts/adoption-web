const { I } = inject();

module.exports = {
  fields: {
    applyingWith: 'input[id$="applyingWith"]',
    applyWithMySpouse: 'input[id$="applyingWith-3"]',
  },
  async seeTheLandingPage() {
    I.wait('2');
    await I.see('Are you applying on your own, or with someone else?', 30);
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
