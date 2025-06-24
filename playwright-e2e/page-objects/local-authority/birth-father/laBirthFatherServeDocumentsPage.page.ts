import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LABirthFatherServeDocumentsPage extends BasePage {
  readonly birthFatherDocumentHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.birthFatherDocumentHeading = page.getByRole('heading', { name: 'Should the birth father be' });
  }
}
