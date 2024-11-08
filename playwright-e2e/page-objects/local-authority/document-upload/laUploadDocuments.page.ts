import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LAUploadDocumentsPage extends BasePage {
  readonly uploadDocumentsHeading: Locator;

  readonly cannotUploadDocumentsCheckbox: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.uploadDocumentsHeading = page.getByRole('heading', { name: 'Upload documents' });

    this.cannotUploadDocumentsCheckbox = page.getByLabel('I cannot upload some or all');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkCannotUploadDocumentsCheckbox(): Promise<void> {
    await this.cannotUploadDocumentsCheckbox.check();
  }
}
