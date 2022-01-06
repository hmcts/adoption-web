const { I } = inject();

module.exports = {
  fields: {
    childrenFirstNameAfterAdoption: 'input[id$="childrenFirstNameAfterAdoption"]',
    childrenLastNameAfterAdoption: 'input[id$="childrenLastNameAfterAdoption"]',
  },

  childAdoptionCertificateDetailsSection() {
    I.waitForText("What will the child's full name be after adoption?");
    I.fillField(this.fields.childrenFirstNameAfterAdoption, 'Joe');
    I.fillField(this.fields.childrenLastNameAfterAdoption, 'Flient');
    I.wait('2');
    I.click('Save and continue');
    I.wait('2');
  },
};
