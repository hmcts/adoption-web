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
    personalDetailsLink: 'a[id$="applicant2-personal-details"]',
    personalDetailsLinkStatus: 'strong[id$="applicant2-personal-details-status"]',
  },
  childDetails: {
    childrenBirthCertificateLink: 'a[id$="children-birth-certificate"]',
    adoptionCertificateDetailsLink: 'a[id$="adoption-certificate-details"]',
    childrenBirthCertificateDetailsStatus: 'strong[id$="children-birth-certificate-details-status"]',
    adoptionCertificateDetails: 'strong[id$="adoption-certificate-details-status"]',
    childrenBirthMotherLink: 'a[id$="children-birth-mother"]',
    childrenBirthMotherDetailsStatus: 'strong[id$="birth-mother-details-status"]',
    childOtherParentLink: 'a[id$="other-parent-status"]',
    childOtherParentDetailsStatus: 'strong[id$="other-parent-status"]',
    childrenBirthFatherLink: 'a[id$="children-birth-father"]',
    childrenBirthFatherDetailsStatus: 'strong[id$="birth-father-status"]',
  },

  async goToTaskListPage() {
    await I.goToPage(config.baseUrl + 'task-list');
    I.wait('3');
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

  async selectFirstApplicantPersonalDetails() {
    await I.click(this.primaryApplicant.contactDetailsLink);
  },

  async selectChildrenBirthCertificate() {
    await I.click(this.childDetails.childrenBirthCertificateLink);
  },

  async selectFirstApplicantPersonalDetails() {
    await I.click(this.primaryApplicant.personalDetailsLink);
  },
  async selectOtherApplicantPersonalDetails() {
    await I.click(this.secondApplicant.personalDetailsLink);
  },
  async verifyOtherApplicantPersonalDetailsStatus() {
    await I.see('COMPLETED', this.secondApplicant.personalDetailsLinkStatus);
  },
  async verifyChildBirthCertificateDetailsStatus() {
    await I.see('COMPLETED', this.childDetails.childrenBirthCertificateDetailsStatus);
  },

  async selectChildAdoptionCertificateDetails() {
    await I.click(this.childDetails.adoptionCertificateDetailsLink);
  },

  async verifyAdoptionCertificateDetailStatus() {
    await I.see('COMPLETED', this.childDetails.adoptionCertificateDetails);
  },

  async selectChildBirthMotherDetails() {
    await I.click(this.childDetails.childrenBirthMotherLink);
  },

  async verifyChildBirthMotherDetailsStatus() {
    await I.see('COMPLETED', this.childDetails.childrenBirthMotherDetailsStatus);
  },

  async selectChildOtherParentDetails() {
    await I.click(this.childDetails.childOtherParentLink);
  },

  async verifyChildOtherParentDetailsStatus() {
    await I.see('COMPLETED', this.childDetails.childOtherParentDetailsStatus);
  },

  async selectChildBirthFatherDetails() {
    await I.click(this.childDetails.childrenBirthFatherLink);
  },

  async verifyChildBirthFatherDetailsStatus() {
    await I.see('COMPLETED', this.childDetails.childrenBirthFatherDetailsStatus);
  },
};
