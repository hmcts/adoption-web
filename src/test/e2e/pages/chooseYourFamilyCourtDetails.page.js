const { I } = inject();
const familyCourtDetails = require('../fixtures/caseData/familyCourtDetails');
module.exports = {
  fields: {
    placementOrderCourt: 'input[id$="placementOrderCourt"]',
    findFamilyCourt: 'input[id$="findFamilyCourt"]',
    courtList: 'input[id$="location-picker"]',
    courtListOption: 'li[id$="location-picker__option--0"]',
  },

  async childDetailsFindFamilyCourtSection() {
    await I.retry(3).waitForText('Which court made the placement order?');

    await I.retry(3).fillField(this.fields.courtList, familyCourtDetails.familyCourtDetails);
    await I.wait(2);
    await I.retry(3).click(this.fields.courtListOption);
    await I.wait(2);

    await I.retry(3).click('Save and continue');
    await I.wait(4);

    await I.retry(3).waitForText(
      'You have told us that the court which issued the placement order was Swansea Civil Justice Centre.'
    );
    await I.retry(3).click(this.fields.findFamilyCourt);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },
};
