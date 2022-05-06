const { I } = inject();
const childAdoptionCertificateDetails = require('../fixtures/caseData/childAdoptionCertificateDetails');
module.exports = {
  fields: {
    childrenFirstNameAfterAdoption: 'input[id$="childrenFirstNameAfterAdoption"]',
    childrenLastNameAfterAdoption: 'input[id$="childrenLastNameAfterAdoption"]',
  },

  async childNameAfterAdoptionDetailsSection() {
    await I.retry(3).waitForText("What will the child's full name be after adoption?");
    await I.retry(3).fillField(
      this.fields.childrenFirstNameAfterAdoption,
      childAdoptionCertificateDetails.childrenFirstNameAfterAdoption
    );
    await I.retry(3).fillField(
      this.fields.childrenLastNameAfterAdoption,
      childAdoptionCertificateDetails.childrenLastNameAfterAdoption
    );
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
