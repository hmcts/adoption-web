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
  },
  async selectNoPCQOption() {
    await I.wait('5');
    const numOfPCQElements = await I.grabNumberOfVisibleElements(this.fields.pcqNO);
    console.log('No of elements: ' + numOfPCQElements);
    if (numOfPCQElements === 1) {
      await I.click("I don't want to answer these questions");
    }
    await I.wait('5');
  },

  async changeValueFromReviewYourAnswers() {
    await I.waitForText('Review your answers', 30);
    await I.click(this.fields.changeChildMoveInDate);
    await I.wait('5');
  },

  async reviewYourAnswersAndContinue() {
    await I.waitForText('Review your answers', 30);
    await I.click('Save and continue');
    await I.wait('5');
  },

  async statementOfTruthDetailsSection() {
    await I.waitForText('Statement of truth', 30);
    await I.click(this.fields.applicant1IBelieveApplicationIsTrue);
    await I.click(this.fields.applicant2IBelieveApplicationIsTrue);
    await I.fillField(this.fields.applicant1SotFullName, 'Joe Bloggs');
    await I.fillField(this.fields.applicant2SotFullName, 'George Thomas');
    await I.click('Confirm');
    await I.wait('4');
  },

  async adoptionCourtFeesByCard() {
    await I.waitForText('Paying your adoption court fees', 30);
    await I.click(this.fields.paymentTypeCard);
    await I.click('Continue');
    await I.wait(30);
    await I.waitForText('Enter card details', 30);
    await I.fillField(this.fields.cardNo, '4444333322221111');
    await I.fillField(this.fields.expiryMonth, '10');
    await I.fillField(this.fields.expiryYear, '28');
    await I.fillField(this.fields.cardholderName, 'Joe Bloggs');
    await I.fillField(this.fields.cvc, '123');
    await I.fillField(this.fields.addressLine1, '2');
    await I.fillField(this.fields.addressLine2, 'Chruch road');
    await I.fillField(this.fields.addressCity, 'Uxbridge');
    await I.fillField(this.fields.addressPostcode, 'UB8 3NA');
    await I.fillField(this.fields.email, 'simulate-delivered@notifications.service.gov.uk');
    await I.click('Continue');
    await I.wait(10);
    await I.waitForText('Confirm your payment', 30);
    await I.waitForText('£183.00', 30);
    await I.click('Confirm payment');
    await I.wait(5);
    await I.waitForText('Application Submitted', 30);
    console.log(await I.grabTextFrom(this.fields.caseID));
  },
};
