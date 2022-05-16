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
    await I.retry(3).fillField(this.fields.applicant1FirstNames, 'Joe');
    await I.retry(3).fillField(this.fields.applicant1LastNames, 'Bloggs');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Have you ever legally been known by any other names?');
    await I.retry(3).click(this.fields.applicant1HasOtherNames);
    await I.retry(3).fillField(this.fields.applicant1OtherFirstNames, 'Wayne');
    await I.retry(3).fillField(this.fields.applicant1OtherLastNames, 'Best');
    await I.retry(3).click('Add');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("What's your date of birth?");
    await I.retry(3).fillField(this.fields.dateOfBirthDay, '26');
    await I.retry(3).fillField(this.fields.dateOfBirthMonth, '06');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.dateOfBirthYear, '1988');
    await I.retry(3).click('Save and continue');
    await I.retry(3).fillField(this.fields.applicant1Occupation, 'Teacher');
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async primaryApplicantPersonalDetailsSectionEmptyfields() {
    await I.retry(3).fillField(this.fields.applicant1FirstNames, '');
    await I.retry(3).fillField(this.fields.applicant1LastNames, '');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Enter your first names');
    await I.retry(3).see('Enter your last names');
    await I.retry(3).fillField(this.fields.applicant1FirstNames, 'Joe');
    await I.retry(3).fillField(this.fields.applicant1LastNames, 'Bloggs');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Have you ever legally been known by any other names?');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Please answer the question');
    await I.wait(2);
    await I.retry(3).click(this.fields.applicant1HasOtherNames);
    await I.retry(3).fillField(this.fields.applicant1OtherFirstNames, 'Wayne');
    await I.retry(3).fillField(this.fields.applicant1OtherLastNames, 'Best');
    await I.retry(3).click('Add');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("What's your date of birth?");
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Enter your date of birth');
    await I.retry(3).fillField(this.fields.dateOfBirthDay, '26');
    await I.retry(3).fillField(this.fields.dateOfBirthMonth, '06');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.dateOfBirthYear, '1988');
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText("What's your occupation?");
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Enter your occupation');
    await I.retry(3).fillField(this.fields.applicant1Occupation, 'Teacher');
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
