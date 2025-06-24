import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LAUploadDocumentsPage extends BasePage {
  readonly uploadDocumentsHeading: Locator;

  readonly cannotUploadDocumentsCheckbox: Locator;

  constructor(page: Page) {
    super(page);

    this.uploadDocumentsHeading = page.getByRole('heading', { name: 'Upload documents' });

    this.cannotUploadDocumentsCheckbox = page.getByLabel('I cannot upload some or all');
  }

  async checkCannotUploadDocumentsCheckbox(): Promise<void> {
    await this.cannotUploadDocumentsCheckbox.check();
  }
}
