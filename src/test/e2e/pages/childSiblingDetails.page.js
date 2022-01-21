const { I } = inject();

module.exports = {
  fields: {
    hasSiblings: 'input[id$="hasSiblings"]',
    hasPoForSiblings: 'input[id$="hasPoForSiblings"]',
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
  },
};
