const { I } = inject();
const secondApplicantPersonalDetails = require('../fixtures/caseData/secondApplicantPersonalDetails');

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
    await I.retry(3).fillField(
      this.fields.applicant2FirstNames,
      secondApplicantPersonalDetails.secondApplicantFirstName
    );
    await I.retry(3).fillField(
      this.fields.applicant2LastNames,
      secondApplicantPersonalDetails.secondApplicantSecondName
    );
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Have you ever legally been known by any other names?');
    await I.retry(3).click(this.fields.applicant2HasOtherNames);
    await I.retry(3).fillField(
      this.fields.applicant2OtherFirstNames,
      secondApplicantPersonalDetails.secondApplicantPreviousFirstName
    );
    await I.retry(3).fillField(
      this.fields.applicant2OtherLastNames,
      secondApplicantPersonalDetails.secondApplicantPreviousLastName
    );
    await I.retry(3).click('Add');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText("What's your date of birth?");
    await I.retry(3).fillField(this.fields.dateOfBirthDay, secondApplicantPersonalDetails.secondApplicantDateOfBirth);
    await I.retry(3).fillField(
      this.fields.dateOfBirthMonth,
      secondApplicantPersonalDetails.secondApplicantMonthOfBirth
    );
    await I.wait(2);
    await I.retry(3).fillField(this.fields.dateOfBirthYear, secondApplicantPersonalDetails.secondApplicantYearOfBirth);
    await I.retry(3).click('Save and continue');
    await I.retry(3).fillField(
      this.fields.applicant2Occupation,
      secondApplicantPersonalDetails.secondApplicantOccupation
    );
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async otherApplicantPersonalDetailsSectionEmpty() {
    await I.retry(3).fillField(this.fields.applicant2FirstNames, '');
    await I.retry(3).fillField(this.fields.applicant2LastNames, '');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Enter your first names');
    await I.retry(3).see('Enter your last names');
    await I.retry(3).fillField(this.fields.applicant2FirstNames, 'Joe');
    await I.retry(3).fillField(this.fields.applicant2LastNames, 'Bloggs');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Have you ever legally been known by any other names?');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('There is a problem');
    await I.retry(3).see('Please answer the question');
    await I.wait(2);
    await I.retry(3).click(this.fields.applicant2HasOtherNames);
    await I.retry(3).fillField(this.fields.applicant2OtherFirstNames, 'Wayne');
    await I.retry(3).fillField(this.fields.applicant2OtherLastNames, 'Best');
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
    await I.retry(3).fillField(this.fields.applicant2Occupation, 'Teacher');
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
