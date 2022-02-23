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
    pcqNO: '.govuk-button.govuk-button--secondary',
  },

  reviewPayAndSubmitDetailsSection() {
    I.wait('5');
    if (I.seeElement(this.fields.pcqNO)) {
      I.click("I don't want to answer these questions");
    }
    I.wait('5');
    I.waitForText('Review your application, pay and send', 30);
    I.click('Continue');
    I.waitForText('Statement of truth', 30);
    I.click(this.fields.applicant1IBelieveApplicationIsTrue);
    I.click(this.fields.applicant2IBelieveApplicationIsTrue);
    I.fillField(this.fields.applicant1SotFullName, 'Joe Bloggs');
    I.fillField(this.fields.applicant2SotFullName, 'George Thomas');
    I.click('Confirm');
    I.wait('3');
  },

  adoptionCourtFeesByCard() {
    I.waitForText('Paying your adoption court fees', 30);
    I.click(this.fields.paymentTypeCard);
    I.click('Continue');
    I.wait(30);
    I.waitForText('Enter card details', 30);
    I.fillField(this.fields.cardNo, '4444333322221111');
    I.fillField(this.fields.expiryMonth, '10');
    I.fillField(this.fields.expiryYear, '28');
    I.fillField(this.fields.cardholderName, 'Joe Bloggs');
    I.fillField(this.fields.cvc, '123');
    I.fillField(this.fields.addressLine1, '2');
    I.fillField(this.fields.addressLine2, 'Chruch road');
    I.fillField(this.fields.addressCity, 'Uxbridge');
    I.fillField(this.fields.addressPostcode, 'UB8 3NA');
    I.fillField(this.fields.email, 'simulate-delivered@notifications.service.gov.uk');
    I.click('Continue');
    I.wait(10);
    I.waitForText('Confirm your payment', 30);
    I.waitForText('£183.00', 30);
    I.click('Confirm payment');
  },
};
