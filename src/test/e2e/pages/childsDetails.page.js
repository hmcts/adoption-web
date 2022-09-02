const { I } = inject();
const childAdoptionCertificateDetails = require('../fixtures/caseData/childAdoptionCertificateDetails');
const childBasicInitialDetails = require('../fixtures/caseData/childBasicDetails');
module.exports = {
  fields: {
    childrenFirstName: 'input[id$="childrenFirstName"]',
    childrenLastName: 'input[id$="childrenLastName"]',
    childrenFirstNameAfterAdoption: 'input[id$="childrenFirstNameAfterAdoption"]',
    childrenLastNameAfterAdoption: 'input[id$="childrenLastNameAfterAdoption"]',
    childrenDateOfBirthDay: 'input[id$="childrenDateOfBirth-day"]',
    childrenDateOfBirthMonth: 'input[id$="childrenDateOfBirth-month"]',
    childrenDateOfBirthYear: 'input[id$="childrenDateOfBirth-year"]',
  },

  async childNameAfterAdoptionDetailsSection() {
    await I.retry(3).waitForText("After adoption, what will be the child's full name?");
    await I.retry(3).fillField(
      this.fields.childrenFirstNameAfterAdoption,
      childAdoptionCertificateDetails.childrenFirstNameAfterAdoption
    );
    await I.retry(3).fillField(
      this.fields.childrenLastNameAfterAdoption,
      childAdoptionCertificateDetails.childrenLastNameAfterAdoption
    );
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
  async childFullNameSection() {
    await I.retry(3).waitForText("What is the child's full name?");
    await I.retry(3).fillField(this.fields.childrenFirstName, childBasicInitialDetails.childFirstNameBeforeAdoption);
    await I.retry(3).fillField(this.fields.childrenLastName, childBasicInitialDetails.childLastNameBeforeAdoption);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async childDOBSection() {
    await I.retry(3).see("What is the child's date of birth?");
    await I.retry(3).fillField(this.fields.childrenDateOfBirthDay, childBasicInitialDetails.dateChildMovedIn);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthMonth, childBasicInitialDetails.monthChildMovedIn);
    await I.wait(2);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthYear, childBasicInitialDetails.yearChildMovedIn);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
  },
};
