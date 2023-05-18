const { I } = inject();

module.exports = {
  fields: {
    laSotFullName: 'input[id$="laSotFullName"]',
    laSotJobtitle: 'input[id$="laSotJobtitle"]',
    laNameSot: 'input[id$="laNameSot"]',
    laStatementOfTruth: 'input[id$="laStatementOfTruth"]',
  },
  async laCheckYourAnswersContinue() {
    await I.retry(3).waitForText('Check your answers', 30);
    await I.retry(3).click('Continue');
    await I.wait(4);
  },
  async laStatementOfTruthPage() {
    await I.retry(3).waitForText('Statement of truth', 30);
    await I.retry(3).fillField(this.fields.laSotFullName, 'La Full Name');
    await I.retry(3).fillField(this.fields.laSotJobtitle, 'Local Authority');
    await I.retry(3).fillField(this.fields.laNameSot, 'Swansea');
    await I.retry(3).click(this.fields.laStatementOfTruth);
    await I.retry(3).click('Confirm');
    await I.wait(4);
  },

  async laSubmitApplicationConfirmationPage() {
    await I.retry(3).see('Your application has been submitted');
  },
};
