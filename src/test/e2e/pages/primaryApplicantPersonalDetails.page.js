const { I } = inject();

module.exports = {
  fields: {
    applicant1FirstNames: 'input[id$="applicant1FirstNames"]',
    applicant1LastNames: 'input[id$="applicant1LastNames"]',
    applicant1HasOtherNames: 'input[id$="applicant1HasOtherNames"]',
    applicant1OtherFirstNames: 'input[id$="applicant1OtherFirstNames"]',
    applicant1OtherLastNames: 'input[id$="applicant1OtherLastNames"]',
    dateOfBirthDay: 'input[id$="applicant1DateOfBirth-day"]',
    dateOfBirthMonth: 'input[id$="applicant1DateOfBirth-month"]',
    dateOfBirthYear: 'input[id$="applicant1DateOfBirth-year"]',
    applicant1Occupation: 'input[id$="applicant1Occupation"]',
  },

  primaryApplicantPersonalDetailsSection() {
    I.fillField(this.fields.applicant1FirstNames, 'Joe');
    I.fillField(this.fields.applicant1LastNames, 'Bloggs');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('Have you ever legally been known by any other names?');
    I.click(this.fields.applicant1HasOtherNames);
    I.fillField(this.fields.applicant1OtherFirstNames, 'Wayne');
    I.fillField(this.fields.applicant1OtherLastNames, 'Best');
    I.click('Add');
    I.wait('2');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText("What's your date of birth?");
    I.fillField(this.fields.dateOfBirthDay, '26');
    I.fillField(this.fields.dateOfBirthMonth, '06');
    I.wait('2');
    I.fillField(this.fields.dateOfBirthYear, '1988');
    I.click('Save and continue');
    I.fillField(this.fields.applicant1Occupation, 'Teacher');
    I.click('Save and continue');
    I.wait('3');
  },
};
