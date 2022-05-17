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
    await I.retry(3).waitForText("What is the child's full name?");
    await I.retry(3).fillField(this.fields.childrenFirstName, 'William');
    await I.retry(3).fillField(this.fields.childrenLastName, 'Jacob');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthDay, '10');
    await I.retry(3).fillField(this.fields.childrenDateOfBirthMonth, '10');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthYear, '2020');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).click(this.fields.childrenSexAtBirth);
    await I.retry(3).click('Save and continue');
    await I.retry(3).click(this.fields.britishCitizen);
    await I.retry(3).click(this.fields.citizenOfDifferentCountry);
    await I.retry(3).fillField(this.fields.addAnotherNationality, 'India');
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
    await I.retry(3).fillField(this.fields.childrenFirstName, 'William');
    await I.retry(3).fillField(this.fields.childrenLastName, 'Jacob');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('Enter their date of birth');
    await I.retry(3).fillField(this.fields.childrenDateOfBirthDay, '10');
    await I.retry(3).fillField(this.fields.childrenDateOfBirthMonth, '10');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.childrenDateOfBirthYear, '2020');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).click(this.fields.childrenSexAtBirth);
    await I.retry(3).click('Save and continue');
    await I.retry(3).click(this.fields.britishCitizen);
    await I.retry(3).click(this.fields.citizenOfDifferentCountry);
    await I.retry(3).fillField(this.fields.addAnotherNationality, 'India');
    await I.retry(3).click('Add');
    await I.wait(2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
