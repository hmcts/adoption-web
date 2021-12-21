const { I } = inject();

module.exports = {
  fields: {
    childrenFirstName: 'input[id$="childrenFirstName"]',
    childrenLastName: 'input[id$="childrenLastName"]',
    childrenDateOfBirthDay: 'input[id$="childrenDateOfBirth-day"]',
    childrenDateOfBirthMonth: 'input[id$="childrenDateOfBirth-month"]',
    childrenDateOfBirthYear: 'input[id$="childrenDateOfBirth-year"]',
    childrenSexAtBirth: 'input[id$="childrenSexAtBirth"]',
  },

  childDetailsBirthCertificaterSection() {
    I.fillField(this.fields.childrenFirstName, 'William');
    I.fillField(this.fields.childrenLastName, 'Jacob');
    I.click('Save and continue');
    I.wait('2');
    I.fillField(this.fields.childrenDateOfBirthDay, '10');
    I.fillField(this.fields.childrenDateOfBirthMonth, '10');
    I.wait('2');
    I.fillField(this.fields.childrenDateOfBirthYear, '2020');
    I.click('Save and continue');
    I.wait('2');
    I.click(this.fields.childrenSexAtBirth);
    I.click('Save and continue');
  },
};
