const config = require('../config');

const { I } = inject();

module.exports = {
  primaryApplicant: {
    contactDetailsLink: 'a[id$="applicant1-contact-details"]',
    personalDetailsLink: 'a[id$="applicant1-personal-details"]',
    contactDetailsLinkStatus: 'strong[id$="applicant1-contact-details-status"]',
    personalDetailsLinkStatus: 'strong[id$="applicant1-personal-details-status"]',
  },
  secondApplicant: {
    contactDetailsLink: 'a[id$="applicant2-contact-details"]',
    childrenPlacementOrderLink: 'a[id$="children-placement-order"]',
    personalDetailsLink: 'a[id$="applicant2-personal-details"]',
    personalDetailsLinkStatus: 'strong[id$="applicant2-personal-details-status"]',
    contactDetailsLinkStatus: 'strong[id$="applicant2-contact-details-status"]',
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
    adoptionAgencyLink: 'a[id$="adoption-agency"]',
    adoptionAgencyDetailsStatus: 'strong[id$="adoption-agency-status"]',
    childrenSiblingLink: 'a[href$="/sibling/exists"]',
    childrenSiblingDetailsStatus: 'strong[id$="sibling-status"]',
    reviewPayAndSubmitLink: 'a[id="review-pay-and-submit"]',
    dateChildMovedInLink: 'a[id$="date-child-moved-in"]',
    dateChildMovedInDetailsStatus: 'strong[id$="date-child-moved-in-status"]',
    findFamilyCourtLink: 'a[id$="find-family-court"]',
    findFamilyCourtStatus: 'strong[id$="find-family-court-status"]',
  },
  uploadDocument: {
    uploadDocumentLink: 'a[href$="upload-your-documents"]',
    uploadDocumentStatus: 'strong[id$="upload-your-documents-status"]',
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

  async selectChildAdoptionAgencyDetails() {
    await I.click(this.childDetails.adoptionAgencyLink);
  },

  async verifyChildAdoptionAgencyDetailsStatus() {
    await I.see('COMPLETED', this.childDetails.adoptionAgencyDetailsStatus);
  },

  async selectSiblingDetails() {
    await I.click(this.childDetails.childrenSiblingLink);
  },

  async verifySiblingDetailsStatus() {
    await I.see('COMPLETED', this.childDetails.childrenSiblingDetailsStatus);
  },

  async verifySecondApplicantSectionNotDisplayed() {
    await I.dontSeeElement(this.secondApplicant.personalDetailsLink);
    await I.dontSeeElement(this.secondApplicant.contactDetailsLink);
  },

  async selectReviewPayAndSubmitDetails() {
    await I.click(this.childDetails.reviewPayAndSubmitLink);
  },

  async selectUploadDocumentsDetails() {
    await I.click(this.uploadDocument.uploadDocumentLink);
  },

  async verifyUploadDocumentsStatus() {
    await I.see('COMPLETED', this.uploadDocument.uploadDocumentStatus);
  },

  async selectDateChildMovedInDetails() {
    await I.click(this.childDetails.dateChildMovedInLink);
  },

  async verifyDateChildMovedInStatus() {
    await I.see('COMPLETED', this.childDetails.dateChildMovedInDetailsStatus);
  },

  async verifyPrimaryApplicantContactDetailsStatus() {
    await I.see('COMPLETED', this.primaryApplicant.contactDetailsLinkStatus);
  },

  async verifyPrimaryApplicantPersonalDetailsStatus() {
    await I.see('COMPLETED', this.primaryApplicant.personalDetailsLinkStatus);
  },

  async verifySecondApplicantPersonalDetailsStatus() {
    await I.see('COMPLETED', this.secondApplicant.contactDetailsLinkStatus);
  },

  async selectChooseYourFamilyCourtDetails() {
    await I.click(this.childDetails.findFamilyCourtLink);
  },

  async verifyChooseYourFamilyCourtStatus() {
    await I.see('COMPLETED', this.childDetails.findFamilyCourtStatus);
  },
};
