const { I } = inject();
const config = require('../config.js');
module.exports = {
  fields: {
    uploadFileButton: 'input[type="file"]',
    uploadProgressBar: '#uploadProgressBar div[aria-hidden="true"]',
    applicant1CannotUpload: 'input[id$="applicant1CannotUpload"]',
    fileUploadedOption: 'ul[id$="filesUploaded"]',
    applicant1CannotUploadDocuments: 'input[id$="applicant1CannotUploadDocuments"]',
    applicant1CannotUploadDocuments2: 'input[id$="applicant1CannotUploadDocuments-2"]',
  },

  async uploadDocumentsSectionWithCantNotUploadOption() {
    await I.retry(3).waitForText("Upload the child's documents", 30);
    await I.retry(3).click(this.fields.applicant1CannotUpload);
    await I.wait(3);
    await I.retry(3).click(this.fields.applicant1CannotUploadDocuments);
    await I.retry(3).click(this.fields.applicant1CannotUploadDocuments2);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async uploadDocumentsSection() {
    await I.retry(3).waitForText("Upload the child's documents", 30);
    await I.retry(3).attachFile(this.fields.uploadFileButton, config.testPdfFile);
    await I.wait(3);
    await I.retry(3).waitForElement(this.fields.uploadProgressBar, 30);
    await I.wait(3);
    await I.retry(3).waitForElement(this.fields.fileUploadedOption, 30);
    await I.wait(4);
  },
};
