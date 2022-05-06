const { I } = inject();

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
    console.log('No of elements: ' + numOfPCQElements);
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
    await I.retry(3).fillField(this.fields.applicant1SotFullName, 'Joe Bloggs');
    await I.retry(3).fillField(this.fields.applicant2SotFullName, 'George Thomas');
    await I.retry(3).click('Confirm');
    await I.wait(4);
  },

  async adoptionCourtFeesByCard() {
    await I.wait(30);
    await I.retry(3).waitForText('Enter card details', 30);
    await I.retry(3).fillField(this.fields.cardNo, '4444333322221111');
    await I.retry(3).fillField(this.fields.expiryMonth, '10');
    await I.retry(3).fillField(this.fields.expiryYear, '28');
    await I.retry(3).fillField(this.fields.cardholderName, 'Joe Bloggs');
    await I.retry(3).fillField(this.fields.cvc, '123');
    await I.retry(3).fillField(this.fields.addressLine1, '2');
    await I.retry(3).fillField(this.fields.addressLine2, 'Chruch road');
    await I.retry(3).fillField(this.fields.addressCity, 'Uxbridge');
    await I.retry(3).fillField(this.fields.addressPostcode, 'UB8 3NA');
    await I.retry(3).fillField(this.fields.email, 'simulate-delivered@notifications.service.gov.uk');
    await I.retry(3).click('Continue');
    await I.wait(10);
    await I.retry(3).waitForText('Confirm your payment', 30);
    await I.retry(3).waitForText('£183.00', 30);
    await I.retry(3).click('Confirm payment');
    await I.wait(5);
    await I.retry(3).waitForText('Application Submitted', 30);
    console.log(await I.retry(3).grabTextFrom(this.fields.caseID));
  },

  async paymentCancellation() {
    await I.wait(30);
    await I.retry(3).waitForText('Enter card details', 30);
    await I.retry(3).see('Enter your date of birth');
    await I.retry(3).click('Cancel payment');
    await I.wait(30);
    await I.retry(3).waitForText('Your payment has been cancelled');
    await I.retry(3).waitForText('No money has been taken from your account.');
    await I.retry(3).click('Continue');
    await I.wait(30);
    await I.retry(3).waitForText('Statement of truth', 30);
  },
};
