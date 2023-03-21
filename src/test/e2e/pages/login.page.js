const config = require('../config');
const { I, login } = inject();

module.exports = {
  fields: {
    username: '#username',
    password: '#password',
    under18Eligible: '#under18Eligible',
    marriedEligible: '#marriedEligible-2',
    under21Eligible: '#under21Eligible',
    livedUKEligible: '#livedUKEligible',
    domicileEligible: '#domicileEligible',
  },
  submitButton: 'input[value="Sign in"]',

  async createUserAndSignIn() {
    await login('citizenSingleton');
    await I.retry(3).wait('5');
  },

  async createCitizenUserAndSignIn() {
    console.log('User using the URL= ' + config.baseUrl);
    await login('citizenSingleton');
    await I.wait(4);
    I.see('Apply to adopt a child placed in your care');
  },

  async signInFromEligibility() {
    await I.retry(3).goToPage(config.baseUrl + 'eligibility/start');
    await I.wait(3);
    await I.retry(3).click('Start now');
    await I.retry(3).click(this.fields.under18Eligible);
    await I.retry(3).click('Save and continue');
    await I.retry(3).click(this.fields.marriedEligible);
    await I.retry(3).click('Save and continue');
    await I.retry(3).click(this.fields.under21Eligible);
    await I.retry(3).click('Save and continue');
    await I.retry(3).click(this.fields.domicileEligible);
    await I.retry(3).click('Save and continue');
    await I.retry(3).click(this.fields.livedUKEligible);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await this.createCitizenUserAndSignIn();
  },
};
