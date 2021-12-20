const { I } = inject();

module.exports = {
  fields: {
    applicantFullName: 'input[id$="applicantFullName"]',
    otherNames: 'input[id$="otherNames"]',
    applicant1AdditionalName: 'input[id$="applicant1AdditionalName"]',
    dateOfBirthDay: 'input[id$="dateOfBirth-day"]',
    dateOfBirthMonth: 'input[id$="dateOfBirth-month"]',
    dateOfBirthYear: 'input[id$="dateOfBirth-year"]',
    britishCitizen: 'input[id$="nationality"]',
    citizenOfDifferentCountry: 'input[id$="nationality-3"]',
    applicant1Nationality: 'input[id$="applicant1Nationality"]',
    applicant1Occupation: 'input[id$="applicant1Occupation"]',
  },

  primaryApplicantPersonalDetailsSection() {
    I.fillField(this.fields.applicantFullName, 'Joe Bloggs');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('Have you ever legally been known by any other names?');
    I.click(this.fields.otherNames);
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
    I.fillField(this.fields.applicant1Nationality, 'India');
    I.click('Add');
    I.wait('2');
    I.click('Save and continue');
    I.fillField(this.fields.applicant1Occupation, 'Teacher');
    I.click('Save and continue');
  },
};
