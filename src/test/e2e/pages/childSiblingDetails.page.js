const { I } = inject();

module.exports = {
  fields: {
    hasSiblings: 'input[id$="hasSiblings"]',
    hasPoForSiblings: 'input[id$="hasPoForSiblings"]',
    siblingFirstName: 'input[id$="siblingFirstName"]',
    siblingLastNames: 'input[id$="siblingLastNames"]',
    placementOrderType: 'input[id$="placementOrderType"]',
    placementOrderNumber: 'input[id$="placementOrderNumber"]',
    addAnotherSiblingPlacementOrderNo: 'input[id$="addAnotherSiblingPlacementOrder-2"]',
    addAnotherSiblingPlacementOrderYES: 'input[id$="addAnotherSiblingPlacementOrder"]',
    selectedSiblingId2: 'input[id$="selectedSiblingId-2"]',
  },

  async childDetailsSiblingSection() {
    await I.waitForText('Does the child have any siblings or half siblings?', 30);
    await I.click(this.fields.hasSiblings);
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText("Is there a court order in place for any of the child's siblings or half siblings?", 30);
    await I.click(this.fields.hasPoForSiblings);
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('Which siblings or half siblings have a court order in place?');
    await I.fillField(this.fields.siblingFirstName, 'Amelia');
    await I.fillField(this.fields.siblingLastNames, 'Florance');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('What type of order is it?');
    await I.fillField(this.fields.placementOrderType, 'Care Order');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('What is the serial or case number on the order?');
    await I.fillField(this.fields.placementOrderNumber, 'ABC1234');
    await I.click('Save and continue');
    await I.wait('2');
    await I.click(this.fields.addAnotherSiblingPlacementOrderYES);
    await I.click('Save and continue');
    await I.wait('2');
    await I.click(this.fields.selectedSiblingId2);
    await I.wait('2');
    await I.fillField(this.fields.siblingFirstName, 'Rosie');
    await I.fillField(this.fields.siblingLastNames, 'Florance');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('What type of order is it?');
    await I.fillField(this.fields.placementOrderType, 'Care Order');
    await I.click('Save and continue');
    await I.wait('2');
    await I.waitForText('What is the serial or case number on the order?');
    await I.fillField(this.fields.placementOrderNumber, 'ABC1234');
    await I.click('Save and continue');
    await I.wait('2');
    await I.see('Rosie Florance');
    await I.click(this.fields.addAnotherSiblingPlacementOrderNo);
    await I.click('Save and continue');
    await I.wait('4');
  },
};
