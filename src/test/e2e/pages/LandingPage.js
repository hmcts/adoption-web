const { I } = inject();
const config = require('../config');
const childBasicInitialDetails = require('../fixtures/caseData/childBasicDetails');
module.exports = {
  fields: {
    applyingWith: 'input[id$="applyingWith"]',
    applyWithMySpouse: 'input[id$="applyingWith-2"]',
    applyWithSomeone: 'input[id$="applyingWith-3"]',
    otherApplicantRelation: 'input[id$="otherApplicantRelation"]',
    caseRef: 'input[id$="kbaCaseRef"]',
    childName: 'input[id$="kbaChildName"]',
    childrenDateOfBirthDay: 'input[id$="kbaChildrenDateOfBirth-day"]',
    childrenDateOfBirthMonth: 'input[id$="kbaChildrenDateOfBirth-month"]',
    childrenDateOfBirthYear: 'input[id$="kbaChildrenDateOfBirth-year"]',
    saveAndContinue: 'input[id$="main-form-submit"]',
  },
  async seeTheLandingPage() {
    await I.wait(4);
    await I.retry(3).see('Are you applying on your own, or with someone else?');
  },

  async selectApplyOnMyownSection() {
    await I.retry(3).click(this.fields.applyingWith);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async selectApplyWithMySpouseSection() {
    await I.retry(3).see('For example, as a legally married couple or legal civil partner.');
    await I.retry(3).click(this.fields.applyWithMySpouse);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async selectApplyWithSomeoneOtherthanSpouse() {
    await I.retry(3).click(this.fields.applyWithSomeone);
    await I.retry(3).see('Give a brief overview of what your relationship is with the other applicant.');
    await I.retry(3).fillField(this.fields.otherApplicantRelation, 'Uncle');
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async continueWithoutSelection() {
    await I.retry(3).waitForSelector(this.fields.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('There is a problem', 30);
    await I.retry(3).waitForText('Select an option which best describes who is applying', 30);
  },

  async searchForCaseInLALandingPage(caseId) {
    await I.retry(3).click('Sign out');
    await I.wait(10);
    await I.retry(3).waitForText('Sign in or create an account');
    await I.amOnPage(config.baseUrl + 'la-portal/kba-case-ref');
    await I.wait(5);
    await I.retry(3).waitForText('Application details', 30);
    await I.retry(3).fillField(this.fields.caseRef, caseId);
    await I.retry(3).fillField(
      this.fields.childName,
      childBasicInitialDetails.childFirstNameBeforeAdoption + ' ' + childBasicInitialDetails.childLastNameBeforeAdoption
    );
    await I.retry(3).fillField(this.fields.childrenDateOfBirthDay, childBasicInitialDetails.dateChildMovedIn);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthMonth, childBasicInitialDetails.monthChildMovedIn);
    await I.wait(4);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthYear, childBasicInitialDetails.yearChildMovedIn);
    await I.retry(3).click('Save and continue');
    await I.wait(5);
    await I.retry(3).waitForText('Getting started', 30);
    await I.wait(4);
    await I.retry(3).click('Start now');
    await I.wait(3);
    await I.retry(3).see(
      childBasicInitialDetails.childFirstNameBeforeAdoption +
        ' ' +
        childBasicInitialDetails.childLastNameBeforeAdoption.concat("'s details")
    );
  },
};
