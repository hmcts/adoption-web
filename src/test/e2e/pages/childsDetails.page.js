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
    saveAndContinue: 'input[id$="main-form-submit"]',
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
    await I.wait(4);
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
    await I.retry(3).waitForText("What is the child's date of birth?", 30);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthDay, childBasicInitialDetails.dateChildMovedIn);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthMonth, childBasicInitialDetails.monthChildMovedIn);
    await I.wait(4);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthYear, childBasicInitialDetails.yearChildMovedIn);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async childFullNameSectionBlankFields() {
    await I.retry(3).waitForText("What is the child's full name?");
    await I.retry(3).waitForSelector(this.fields.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText("Enter the child's first names");
    await I.retry(3).waitForText("Enter the child's last names");
    await I.retry(3).fillField(this.fields.childrenFirstName, childBasicInitialDetails.childFirstNameBeforeAdoption);
    await I.retry(3).fillField(this.fields.childrenLastName, childBasicInitialDetails.childLastNameBeforeAdoption);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async childNameAfterAdoptionDetailsSectionBlankFields() {
    await I.retry(3).waitForText("After adoption, what will be the child's full name?");
    await I.wait(4);
    await I.retry(3).waitForSelector(this.fields.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('There is a problem', 30);
    await I.retry(3).waitForText('Enter their first names', 30);
    await I.retry(3).waitForText('Enter their last names', 30);
    await I.retry(3).fillField(
      this.fields.childrenFirstNameAfterAdoption,
      childAdoptionCertificateDetails.childrenFirstNameAfterAdoption
    );
    await I.retry(3).fillField(
      this.fields.childrenLastNameAfterAdoption,
      childAdoptionCertificateDetails.childrenLastNameAfterAdoption
    );
    await I.wait(4);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async childDOBSectionBlankFields() {
    await I.retry(3).waitForText("What is the child's date of birth?", 30);
    await I.retry(3).waitForSelector(this.fields.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('Enter their date of birth', 30);

    await I.retry(3).fillField(this.fields.childrenDateOfBirthDay, childBasicInitialDetails.dateChildMovedInInvalid);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthMonth, childBasicInitialDetails.monthChildMovedInInvalid);
    await I.wait(4);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthYear, childBasicInitialDetails.yearChildMovedInInvalid);
    await I.retry(3).waitForSelector(this.fields.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('Date of birth must be a real date', 30);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthDay, childBasicInitialDetails.dateChildMovedIn);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthMonth, childBasicInitialDetails.monthChildMovedIn);
    await I.wait(4);
    await I.retry(3).fillField(
      this.fields.childrenDateOfBirthYear,
      childBasicInitialDetails.yearChildMovedInFutureDate
    );
    await I.retry(3).waitForSelector(this.fields.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await page.keyboard.type('\n');
    await I.wait(4);
    await I.retry(3).waitForText('Date of birth must be in the past', 30);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthDay, childBasicInitialDetails.dateChildMovedIn);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthMonth, childBasicInitialDetails.monthChildMovedIn);
    await I.wait(4);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthYear, childBasicInitialDetails.yearChildMovedIn);
    await I.retry(3).waitForSelector(this.fields.saveAndContinue, 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
