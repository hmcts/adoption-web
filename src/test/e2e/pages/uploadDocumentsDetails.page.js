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

  async uploadDocumentsSection() {
    await I.waitForText("Upload the child's documents", 30);
    await I.attachFile(this.fields.uploadFileButton, config.testPdfFile);
    await I.wait('3');
    await I.waitForElement(this.fields.uploadProgressBar, 30);
    await I.wait('3');
    await I.waitForElement(this.fields.fileUploadedOption, 30);
    await I.click(this.fields.applicant1CannotUpload);
    await I.wait('3');
    await I.click(this.fields.applicant1CannotUploadDocuments);
    await I.click(this.fields.applicant1CannotUploadDocuments2);
    await I.click('Save and continue');
    await I.wait('4');
  },
};
