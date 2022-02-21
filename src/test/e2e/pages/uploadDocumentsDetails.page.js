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

  uploadDocumentsSection() {
    I.waitForText("Upload the child's documents", 30);
    I.attachFile(this.fields.uploadFileButton, config.testPdfFile);
    I.wait('3');
    I.waitForElement(this.fields.uploadProgressBar, 30);
    I.wait('3');
    I.waitForElement(this.fields.fileUploadedOption, 30);
    I.click(this.fields.applicant1CannotUpload);
    I.wait('3');
    I.click(this.fields.applicant1CannotUploadDocuments);
    I.click(this.fields.applicant1CannotUploadDocuments2);
    I.click('Save and continue');
    I.wait('2');
  },
};
