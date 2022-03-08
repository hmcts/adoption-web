const { I } = inject();

module.exports = {
  fields: {
    placementOrderNumber: 'input[id$="placementOrderNumber"]',
    placementOrderCourt: 'input[id$="placementOrderCourt"]',
    placementOrderDateDay: 'input[id$="placementOrderDate-day"]',
    placementOrderDateMonth: 'input[id$="placementOrderDate-month"]',
    placementOrderDateYear: 'input[id$="placementOrderDate-year"]',
    addAnotherPlacementOrder: 'input[id$="addAnotherPlacementOrder"]',
    addAnotherPlacementOrderNo: 'input[id$="addAnotherPlacementOrder-2"]',
    placementOrderType: 'input[id$="placementOrderType"]',
  },

  async childDetailsPlacementOrderSection() {
    await I.waitForText('What is the serial or case number on the placement order?');
    await I.fillField(this.fields.placementOrderNumber, '09876543210');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('Which court made the placement order?');
    await I.fillField(this.fields.placementOrderCourt, 'Swansea');
    await I.click('Save and continue');
    await I.waitForText('What date is on the placement order?');
    await I.fillField(this.fields.placementOrderDateDay, '21');
    await I.fillField(this.fields.placementOrderDateMonth, '12');
    await I.wait('2');
    await I.fillField(this.fields.placementOrderDateYear, '2021');
    await I.click('Save and continue');
    await I.see('Orders already in place');
    await I.see('Do you want to add another order?');
    await I.click(this.fields.addAnotherPlacementOrder);
    await I.click('Save and continue');
    await I.fillField(this.fields.placementOrderType, 'Emergency protection order');
    await I.click('Save and continue');
    await I.wait('2');
    await I.fillField(this.fields.placementOrderNumber, '09876543210');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('Which court made the placement order?');
    await I.fillField(this.fields.placementOrderCourt, 'Swansea');
    await I.click('Save and continue');
    await I.waitForText('What date is on the placement order?');
    await I.fillField(this.fields.placementOrderDateDay, '21');
    await I.fillField(this.fields.placementOrderDateMonth, '12');
    await I.wait('2');
    await I.fillField(this.fields.placementOrderDateYear, '2021');
    await I.click('Save and continue');
    await I.see('Orders already in place');
    await I.see('Emergency protection order');
    await I.see('Do you want to add another order?');
    await I.click(this.fields.addAnotherPlacementOrderNo);
    await I.click('Save and continue');
    await I.wait('3');
  },
};
