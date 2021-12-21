const { I } = inject();

module.exports = {
  fields: {
    placementOrderNumber: 'input[id$="placementOrderNumber"]',
    placementOrderCourt: 'input[id$="placementOrderCourt"]',
  },

  childDetailsPlacementOrderSection() {
    I.waitForText('What is the serial or case number on the placement order?');
    I.fillField(this.fields.placementOrderNumber, '123467890');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('Which court made the placement order?');
    I.fillField(this.fields.placementOrderCourt, 'Swansea');
    I.click('Save and continue');
  },
};
