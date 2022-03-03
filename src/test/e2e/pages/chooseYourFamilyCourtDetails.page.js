const { I } = inject();

module.exports = {
  fields: {
    findFamilyCourt: 'input[id$="findFamilyCourt"]',
  },

  async childDetailsFindFamilyCourtSection() {
    await I.waitForText('You have told us that the court which issued the placement order was Swansea.');
    await I.click(this.fields.findFamilyCourt);
    await I.click('Save and continue');
    await I.wait('3');
  },
};
