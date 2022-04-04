const { I } = inject();

module.exports = {
  fields: {
    applyingWith: 'input[id$="applyingWith"]',
    applyWithMySpouse: 'input[id$="applyingWith-2"]',
  },
  async seeTheLandingPage() {
    await I.wait(2);
    await I.retry(3).see('Are you applying on your own, or with someone else?');
    await I.wait(4);
  },

  async selectApplyOnMyownSection() {
    await I.retry(3).click(this.fields.applyingWith);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },

  async selectApplyWithMySpouseSection() {
    await I.retry(3).click(this.fields.applyWithMySpouse);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async selectApplyWithOnMyOwnSection() {
    await I.retry(3).click(this.fields.applyingWith);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },

  async errorWithOutSelectOption() {
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('Select an option which best describes who is applying', '#applyingWith-error');
  },
};
