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
    personalDetailsLink: 'a[id$="applicant2-personal-details"]',
    personalDetailsLinkStatus: 'strong[id$="applicant2-personal-details-status"]',
    contactDetailsLinkStatus: 'strong[id$="applicant2-contact-details-status"]',
  },
  childDetails: {
    childrenBirthCertificateLink: 'a[id$="birth-certificate-details"]',
    adoptionCertificateDetailsLink: 'a[id$="adoption-certificate-details"]',
    childrenBirthCertificateDetailsStatus: 'strong[id$="children-birth-certificate-details-status"]',
    adoptionCertificateDetails: 'strong[id$="adoption-certificate-details-status"]',
    childrenBirthMotherLink: 'a[id$="birth-mother-details"]',
    childrenBirthMotherDetailsStatus: 'strong[id$="birth-mother-details-status"]',
    childOtherParentLink: 'a[id$="other-parent-details"]',
    childOtherParentDetailsStatus: 'strong[id$="other-parent-status"]',
    childrenBirthFatherLink: 'a[id$="birth-father-details"]',
    childrenBirthFatherDetailsStatus: 'strong[id$="birth-father-status"]',
    adoptionAgencyLink: 'a[id$="adoption-agency"]',
    adoptionAgencyDetailsStatus: 'strong[id$="adoption-agency-status"]',
    childrenPlacementOrderLink: 'a[id$="placement-and-court-order-details"]',
    childrenSiblingLink: 'a[href$="/sibling/exists"]',
    childrenSiblingDetailsStatus: 'strong[id$="sibling-status"]',
    reviewPayAndSubmitLink: 'a[id="review-pay-and-submit"]',
    dateChildMovedInLink: 'a[id$="date-child-moved-in"]',
    dateChildMovedInDetailsStatus: 'strong[id$="date-child-moved-in-status"]',
    findFamilyCourtLink: 'a[id$="find-family-court"]',
    findFamilyCourtStatus: 'strong[id$="find-family-court-status"]',
  },
  uploadDocument: {
    uploadDocumentLink: 'a[id$="upload-documents"]',
    uploadDocumentStatus: 'strong[id$="upload-documents-status"]',
  },

  async goToTaskListPage() {
    await I.retry(3).goToPage(config.baseUrl + 'task-list');
    I.wait(3);
  },
  async selectTaskNameFromTaskList(taskName) {
    await I.retry(3).click(taskName);
  },

  async selectPrimaryApplicantContactDetails() {
    await I.retry(3).waitForSelector(this.primaryApplicant.contactDetailsLink, 30);
    await I.retry(3).click(this.primaryApplicant.contactDetailsLink);
    await I.wait(4);
  },

  async selectOtherApplicantContactDetails() {
    await I.retry(3).waitForSelector(this.secondApplicant.contactDetailsLink, 30);
    await I.retry(3).click(this.secondApplicant.contactDetailsLink);
    await I.wait(4);
  },

  async selectChildPlacementOrderDetails() {
    await I.retry(3).waitForSelector(this.childDetails.childrenPlacementOrderLink, 30);
    await I.retry(3).click(this.childDetails.childrenPlacementOrderLink);
    await I.wait(4);
  },

  async selectFirstApplicantPersonalDetails() {
    await I.retry(3).waitForSelector(this.primaryApplicant.contactDetailsLink, 30);
    await I.retry(3).click(this.primaryApplicant.contactDetailsLink);
    await I.wait(4);
  },

  async selectChildrenBirthCertificate() {
    await I.retry(3).waitForSelector(this.childDetails.childrenBirthCertificateLink, 30);
    await I.retry(3).click(this.childDetails.childrenBirthCertificateLink);
    await I.wait(4);
  },

  async selectFirstApplicantPersonalDetails() {
    await I.retry(3).waitForSelector(this.primaryApplicant.personalDetailsLink, 30);
    await I.retry(3).click(this.primaryApplicant.personalDetailsLink);
    await I.wait(4);
  },
  async selectOtherApplicantPersonalDetails() {
    await I.retry(3).waitForSelector(this.secondApplicant.personalDetailsLink, 30);
    await I.retry(3).click(this.secondApplicant.personalDetailsLink);
    await I.wait(4);
  },
  async verifyOtherApplicantPersonalDetailsStatus() {
    await I.retry(3).waitForSelector(this.secondApplicant.personalDetailsLinkStatus, 30);
    await I.retry(3).see('COMPLETED', this.secondApplicant.personalDetailsLinkStatus);
    await I.wait(4);
  },
  async verifyChildBirthCertificateDetailsStatus() {
    await I.retry(3).waitForSelector(this.childDetails.childrenBirthCertificateDetailsStatus, 30);
    await I.retry(3).see('COMPLETED', this.childDetails.childrenBirthCertificateDetailsStatus);
    await I.wait(4);
  },

  async selectChildChildDetails() {
    await I.retry(3).waitForSelector(this.childDetails.adoptionCertificateDetailsLink, 30);
    await I.retry(3).click(this.childDetails.adoptionCertificateDetailsLink);
    await I.wait(4);
  },

  async verifyChildDetailsStatus() {
    await I.retry(3).waitForSelector(this.childDetails.adoptionCertificateDetails, 30);
    await I.retry(3).see('COMPLETED', this.childDetails.adoptionCertificateDetails);
  },

  async selectChildBirthMotherDetails() {
    await I.retry(3).waitForSelector(this.childDetails.childrenBirthMotherLink, 30);
    await I.retry(3).click(this.childDetails.childrenBirthMotherLink);
    await I.wait(4);
  },

  async verifyChildBirthMotherDetailsStatus() {
    await I.retry(3).waitForSelector(this.childDetails.childrenBirthMotherDetailsStatus, 30);
    await I.retry(3).see('COMPLETED', this.childDetails.childrenBirthMotherDetailsStatus);
  },

  async selectChildOtherParentDetails() {
    await I.retry(3).waitForSelector(this.childDetails.childOtherParentLink, 30);
    await I.retry(3).click(this.childDetails.childOtherParentLink);
    await I.wait(4);
  },

  async verifyChildOtherParentDetailsStatus() {
    await I.retry(3).waitForSelector(this.childDetails.childOtherParentDetailsStatus, 30);
    await I.retry(3).see('COMPLETED', this.childDetails.childOtherParentDetailsStatus);
    await I.wait(4);
  },

  async selectChildBirthFatherDetails() {
    await I.retry(3).waitForSelector(this.childDetails.childrenBirthFatherLink, 30);
    await I.retry(3).click(this.childDetails.childrenBirthFatherLink);
    await I.wait(4);
  },

  async verifyChildBirthFatherDetailsStatus() {
    await I.retry(3).waitForSelector(this.childDetails.childrenBirthFatherDetailsStatus, 30);
    await I.retry(3).see('COMPLETED', this.childDetails.childrenBirthFatherDetailsStatus);
  },

  async verifyChildBirthFatherInProgresStatus() {
    await I.retry(3).waitForSelector(this.childDetails.childrenBirthFatherDetailsStatus, 30);
    await I.retry(3).see('IN PROGRESS', this.childDetails.childrenBirthFatherDetailsStatus);
  },

  async selectChildAdoptionAgencyDetails() {
    await I.retry(3).waitForSelector(this.childDetails.adoptionAgencyLink, 30);
    await I.retry(3).click(this.childDetails.adoptionAgencyLink);
    await I.wait(4);
  },

  async verifyChildAdoptionAgencyDetailsStatus() {
    await I.retry(3).waitForSelector(this.childDetails.adoptionAgencyDetailsStatus, 30);
    await I.retry(3).see('COMPLETED', this.childDetails.adoptionAgencyDetailsStatus);
  },

  async verifyChildAdoptionAgencyInProgresStatus() {
    await I.retry(3).waitForSelector(this.childDetails.adoptionAgencyDetailsStatus, 30);
    await I.retry(3).see('IN PROGRESS', this.childDetails.adoptionAgencyDetailsStatus);
  },

  async selectSiblingDetails() {
    await I.retry(3).waitForSelector(this.childDetails.childrenSiblingLink, 30);
    await I.retry(3).click(this.childDetails.childrenSiblingLink);
    await I.wait(4);
  },

  async verifySiblingDetailsStatus() {
    await I.retry(3).waitForSelector(this.childDetails.childrenSiblingDetailsStatus, 30);
    await I.retry(3).see('COMPLETED', this.childDetails.childrenSiblingDetailsStatus);
  },

  async verifySecondApplicantSectionNotDisplayed() {
    await I.retry(3).dontSeeElement(this.secondApplicant.personalDetailsLink);
    await I.retry(3).dontSeeElement(this.secondApplicant.contactDetailsLink);
  },

  async selectReviewPayAndSubmitDetails() {
    await I.retry(3).waitForSelector(this.childDetails.reviewPayAndSubmitLink, 30);
    await I.retry(3).click(this.childDetails.reviewPayAndSubmitLink);
    await I.wait(4);
  },

  async selectUploadDocumentsDetails() {
    await I.retry(3).waitForSelector(this.uploadDocument.uploadDocumentLink, 30);
    await I.retry(3).click(this.uploadDocument.uploadDocumentLink);
    await I.wait(4);
  },

  async verifyUploadDocumentsStatus() {
    await I.retry(3).waitForSelector(this.uploadDocument.uploadDocumentStatus, 30);
    await I.retry(3).see('COMPLETED', this.uploadDocument.uploadDocumentStatus);
  },

  async selectDateChildMovedInDetails() {
    await I.retry(3).waitForSelector(this.childDetails.dateChildMovedInLink, 30);
    await I.retry(3).click(this.childDetails.dateChildMovedInLink);
    await I.wait(4);
  },

  async verifyDateChildMovedInStatus() {
    await I.retry(3).waitForSelector(this.childDetails.dateChildMovedInDetailsStatus, 30);
    await I.retry(3).see('COMPLETED', this.childDetails.dateChildMovedInDetailsStatus);
    await I.wait(4);
  },

  async verifyPrimaryApplicantContactDetailsStatus() {
    await I.retry(3).waitForSelector(this.primaryApplicant.contactDetailsLinkStatus, 30);
    await I.retry(3).see('COMPLETED', this.primaryApplicant.contactDetailsLinkStatus);
  },

  async verifyPrimaryApplicantPersonalDetailsStatus() {
    await I.retry(3).waitForSelector(this.primaryApplicant.personalDetailsLinkStatus, 30);
    await I.retry(3).see('COMPLETED', this.primaryApplicant.personalDetailsLinkStatus);
  },

  async verifySecondApplicantPersonalDetailsStatus() {
    await I.retry(3).waitForSelector(this.secondApplicant.contactDetailsLinkStatus, 30);
    await I.retry(3).see('COMPLETED', this.secondApplicant.contactDetailsLinkStatus);
  },

  async selectChooseYourFamilyCourtDetails() {
    await I.retry(3).waitForSelector(this.childDetails.findFamilyCourtLink, 30);
    await I.retry(3).click(this.childDetails.findFamilyCourtLink);
    await I.wait(4);
  },

  async verifyChooseYourFamilyCourtStatus() {
    await I.retry(3).waitForSelector(this.childDetails.findFamilyCourtStatus, 30);
    await I.retry(3).see('COMPLETED', this.childDetails.findFamilyCourtStatus);
    await I.wait(4);
  },
};
