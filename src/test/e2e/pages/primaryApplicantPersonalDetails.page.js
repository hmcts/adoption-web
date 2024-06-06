const { I } = inject();
const primaryApplicantPersonalDetails = require('../fixtures/caseData/primaryApplicantPersonalDetails');
const extraSupportDetails = require('../fixtures/caseData/extraSupportDetails');

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
    errorName: '.govuk-error-summary__list li a',
    applicant1extraSupportAdjustment: '#applicant1HasReasonableAdjustment',
    applicant1extraSupportAdjustmentDetails: '#applicant1ReasonableAdjustmentDetails',
    whatSupportIsNeeded: '.govuk-details .govuk-details__summary-text',
    saveAndContinue: '//*[@id="main-form-submit"]',
  },

  async primaryApplicantPersonalDetailsSection() {
    await I.retry(3).fillField(
      this.fields.applicant1FirstNames,
      primaryApplicantPersonalDetails.primaryApplicantFirstName
    );
    await I.retry(3).fillField(
      this.fields.applicant1LastNames,
      primaryApplicantPersonalDetails.primaryApplicantSecondName
    );
    await I.retry(3).forceClick('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('Have you ever legally been known by any other names?');
    await I.retry(3).click(this.fields.applicant1HasOtherNames);
    await I.retry(3).fillField(
      this.fields.applicant1OtherFirstNames,
      primaryApplicantPersonalDetails.primaryApplicantPreviousFirstName
    );
    await I.retry(3).fillField(
      this.fields.applicant1OtherLastNames,
      primaryApplicantPersonalDetails.primaryApplicantPreviousLastName
    );
    await I.retry(3).click('Add');
    await I.wait(4);
    await I.retry(3).forceClick('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText("What's your date of birth?");
    await I.retry(3).fillField(this.fields.dateOfBirthDay, primaryApplicantPersonalDetails.primaryApplicantDateOfBirth);
    await I.retry(3).fillField(
      this.fields.dateOfBirthMonth,
      primaryApplicantPersonalDetails.primaryApplicantMonthOfBirth
    );
    await I.wait(4);
    await I.retry(3).fillField(
      this.fields.dateOfBirthYear,
      primaryApplicantPersonalDetails.primaryApplicantYearOfBirth
    );
    await I.retry(3).forceClick('Save and continue');
    await I.retry(3).fillField(
      this.fields.applicant1Occupation,
      primaryApplicantPersonalDetails.primaryApplicantOccupation
    );
    await I.retry(3).forceClick('Save and continue');
    await I.wait(4);
  },

  async primaryApplicantPersonalDetailsSectionEmptyfields() {
    await I.retry(3).fillField(this.fields.applicant1FirstNames, '');
    await I.retry(3).fillField(this.fields.applicant1LastNames, '');
    await I.retry(3).waitForSelector(this.fields.saveAndContinue);
    await I.retry(3).forceClick('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('There is a problem');
    await I.retry(3).waitForText('Enter your first names');
    await I.retry(3).waitForText('Enter your last names');
    await I.retry(3).fillField(
      this.fields.applicant1FirstNames,
      primaryApplicantPersonalDetails.primaryApplicantFirstName
    );
    await I.retry(3).fillField(
      this.fields.applicant1LastNames,
      primaryApplicantPersonalDetails.primaryApplicantSecondName
    );
    await I.retry(3).waitForSelector(this.fields.saveAndContinue);
    await I.retry(3).forceClick('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('Have you ever legally been known by any other names?');
    await I.retry(3).waitForSelector(this.fields.saveAndContinue);
    await I.retry(3).forceClick(this.fields.saveAndContinue);
    await I.wait(4);
    await I.retry(3).waitForText('There is a problem');
    await I.wait(4);
    await I.retry(3).waitForText('Please answer the question');
    await I.wait(4);
    await I.retry(3).click(this.fields.applicant1HasOtherNames);
    await I.retry(3).click('Add');
    await I.wait(4);
    await I.retry(3).waitForText('Enter your previous first names');
    await I.retry(3).waitForText('Enter your previous last names');
    await I.retry(3).fillField(
      this.fields.applicant1OtherFirstNames,
      primaryApplicantPersonalDetails.primaryApplicantPreviousFirstName
    );
    await I.retry(3).fillField(
      this.fields.applicant1OtherLastNames,
      primaryApplicantPersonalDetails.primaryApplicantPreviousLastName
    );
    await I.retry(3).click('Add');
    await I.wait(4);
    await I.retry(3).waitForSelector(this.fields.saveAndContinue);
    await I.retry(3).forceClick('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText("What's your date of birth?");
    await I.retry(3).waitForSelector(this.fields.saveAndContinue);
    await I.retry(3).forceClick('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('There is a problem');
    await I.retry(3).waitForText('Enter your date of birth');
    await I.retry(3).fillField(this.fields.dateOfBirthDay, primaryApplicantPersonalDetails.primaryApplicantDateOfBirth);
    await I.retry(3).fillField(
      this.fields.dateOfBirthMonth,
      primaryApplicantPersonalDetails.primaryApplicantMonthOfBirth
    );
    await I.wait(4);
    await I.retry(3).fillField(
      this.fields.dateOfBirthYear,
      primaryApplicantPersonalDetails.primaryApplicantYearOfBirth
    );
    await I.retry(3).waitForSelector(this.fields.saveAndContinue);
    await I.retry(3).forceClick('Save and continue');
    await I.retry(3).waitForText("What's your occupation?");
    await I.wait(4);
    await I.retry(3).waitForSelector(this.fields.saveAndContinue);
    await I.retry(3).forceClick('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('There is a problem');
    await I.retry(3).waitForText('Enter your occupation');
    await I.retry(3).fillField(
      this.fields.applicant1Occupation,
      primaryApplicantPersonalDetails.primaryApplicantOccupation
    );
    await I.retry(3).waitForSelector(this.fields.saveAndContinue);
    await I.retry(3).forceClick('Save and continue');
    await I.wait(4);
  },

  async additionalDetailsForApplicant1() {
    await I.retry(3).waitForText('Extra support during your case');
    await I.retry(3).waitForSelector(this.fields.saveAndContinue);
    await I.retry(3).forceClick(this.fields.saveAndContinue);
    await I.wait(4);
    await I.retry(3).waitForText(extraSupportDetails.extraSupportError);
    await I.retry(3).waitForText(extraSupportDetails.whatSupportIsAvailable);
    await I.retry(3).click(this.fields.whatSupportIsNeeded);
    await I.wait(4);
    await I.retry(3).waitForText('Reasonable adjustments can include:');
    await I.retry(3).waitForText(extraSupportDetails.documentNeeds);
    await I.retry(3).waitForText(extraSupportDetails.communicationNeeds);
    await I.retry(3).waitForText(extraSupportDetails.mobilitySupport);
    await I.retry(3).waitForText(extraSupportDetails.whyExtraSupportIsNeeded);
    await I.retry(3).click(this.fields.applicant1extraSupportAdjustment);
    await I.wait(4);
    await I.retry(3).waitForText(extraSupportDetails.tellWhatSupportIsNeeded);
    await I.retry(3).forceClick('Save and continue');
    await I.retry(3).waitForText(extraSupportDetails.detailsOfExtraSupportError);
    await I.retry(3).fillField(
      this.fields.applicant1extraSupportAdjustmentDetails,
      primaryApplicantPersonalDetails.primaryApplicantExtraSupportDetails
    );
    await I.retry(3).forceClick('Save and continue');
  },
};
