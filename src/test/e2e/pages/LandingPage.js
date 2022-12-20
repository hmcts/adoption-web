const { I } = inject();

module.exports = {
  fields: {
    applyingWith: 'input[id$="applyingWith"]',
    applyWithMySpouse: 'input[id$="applyingWith-2"]',
    startNowButtonLink: 'a[href$="/applying-with"]',
  },
  async seeTheLandingPage() {
   // await I.retry(2).goToPage(config.baseUrl + '/start-placement');
    //await I.wait(2);
    //await I.retry(3).click('Start now');
    await I.retry(3).click(this.fields.startNowButtonLink);
    await I.wait(2);
    await I.retry(3).see('Are you applying on your own, or with someone else?');
  },

  async selectApplyOnMyownSection() {
    await I.retry(3).click(this.fields.applyingWith);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },

  async selectApplyWithMySpouseSection() {
    await I.retry(3).click(this.fields.applyWithMySpouse);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },
};
