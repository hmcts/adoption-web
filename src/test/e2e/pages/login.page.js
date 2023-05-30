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
    submitButton: 'input[value="Sign in"]',
    adoptMoreThanOneChildNo: '#multipleChildrenEligible-2',
    adoptMoreThanOneChildError: '.govuk-error-summary__list li a',
  },

  async createUserAndSignIn() {
    await login('citizenSingleton');
    await I.retry(3).wait('5');
  },

  async createCitizenUserAndSignIn() {
    console.log('User using the URL= ' + config.baseUrl);
    await login('citizenSingleton');
    await I.wait(6);
    await I.waitForText('Are you applying on your own, or with someone else?', 90);
    await I.see('Are you applying on your own, or with someone else?');
  },

  async signInFromEligibility() {
    await I.retry(3).goToPage(config.baseUrl + 'eligibility/start');
    await I.wait(2);
    await I.retry(3).click('Start now');
    await I.wait(2);
    await I.retry(3).see('Are you applying to adopt more than one child?');
    await I.retry(3).click('Continue');
    await I.wait(2);
    await I.retry(3).see('Select if you are applying to adopt more than one child');
    await I.wait(2);
    I.retry(3).click(this.fields.adoptMoreThanOneChildNo);
    await I.retry(3).click('Continue');
    await I.wait(2);
    await I.retry(3).click(this.fields.under18Eligible);
    await I.retry(3).click('Continue');
    await I.retry(3).click(this.fields.marriedEligible);
    await I.retry(3).click('Continue');
    await I.retry(3).click(this.fields.under21Eligible);
    await I.retry(3).click('Continue');
    await I.retry(3).click(this.fields.domicileEligible);
    await I.retry(3).click('Continue');
    await I.retry(3).click(this.fields.livedUKEligible);
    await I.retry(3).click('Continue');
    await I.wait(4);
    await this.createCitizenUserAndSignIn();
  },
};
