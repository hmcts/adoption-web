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
    await I.retry(3).waitForText('Does the child have any siblings or half siblings?', 30);
    await I.retry(3).click(this.fields.hasSiblings);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText(
      "Is there a court order in place for any of the child's siblings or half siblings?",
      30
    );
    await I.retry(3).click(this.fields.hasPoForSiblings);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('Which siblings or half siblings have a court order in place?');
    await I.retry(3).fillField(this.fields.siblingFirstName, 'Amelia');
    await I.retry(3).fillField(this.fields.siblingLastNames, 'Florance');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('What type of order is it?');
    await I.retry(3).fillField(this.fields.placementOrderType, 'Care Order');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('What is the serial or case number on the order?');
    await I.retry(3).fillField(this.fields.placementOrderNumber, 'ABC1234');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).click(this.fields.addAnotherSiblingPlacementOrderYES);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).click(this.fields.selectedSiblingId2);
    await I.wait(2);
    await I.retry(3).fillField(this.fields.siblingFirstName, 'Rosie');
    await I.retry(3).fillField(this.fields.siblingLastNames, 'Florance');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('What type of order is it?');
    await I.retry(3).fillField(this.fields.placementOrderType, 'Care Order');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('What is the serial or case number on the order?');
    await I.retry(3).fillField(this.fields.placementOrderNumber, 'ABC1234');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).see('Rosie Florance');
    await I.retry(3).click(this.fields.addAnotherSiblingPlacementOrderNo);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
