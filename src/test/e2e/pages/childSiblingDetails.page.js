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
  },

  childDetailsSiblingSection() {
    I.waitForText('Does the child have any siblings or half siblings?', 30);
    I.click(this.fields.hasSiblings);
    I.click('Save and continue');
    I.wait('2');
    I.waitForText("Is there a court order in place for any of the child's siblings or half siblings?", 30);
    I.click(this.fields.hasPoForSiblings);
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('Which siblings or half siblings have a court order in place?');
    I.fillField(this.fields.siblingFirstName, 'Amelia');
    I.fillField(this.fields.siblingLastNames, 'Florance');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('What type of order is it?');
    I.fillField(this.fields.placementOrderType, 'Care Order');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('What is the serial or case number on the order?');
    I.fillField(this.fields.placementOrderNumber, 'ABC1234');
    I.click('Save and continue');
    I.wait('2');
    I.click(this.fields.addAnotherSiblingPlacementOrderNo);
    I.click('Save and continue');
    I.wait('2');
  },
};
