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
    await I.wait('5');
  },

  async createCitizenUserAndSignIn() {
    console.log('User using the URL= ' + config.baseUrl);
    await login('citizenSingleton');
    await I.wait('3');
  },

  async signInFromEligibility() {
    await I.goToPage(config.baseUrl + 'eligibility/start');
    await I.wait('2');
    await I.click('Start now');
    await I.click(this.fields.under18Eligible);
    await I.click('Save and continue');
    await I.click(this.fields.marriedEligible);
    await I.click('Save and continue');
    await I.click(this.fields.under21Eligible);
    await I.click('Save and continue');
    await I.click(this.fields.domicileEligible);
    await I.click('Save and continue');
    await I.click(this.fields.livedUKEligible);
    await I.click('Save and continue');
    await I.wait('4');
    await this.createUserAndSignIn();
  },
};
