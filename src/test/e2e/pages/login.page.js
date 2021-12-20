const config = require('../config');
const { I } = inject();

module.exports = {
  fields: {
    username: '#username',
    password: '#password',
    under18Eligible: '#under18Eligible',
    marriedEligible: '#marriedEligible-2',
    under21Eligible: '#under21Eligible',
    livedUKEligible: '#livedUKEligible',
  },
  submitButton: 'input[value="Sign in"]',

  async signIn(user) {
    await I.wait('5');
    await I.waitForSelector(this.fields.username);
    I.fillField(this.fields.username, user.email);
    I.fillField(this.fields.password, user.password);
    await I.waitForSelector(this.submitButton);
    I.click(this.submitButton);
    await I.wait('3');
  },

  async signInFromEligibility(user) {
    await I.goToPage(config.baseUrl + 'eligibility/start');
    await I.wait('2');
    await I.click('Start now');
    await I.click(this.fields.under18Eligible);
    await I.click('Save and continue');
    await I.click(this.fields.marriedEligible);
    await I.click('Save and continue');
    await I.click(this.fields.under21Eligible);
    await I.click('Save and continue');
    await I.click(this.fields.livedUKEligible);
    await I.click('Save and continue');
    await I.wait('4');
    await this.signIn(user);
  },
};
