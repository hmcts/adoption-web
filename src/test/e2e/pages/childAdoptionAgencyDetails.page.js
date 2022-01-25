const { I } = inject();

module.exports = {
  fields: {
    adopAgencyOrLaName: 'input[id$="adopAgencyOrLaName"]',
    adopAgencyOrLaPhoneNumber: 'input[id$="adopAgencyOrLaPhoneNumber"]',
    adopAgencyOrLaContactName: 'input[id$="adopAgencyOrLaContactName"]',
    adopAgencyOrLaContactEmail: 'input[id$="adopAgencyOrLaContactEmail"]',
    hasAnotherAdopAgencyOrLA: 'input[id$="hasAnotherAdopAgencyOrLA"]',
  },

  childAdoptionAgencyDetailsSection() {
    I.waitForText('Adoption agency or local authority details', 30);
    I.fillField(this.fields.adopAgencyOrLaName, 'Hillingdon');
    I.fillField(this.fields.adopAgencyOrLaPhoneNumber, '0987654321');
    I.fillField(this.fields.adopAgencyOrLaContactName, 'Jake');
    I.fillField(this.fields.adopAgencyOrLaContactEmail, 'test@example.com');
    I.wait('2');
    I.click('Save and continue');
    I.waitForText('Was there another adoption agency or local authority involved in placing the child?', 30);
    I.click(this.fields.hasAnotherAdopAgencyOrLA);
    I.wait('2');
    I.click('Save and continue');
    I.wait('2');
    I.waitForText('Adoption agency or local authority details', 30);
    I.fillField(this.fields.adopAgencyOrLaName, 'Swansea');
    I.fillField(this.fields.adopAgencyOrLaPhoneNumber, '0987654321');
    I.fillField(this.fields.adopAgencyOrLaContactName, 'Freddie');
    I.fillField(this.fields.adopAgencyOrLaContactEmail, 'test.another@example.com');
    I.wait('2');
    I.click('Save and continue');
    I.wait('2');
  },
};
