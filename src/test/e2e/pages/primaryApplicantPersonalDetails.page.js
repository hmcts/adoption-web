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

  async primaryApplicantPersonalDetailsSection() {
    await I.fillField(this.fields.applicant1FirstNames, 'Joe');
    await I.fillField(this.fields.applicant1LastNames, 'Bloggs');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('Have you ever legally been known by any other names?');
    await I.click(this.fields.applicant1HasOtherNames);
    await I.fillField(this.fields.applicant1OtherFirstNames, 'Wayne');
    await I.fillField(this.fields.applicant1OtherLastNames, 'Best');
    await I.click('Add');
    await I.wait('2');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText("What's your date of birth?");
    await I.fillField(this.fields.dateOfBirthDay, '26');
    await I.fillField(this.fields.dateOfBirthMonth, '06');
    await I.wait('2');
    await I.fillField(this.fields.dateOfBirthYear, '1988');
    await I.click('Save and continue');
    await I.fillField(this.fields.applicant1Occupation, 'Teacher');
    await I.click('Save and continue');
    await I.wait('4');
  },
};
