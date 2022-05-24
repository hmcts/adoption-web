const { I } = inject();

module.exports = {
  fields: {
    placementOrderCourt: 'input[id$="placementOrderCourt"]',
    findFamilyCourt: 'input[id$="findFamilyCourt"]',
  },

  async childDetailsFindFamilyCourtSection() {
    await I.retry(3).waitForText('Which court made the placement order?');
    await I.retry(3).fillField(this.fields.placementOrderCourt, 'Swansea');
    await I.retry(3).click('Save and continue');
    await I.wait(4);

    await I.retry(3).waitForText('You have told us that the court which issued the placement order was Swansea.');
    await I.retry(3).click(this.fields.findFamilyCourt);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
