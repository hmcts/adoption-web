const { I } = inject();
const secAppPersonalDetails = require('../fixtures/caseData/secondApplicantPersonalDetails');
const primAppPersonalDetails = require('../fixtures/caseData/primaryApplicantPersonalDetails');
const paymentCardDetails = require('../fixtures/caseData/paymentCardDetails');
module.exports = {
  fields: {
    applicant1IBelieveApplicationIsTrue: 'input[id$="applicant1IBelieveApplicationIsTrue"]',
    applicant2IBelieveApplicationIsTrue: 'input[id$="applicant2IBelieveApplicationIsTrue"]',
    applicant1SotFullName: 'input[id$="applicant1SotFullName"]',
    applicant2SotFullName: 'input[id$="applicant2SotFullName"]',
    paymentTypeCard: 'input[id$="paymentType"]',
    cardNo: 'input[id$="card-no"]',
    expiryMonth: 'input[id$="expiry-month"]',
    expiryYear: 'input[id$="expiry-year"]',
    cardholderName: 'input[id$="cardholder-name"]',
    cvc: 'input[id$="cvc"]',
    addressLine1: 'input[id$="address-line-1"]',
    addressLine2: 'input[id$="address-line-2"]',
    addressCity: 'input[id$="address-city"]',
    addressPostcode: 'input[id$="address-postcode"]',
    email: 'input[id$="email"]',
    pcqNO: 'form[action="/start-page"] button[formaction="/opt-out"]',
    caseID: '.govuk-panel__body strong',
    changeChildMoveInDate: 'a[href="/date-child-moved-in?returnUrl=/review-pay-submit/check-your-answers"]',
    cancelpayment: 'input[id$="cancel-payment"]',
  },
  async selectNoPCQOption() {
    await I.wait(5);
    const numOfPCQElements = await I.retry(3).grabNumberOfVisibleElements(this.fields.pcqNO);
    if (numOfPCQElements === 1) {
      await I.retry(3).click("I don't want to answer these questions");
    }
    await I.wait(5);
  },

  async changeValueFromReviewYourAnswers() {
    await I.retry(3).waitForText('Review your answers', 30);
    await I.retry(3).click(this.fields.changeChildMoveInDate);
    await I.wait(5);
  },

  async reviewYourAnswersAndContinue() {
    await I.retry(3).waitForText('Review your answers', 30);
    await I.retry(3).click('Save and continue');
    await I.wait(5);
  },

  async statementOfTruthDetailsSection() {
    await I.retry(3).waitForText('Statement of truth', 30);
    await I.retry(3).click(this.fields.applicant1IBelieveApplicationIsTrue);
    await I.retry(3).click(this.fields.applicant2IBelieveApplicationIsTrue);
    await I.retry(3).fillField(
      this.fields.applicant1SotFullName,
      primAppPersonalDetails.primaryApplicantFirstName + ' ' + primAppPersonalDetails.primaryApplicantSecondName
    );
    await I.retry(3).fillField(
      this.fields.applicant2SotFullName,
      secAppPersonalDetails.secondApplicantFirstName + ' ' + secAppPersonalDetails.secondApplicantSecondName
    );
    await I.retry(3).click('Confirm');
    await I.wait(4);
  },

  async statementOfTruthDetailsSectionForSingleApplicant() {
    await I.retry(3).waitForText('Statement of truth', 30);
    await I.retry(3).click(this.fields.applicant1IBelieveApplicationIsTrue);
    await I.retry(3).fillField(this.fields.applicant1SotFullName, 'Joe Bloggs');
    await I.retry(3).click('Confirm');
    await I.wait(4);
  },

  async statementOfTruthDetailsSectionEmpty() {
    await I.retry(3).waitForText('Statement of truth', 30);
    await I.retry(3).click('Confirm');
    await I.wait(4);
    await I.retry(3).see('Confirm your statement of truth');
    await I.retry(3).see('Enter your full name');
    await I.retry(3).click(this.fields.applicant1IBelieveApplicationIsTrue);
    await I.retry(3).click(this.fields.applicant2IBelieveApplicationIsTrue);
    await I.retry(3).fillField(
      this.fields.applicant1SotFullName,
      primAppPersonalDetails.primaryApplicantFirstName + ' ' + primAppPersonalDetails.primaryApplicantSecondName
    );
    await I.retry(3).fillField(
      this.fields.applicant2SotFullName,
      secAppPersonalDetails.secondApplicantFirstName + ' ' + secAppPersonalDetails.secondApplicantSecondName
    );
    await I.retry(3).click('Confirm');
    await I.wait(4);
  },

  async reviewAndPay() {
    await I.retry(3).see('Pay and submit');
    await I.retry(3).click('Pay and submit application');
    await I.wait(4);
  },

  async adoptionCourtFeesByCard() {
    await I.wait(30);
    await I.retry(3).waitForText('Enter card details', 30);
    await I.retry(3).fillField(this.fields.cardNo, paymentCardDetails.paymentCardNumber);
    await I.retry(3).fillField(this.fields.expiryMonth, paymentCardDetails.paymentCardExpiryMonth);
    await I.retry(3).fillField(this.fields.expiryYear, paymentCardDetails.paymentCardExpiryYear);
    await I.retry(3).fillField(
      this.fields.cardholderName,
      primAppPersonalDetails.primaryApplicantFirstName + ' ' + primAppPersonalDetails.primaryApplicantSecondName
    );
    await I.retry(3).fillField(this.fields.cvc, paymentCardDetails.paymentCardCVVNumber);
    await I.retry(3).fillField(this.fields.addressLine1, paymentCardDetails.cardHolderAddressLine1);
    await I.retry(3).fillField(this.fields.addressLine2, paymentCardDetails.cardHolderAddressLine2);
    await I.retry(3).fillField(this.fields.addressCity, paymentCardDetails.cardHolderAddressCity);
    await I.retry(3).fillField(this.fields.addressPostcode, paymentCardDetails.cardHolderPostCode);
    await I.retry(3).fillField(this.fields.email, paymentCardDetails.cardHolderEmailAddress);
    await I.retry(3).click('Continue');
    await I.wait(10);
    await I.retry(3).waitForText('Confirm your payment', 30);
    await I.retry(3).waitForText('£183.00', 30);
    await I.retry(3).click('Confirm payment');
    await I.wait(5);
    await I.retry(3).waitForText('Application submitted', 30);
    await I.wait(5);
  },

  async getCaseIDAfterAplicationSubmit() {
    console.log(await I.retry(3).grabTextFrom(this.fields.caseID));
    const caseId = await I.retry(3).grabTextFrom(this.fields.caseID);
    const normalizeCaseId = caseId.toString().replace(/\D/g, '');
    return normalizeCaseId;
  },

  async paymentCancellation() {
    await I.wait(3);
    await I.retry(3).waitForText('Enter card details', 30);
    await I.wait(5);
    await I.retry(3).click('Cancel payment');
    await I.wait(3);
    await I.retry(3).waitForText('Your payment has been cancelled');
    await I.retry(3).waitForText('No money has been taken from your account.');
    await I.retry(3).click('Continue');
    await I.wait(3);
    await I.retry(3).waitForText('Statement of truth', 30);
    await I.retry(3).click('Confirm');
    await I.wait(4);
  },

  async reviewPay() {
    await I.retry(3).see('Pay and submit');
    await I.retry(3).click('Pay and submit application');
    await I.wait(4);
  },
};
