const { I } = inject();
const childDetailsPlacementOrder = require('../fixtures/caseData/childDetailsPlacementOrder');
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
    await I.retry(3).fillField(this.fields.placementOrderNumber, childDetailsPlacementOrder.placementOrderNumber);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Which court made the placement order?');
    await I.retry(3).fillField(this.fields.placementOrderCourt, childDetailsPlacementOrder.placementOrderCourt);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText('What date is on the placement order?');
    await I.retry(3).fillField(this.fields.placementOrderDateDay, childDetailsPlacementOrder.placementOrderDateDay);
    await I.retry(3).fillField(this.fields.placementOrderDateMonth, childDetailsPlacementOrder.placementOrderDateMonth);
    await I.wait(2);
    await I.retry(3).fillField(this.fields.placementOrderDateYear, childDetailsPlacementOrder.placementOrderDateYear);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see('Orders already in place');
    await I.retry(3).see('Do you want to add another order?');
    await I.retry(3).click(this.fields.addAnotherPlacementOrder);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).waitForText('What type of order is it?');
    await I.retry(3).click(this.fields.placementOrderType);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).fillField(this.fields.placementOrderNumber, childDetailsPlacementOrder.placementOrderNumber);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Which court made the placement order?');
    await I.retry(3).fillField(this.fields.placementOrderCourt, childDetailsPlacementOrder.placementOrderCourt);
    await I.retry(3).click('Save and continue');
    await I.retry(3).waitForText('What date is on the placement order?');
    await I.retry(3).fillField(this.fields.placementOrderDateDay, childDetailsPlacementOrder.placementOrderDateDay);
    await I.retry(3).fillField(this.fields.placementOrderDateMonth, childDetailsPlacementOrder.placementOrderDateMonth);
    await I.wait(2);
    await I.retry(3).fillField(this.fields.placementOrderDateYear, childDetailsPlacementOrder.placementOrderDateYear);
    await I.retry(3).click('Save and continue');
    await I.retry(3).see('Orders already in place');
    await I.retry(3).see('Adoption Order');
    await I.retry(3).see('Do you want to add another order?');
    await I.retry(3).click(this.fields.addAnotherPlacementOrderNo);
    await I.retry(3).click('Save and continue');
    await I.wait(3);
  },
};
