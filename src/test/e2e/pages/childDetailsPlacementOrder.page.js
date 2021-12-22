const { I } = inject();

module.exports = {
  fields: {
    placementOrderNumber: 'input[id$="placementOrderNumber"]',
    placementOrderCourt: 'input[id$="placementOrderCourt"]',
    placementOrderDateDay: 'input[id$="placementOrderDate-day"]',
    placementOrderDateMonth: 'input[id$="placementOrderDate-month"]',
    placementOrderDateYear: 'input[id$="placementOrderDate-year"]',
  },

  childDetailsPlacementOrderSection() {
    I.waitForText('What is the serial or case number on the placement order?');
    I.fillField(this.fields.placementOrderNumber, '123467890');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('Which court made the placement order?');
    I.fillField(this.fields.placementOrderCourt, 'Swansea');
    I.click('Save and continue');
    I.waitForText('What date is on the placement order?');
    I.fillField(this.fields.placementOrderDateDay, '21');
    I.fillField(this.fields.placementOrderDateMonth, '12');
    I.wait('2');
    I.fillField(this.fields.placementOrderDateYear, '2021');
    I.click('Save and continue');
  },
};
