const { I } = inject();
const config = require('../config.js');
module.exports = {
  fields: {
    uploadFileButton: 'input[type="file"]',
    uploadProgressBar: '#uploadProgressBar div[aria-hidden="true"]',
    laCannotUpload: 'input[id$="laCannotUpload"]',
    fileUploadedOption: 'ul[id$="filesUploaded"]',
  },

  async uploadDocumentsSectionWithCantNotUploadOption() {
    await I.retry(3).waitForText('Upload documents', 30);
    await I.retry(3).click(this.fields.laCannotUpload);
    await I.wait(3);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
  },

  async uploadDocumentsSectionEmpty() {
    await I.retry(3).waitForText("Upload the child's documents", 30);
    await I.retry(3).click('Save and continue');
    await I.wait(4);
    await I.retry(3).see(
      'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option.'
    );
    await this.uploadDocumentsSectionWithCantNotUploadOption();
  },

  async uploadDocumentsSection() {
    await I.retry(3).waitForText('Upload documents', 30);
    await I.retry(3).attachFile(this.fields.uploadFileButton, config.testPdfFile);
    await I.wait(5);
    await I.retry(3).waitForElement(this.fields.uploadProgressBar, 30);
    await I.wait(3);
    await I.retry(3).waitForElement(this.fields.fileUploadedOption, 30);
    await I.wait(4);
  },
};
