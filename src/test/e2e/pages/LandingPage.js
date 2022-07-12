const { I } = inject();
const config = require('../config');
module.exports = {
  fields: {
    applyingWith: 'input[id$="applyingWith"]',
    applyWithMySpouse: 'input[id$="applyingWith-2"]',
    applyWithSomeone: 'input[id$="applyingWith-3"]',
    otherApplicantRelation: 'input[id$="otherApplicantRelation"]',
    caseRef: 'input[id$="caseRef"]',
    childName: 'input[id$="childName"]',
    childrenDateOfBirthDay: 'input[id$="childrenDateOfBirth-day"]',
    childrenDateOfBirthMonth: 'input[id$="childrenDateOfBirth-month"]',
    childrenDateOfBirthYear: 'input[id$="childrenDateOfBirth-year"]',
  },
  async seeTheLandingPage() {
    await I.wait(2);
    await I.retry(3).see('Are you applying on your own, or with someone else?');
  },

  async selectApplyOnMyownSection() {
    await I.retry(3).click(this.fields.applyingWith);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },

  async selectApplyWithMySpouseSection() {
    await I.retry(3).see('For example, as a legally married couple or legal civil partner.');
    await I.retry(3).click(this.fields.applyWithMySpouse);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },

  async selectApplyWithSomeoneOtherthanSpouse() {
    await I.retry(3).click(this.fields.applyWithSomeone);
    await I.retry(3).see('Give a brief overview of what your relationship is with the other applicant.');
    await I.retry(3).fillField(this.fields.otherApplicantRelation, 'Uncle');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },

  async continueWithoutSelection() {
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Select an option which best describes who is applying');
  },

  async searchForCaseInLALandingPage(caseId) {
    await I.retry(3).click('Sign out');
    await I.wait(5);
    console.log('User using the URL= ' + config.baseUrl + 'la-portal/kba-case-ref');
    await I.amOnPage(config.baseUrl + 'la-portal/kba-case-ref');
    await I.wait(5);
    await I.retry(3).see('Application details');
    await I.retry(3).fillField(this.fields.caseRef, caseId);
    await I.retry(3).fillField(this.fields.childName, 'William Jacob');
    await I.retry(3).fillField(this.fields.childrenDateOfBirthDay, '10');
    await I.retry(3).fillField(this.fields.childrenDateOfBirthMonth, '10');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthYear, '2020');
    await I.retry(3).click('Save and continue');
    await I.wait(5);
    await I.retry(3).see('Apply to adopt a child placed in your care');
  },
};
