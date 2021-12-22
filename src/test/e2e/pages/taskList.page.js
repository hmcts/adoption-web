const config = require('../config');
const { I } = inject();

module.exports = {
  primaryApplicant: {
    contactDetailsLink: 'a[id$="applicant1-contact-details"]',
    personalDetailsLink: 'a[id$="applicant1-personal-details"]',
  },
  secondApplicant: {
    contactDetailsLink: 'a[id$="applicant2-contact-details"]',
    childrenPlacementOrderLink: 'a[id$="children-placement-order"]',
  },
  childDetails: {
    childrenBirthCertificateLink: 'a[id$="children-birth-certificate"]',
  },

  async goToTaskListPage() {
    await I.goToPage(config.baseUrl + 'task-list');
  },
  async selectTaskNameFromTaskList(taskName) {
    await I.click(taskName);
  },

  async selectPrimaryApplicantContactDetails() {
    await I.click(this.primaryApplicant.contactDetailsLink);
  },

  async selectOtherApplicantContactDetails() {
    await I.click(this.secondApplicant.contactDetailsLink);
  },

  async selectChildPlacementOrderDetails() {
    await I.click(this.secondApplicant.childrenPlacementOrderLink);
  },
  async selectChildrenBirthCertificate() {
    await I.click(this.childDetails.childrenBirthCertificateLink);
  },

  async selectFirstApplicantPersonalDetails() {
    await I.click(this.primaryApplicant.personalDetailsLink);
  },
};
