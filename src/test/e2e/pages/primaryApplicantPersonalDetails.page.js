const { I } = inject();

module.exports = {
  fields: {
    applicant1FullName: 'input[id$="applicant1FullName"]',
    applicant1HasOtherNames: 'input[id$="applicant1HasOtherNames"]',
    applicant1AdditionalName: 'input[id$="applicant1AdditionalName"]',
    dateOfBirthDay: 'input[id$="applicant1DateOfBirth-day"]',
    dateOfBirthMonth: 'input[id$="applicant1DateOfBirth-month"]',
    dateOfBirthYear: 'input[id$="applicant1DateOfBirth-year"]',
    britishCitizen: 'input[id$="applicant1Nationality"]',
    citizenOfDifferentCountry: 'input[id$="applicant1Nationality-3"]',
    addAnotherNationality: 'input[id$="addAnotherNationality"]',
    applicant1Occupation: 'input[id$="applicant1Occupation"]',
  },

  primaryApplicantPersonalDetailsSection() {
    I.fillField(this.fields.applicant1FullName, 'Joe Bloggs');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('Have you ever legally been known by any other names?');
    I.click(this.fields.applicant1HasOtherNames);
    I.fillField(this.fields.applicant1AdditionalName, 'Wayne Best');
    I.click('Add');
    I.wait('2');
    I.click('Save and continue');
    I.waitForText("What's your date of birth?");
    I.fillField(this.fields.dateOfBirthDay, '26');
    I.fillField(this.fields.dateOfBirthMonth, '06');
    I.wait('2');
    I.fillField(this.fields.dateOfBirthYear, '1988');
    I.click('Save and continue');
    I.click(this.fields.britishCitizen);
    I.click(this.fields.citizenOfDifferentCountry);
    I.fillField(this.fields.addAnotherNationality, 'India');
    I.click('Add');
    I.wait('2');
    I.click('Save and continue');
    I.fillField(this.fields.applicant1Occupation, 'Teacher');
    I.click('Save and continue');
  },
};
