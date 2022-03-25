const { I } = inject();

module.exports = {
  fields: {
    findFamilyCourt: 'input[id$="findFamilyCourt"]',
  },

  async childDetailsFindFamilyCourtSection() {
    await I.retry(3).waitForText('You have told us that the court which issued the placement order was Swansea.');
    await I.retry(3).click(this.fields.findFamilyCourt);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
