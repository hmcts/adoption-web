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
    await I.retry(3).waitForText('What is the serial or case number on the placement order?');
    await I.retry(3).fillField(this.fields.placementOrderNumber, '09876543210');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Which court made the placement order?');
    await I.retry(3).fillField(this.fields.placementOrderCourt, 'Swansea');
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText('What date is on the placement order?');
    await I.retry(3).fillField(this.fields.placementOrderDateDay, '21');
    await I.retry(3).fillField(this.fields.placementOrderDateMonth, '12');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.placementOrderDateYear, '2021');
    await I.retry(3).click('Save and continue');
    await I.retry(3).see('Orders already in place');
    await I.retry(3).see('Do you want to add another order?');
    await I.retry(3).click(this.fields.addAnotherPlacementOrder);
    await I.retry(3).click('Save and continue');
    await I.retry(3).fillField(this.fields.placementOrderType, 'Emergency protection order');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.placementOrderNumber, '09876543210');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Which court made the placement order?');
    await I.retry(3).fillField(this.fields.placementOrderCourt, 'Swansea');
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText('What date is on the placement order?');
    await I.retry(3).fillField(this.fields.placementOrderDateDay, '21');
    await I.retry(3).fillField(this.fields.placementOrderDateMonth, '12');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.placementOrderDateYear, '2021');
    await I.retry(3).click('Save and continue');
    await I.retry(3).see('Orders already in place');
    await I.retry(3).see('Emergency protection order');
    await I.retry(3).see('Do you want to add another order?');
    await I.retry(3).click(this.fields.addAnotherPlacementOrderNo);
    await I.retry(3).click('Save and continue');
    await I.wait(3);
  },
};
