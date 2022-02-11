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

  childDetailsPlacementOrderSection() {
    I.waitForText('What is the serial or case number on the placement order?');
    I.fillField(this.fields.placementOrderNumber, '09876543210');
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
    I.see('Orders already in place');
    I.see('Do you want to add another order?');
    I.click(this.fields.addAnotherPlacementOrder);
    I.click('Save and continue');
    I.fillField(this.fields.placementOrderType, 'Emergency protection order');
    I.click('Save and continue');
    I.wait('2');
    I.fillField(this.fields.placementOrderNumber, '09876543210');
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
    I.see('Orders already in place');
    I.see('Emergency protection order');
    I.see('Do you want to add another order?');
    I.click(this.fields.addAnotherPlacementOrderNo);
    I.click('Save and continue');
    I.wait('3');
  },
};
