const { I } = inject();

module.exports = {
  fields: {
    applicant1IBelieveApplicationIsTrue: 'input[id$="applicant1IBelieveApplicationIsTrue"]',
    applicant2IBelieveApplicationIsTrue: 'input[id$="applicant2IBelieveApplicationIsTrue"]',
    applicant1SotFullName: 'input[id$="applicant1SotFullName"]',
    applicant2SotFullName: 'input[id$="applicant2SotFullName"]',
    paymentTypeCard: 'input[id$="paymentType"]',
  },

  reviewPayAndSubmitDetailsSection() {
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
  },
};
