const { I } = inject();
const secAppPersonalDetails = require('../fixtures/caseData/secondApplicantPersonalDetails');
const primAppPersonalDetails = require('../fixtures/caseData/primaryApplicantPersonalDetails');
const paymentCardDetails = require('../fixtures/caseData/paymentCardDetails');
module.exports = {
  fields: {
    applicant1IBelieveApplicationIsTrue: '//*[@id="applicant1IBelieveApplicationIsTrue"]',
    applicant2IBelieveApplicationIsTrue: '//*[@id="applicant2IBelieveApplicationIsTrue"]',
    applicant1SotFullName: '//*[@id="applicant1SotFullName"]',
    applicant2SotFullName: '//*[@id="applicant2SotFullName"]',
    paymentTypeCard: '//*[@id="paymentType"]',
    cardNo: '//*[@id="card-no"]',
    expiryMonth: '//*[@id="expiry-month"]',
    expiryYear: '//*[@id="expiry-year"]',
    cardholderName: '//*[@id="cardholder-name"]',
    cvc: '//*[@id="cvc"]',
    addressLine1: '//*[@id="address-line-1"]',
    addressLine2: '//*[@id="address-line-2"]',
    addressCity: '//*[@id="address-city"]',
    addressPostcode: '//*[@id="address-postcode"]',
    email: '//*[@id="email"]',
    pcqNO: 'form[action="/start-page"] button[formaction="/opt-out"]',
    caseID: '.govuk-panel__body strong',
    changeChildMoveInDate: 'a[href="/date-child-moved-in?returnUrl=/review-pay-submit/check-your-answers"]',
    cancelpayment: '//*[@id="cancel-payment"]',
    saveAndContinueButton: '//*[@id="main-form-submit"]',
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
    await I.wait('6');
    await I.retry(3).waitForText('Review your answers', 30);
    await I.retry(3).click(this.fields.changeChildMoveInDate);
    await I.wait(5);
  },

  async reviewYourAnswersAndContinue() {
    await I.wait('6');
    await I.retry(3).waitForText('Review your answers', 30);
    await I.retry(3).click(this.fields.saveAndContinueButton);
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
    await I.retry(3).waitForText('Confirm your statement of truth', 30);
    await I.retry(3).waitForText('Enter your full name', 30);
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
    await I.retry(3).click('Confirm and pay');
    await I.wait(4);
  },

  async reviewAndPay() {
    await I.retry(3).waitForText('Pay and submit', 30);
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
    await I.wait(9);
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
    await I.retry(3).waitForText('Pay and submit', 30);
    await I.retry(3).click('Pay and submit application');
    await I.wait(4);
  },
};
