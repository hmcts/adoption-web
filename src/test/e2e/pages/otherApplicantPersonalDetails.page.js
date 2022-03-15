const { I } = inject();

module.exports = {
  fields: {
    applicant2FirstNames: 'input[id$="applicant2FirstNames"]',
    applicant2LastNames: 'input[id$="applicant2LastNames"]',
    applicant2HasOtherNames: 'input[id$="applicant2HasOtherNames"]',
    applicant2OtherFirstNames: 'input[id$="applicant2OtherFirstNames"]',
    applicant2OtherLastNames: 'input[id$="applicant2OtherLastNames"]',
    dateOfBirthDay: 'input[id$="applicant2DateOfBirth-day"]',
    dateOfBirthMonth: 'input[id$="applicant2DateOfBirth-month"]',
    dateOfBirthYear: 'input[id$="applicant2DateOfBirth-year"]',
    addAnotherNationality: 'input[id$="addAnotherNationality"]',
    applicant2Occupation: 'input[id$="applicant2Occupation"]',
  },

  async otherApplicantPersonalDetailsSection() {
    await I.fillField(this.fields.applicant2FirstNames, 'George');
    await I.fillField(this.fields.applicant2LastNames, 'Thomas');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('Have you ever legally been known by any other names?');
    await I.click(this.fields.applicant2HasOtherNames);
    await I.fillField(this.fields.applicant2OtherFirstNames, 'David');
    await I.fillField(this.fields.applicant2OtherLastNames, 'William');
    await I.click('Add');
    await I.wait('2');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText("What's your date of birth?");
    await I.fillField(this.fields.dateOfBirthDay, '26');
    await I.fillField(this.fields.dateOfBirthMonth, '06');
    await I.wait('2');
    await I.fillField(this.fields.dateOfBirthYear, '1980');
    await I.click('Save and continue');
    await I.fillField(this.fields.applicant2Occupation, 'Teacher');
    await I.click('Save and continue');
    await I.wait('4');
  },
};
