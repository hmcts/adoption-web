const { I } = inject();

module.exports = {
  fields: {
    childrenFirstName: 'input[id$="childrenFirstName"]',
    childrenLastName: 'input[id$="childrenLastName"]',
    childrenDateOfBirthDay: 'input[id$="childrenDateOfBirth-day"]',
    childrenDateOfBirthMonth: 'input[id$="childrenDateOfBirth-month"]',
    childrenDateOfBirthYear: 'input[id$="childrenDateOfBirth-year"]',
    childrenSexAtBirth: 'input[id$="childrenSexAtBirth"]',
    britishCitizen: 'input[id$="childrenNationality"]',
    citizenOfDifferentCountry: 'input[id$="childrenNationality-3"]',
    addAnotherNationality: 'input[id$="addAnotherNationality"]',
  },

  async childDetailsBirthCertificaterSection() {
    await I.waitForText("What is the child's full name?");
    await I.fillField(this.fields.childrenFirstName, 'William');
    await I.fillField(this.fields.childrenLastName, 'Jacob');
    await I.click('Save and continue');
    await I.wait('2');
    await I.fillField(this.fields.childrenDateOfBirthDay, '10');
    await I.fillField(this.fields.childrenDateOfBirthMonth, '10');
    await I.wait('2');
    await I.fillField(this.fields.childrenDateOfBirthYear, '2020');
    await I.click('Save and continue');
    await I.wait('2');
    await I.click(this.fields.childrenSexAtBirth);
    await I.click('Save and continue');
    await I.click(this.fields.britishCitizen);
    await I.click(this.fields.citizenOfDifferentCountry);
    await I.fillField(this.fields.addAnotherNationality, 'India');
    await I.click('Add');
    await I.wait('2');
    await I.click('Save and continue');
    await I.wait('4');
  },
};
