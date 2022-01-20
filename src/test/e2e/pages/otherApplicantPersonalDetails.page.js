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
    britishCitizen: 'input[id$="applicant2Nationality"]',
    citizenOfDifferentCountry: 'input[id$="applicant2Nationality-3"]',
    addAnotherNationality: 'input[id$="addAnotherNationality"]',
    applicant2Occupation: 'input[id$="applicant2Occupation"]',
  },

  otherApplicantPersonalDetailsSection() {
    I.fillField(this.fields.applicant2FirstNames, 'George');
    I.fillField(this.fields.applicant2LastNames, 'Thomas');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('Have you ever legally been known by any other names?');
    I.click(this.fields.applicant2HasOtherNames);
    I.fillField(this.fields.applicant2OtherFirstNames, 'David');
    I.fillField(this.fields.applicant2OtherLastNames, 'William');
    I.click('Add');
    I.wait('2');
    I.click('Save and continue');
    I.waitForText("What's your date of birth?");
    I.fillField(this.fields.dateOfBirthDay, '26');
    I.fillField(this.fields.dateOfBirthMonth, '06');
    I.wait('2');
    I.fillField(this.fields.dateOfBirthYear, '1980');
    I.click('Save and continue');
    I.click(this.fields.britishCitizen);
    //TODO once Abid PR merged then we can un comment as its known issue
    // I.click(this.fields.citizenOfDifferentCountry);
    // I.fillField(this.fields.addAnotherNationality, 'India');
    // I.click('Add');
    I.wait('2');
    I.click('Save and continue');
    I.fillField(this.fields.applicant2Occupation, 'Teacher');
    I.click('Save and continue');
    I.wait('2');
  },
};
