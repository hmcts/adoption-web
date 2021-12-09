const config = require('../config');
const { I } = inject();

module.exports = {
  fields: {
    username: '#username',
    password: '#password',
    under18Eligible: '#under18Eligible',
    marriedEligible: '#marriedEligible-2',
  },
  submitButton: 'input[value="Sign in"]',

  async signIn(user) {
    await I.waitForSelector(this.fields.username);
    I.fillField(this.fields.username, user.email);
    I.fillField(this.fields.password, user.password);
    await I.waitForSelector(this.submitButton);
    I.click(this.submitButton);
  },

  async signInFromEligibility(user) {
    await I.goToPage(config.baseUrl + 'eligibility/start');
    await I.wait('2');
    await I.click('Start now');
    await I.click(this.fields.under18Eligible);
    await I.click('Save and continue');
    await I.click(this.fields.marriedEligible);
    await I.click('Save and continue');
    await I.wait('2');
    await this.signIn(user);
  },
};
