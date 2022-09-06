const { I } = inject();
const childBirthCertificateDetails = require('../fixtures/caseData/childBirthCertificateDetails');
const childBasicInitialDetails = require('../fixtures/caseData/childBasicDetails');
module.exports = {
  fields: {
    childrenFirstName: 'input[id$="childrenFirstName"]',
    childrenLastName: 'input[id$="childrenLastName"]',
    childrenSexAtBirth: 'input[id$="childrenSexAtBirth"]',
    britishCitizen: 'input[id$="childrenNationality"]',
    citizenOfDifferentCountry: 'input[id$="childrenNationality-3"]',
    addAnotherNationality: 'input[id$="addAnotherNationality"]',
  },

  async childDetailsBirthCertificaterSection() {
    await I.retry(3).waitForText("What was the child's sex at birth?");
    await I.wait(2);
    await I.retry(3).click(this.fields.childrenSexAtBirth);
    await I.retry(3).click('Save and continue');
    await I.wait(3);
    await I.retry(3).click(this.fields.britishCitizen);
    await I.retry(3).click(this.fields.citizenOfDifferentCountry);
    await I.retry(3).fillField(this.fields.addAnotherNationality, childBirthCertificateDetails.childOtherNationality);
    await I.retry(3).click('Add');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async childDetailsBirthCertificaterSectionEmpty() {
    await I.retry(3).waitForText("What is the child's full name?");
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see("Enter the child's first names");
    await I.retry(3).see("Enter the child's last names");
    await I.retry(3).fillField(this.fields.childrenFirstName, childBasicInitialDetails.childFirstNameBeforeAdoption);
    await I.retry(3).fillField(this.fields.childrenLastName, childBasicInitialDetails.childLastNameBeforeAdoption);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).click(this.fields.childrenSexAtBirth);
    await I.retry(3).click('Save and continue');
    await I.retry(3).click(this.fields.britishCitizen);
    await I.retry(3).click(this.fields.citizenOfDifferentCountry);
    await I.retry(3).fillField(this.fields.addAnotherNationality, childBirthCertificateDetails.childOtherNationality);
    await I.retry(3).click('Add');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
