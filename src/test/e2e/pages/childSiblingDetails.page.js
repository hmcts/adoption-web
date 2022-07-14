const { I } = inject();

module.exports = {
  fields: {
    hasSiblings: 'input[id$="hasSiblings"]',
    siblingRelation: 'input[id$="selectedSiblingRelation"]',
    siblingRelation2: 'input[id$="selectedSiblingRelation-2"]',
    siblingPoType: 'input[id$="selectedSiblingPoType"]',
    siblingPoType2: 'input[id$="selectedSiblingPoType-2"]',
    siblingPoNumber: 'input[id$="siblingPoNumber"]',
    addAnotherSiblingPlacementOrderNo: 'input[id$="addAnotherSiblingPlacementOrder-2"]',
    addAnotherSiblingPlacementOrderYES: 'input[id$="addAnotherSiblingPlacementOrder"]',
    selectedSiblingId2: 'input[id$="selectedSiblingId-2"]',
  },

  async childDetailsSiblingSection() {
    await I.retry(3).waitForText('Does the child have any siblings or half siblings with court orders?', 30);
    await I.retry(3).click(this.fields.hasSiblings);
    await I.retry(3).see('You will be asked to provide each sibling court order individually.');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('What is their relationship to the child being adopted?', 30);

    await I.retry(3).click(this.fields.siblingRelation);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('What type of order is it?');
    await I.retry(3).click(this.fields.siblingPoType);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('What is the serial or case number on the order?');
    await I.retry(3).fillField(this.fields.siblingPoNumber, 'ABC1234');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).click(this.fields.addAnotherSiblingPlacementOrderYES);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('What is their relationship to the child being adopted?', 30);
    await I.retry(3).click(this.fields.siblingRelation2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('What type of order is it?');
    await I.retry(3).click(this.fields.siblingPoType2);
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).waitForText('What is the serial or case number on the order?');
    await I.retry(3).fillField(this.fields.siblingPoNumber, 'ABC456');
    await I.retry(3).click('Save and continue');
    await I.wait(2);
    await I.retry(3).click(this.fields.addAnotherSiblingPlacementOrderNo);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
