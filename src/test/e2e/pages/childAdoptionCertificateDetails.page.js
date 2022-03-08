const { I } = inject();

module.exports = {
  fields: {
    childrenFirstNameAfterAdoption: 'input[id$="childrenFirstNameAfterAdoption"]',
    childrenLastNameAfterAdoption: 'input[id$="childrenLastNameAfterAdoption"]',
  },

  async childAdoptionCertificateDetailsSection() {
    await I.waitForText("What will the child's full name be after adoption?");
    await I.fillField(this.fields.childrenFirstNameAfterAdoption, 'Joe');
    await I.fillField(this.fields.childrenLastNameAfterAdoption, 'Flient');
    await I.wait('2');
    await I.click('Save and continue');
    await I.wait('4');
  },
};
