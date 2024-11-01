import { Locator, Page } from '@playwright/test';

export class LAUploadDocumentsPage {
  readonly uploadDocumentsHeading: Locator;

  readonly cannotUploadDocumentsCheckbox: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.uploadDocumentsHeading = page.getByRole('heading', { name: 'Upload documents' });

    this.cannotUploadDocumentsCheckbox = page.getByLabel('I cannot upload some or all');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkCannotUploadDocumentsCheckbox(): Promise<void> {
    await this.cannotUploadDocumentsCheckbox.check();
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}
