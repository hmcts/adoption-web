import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthMotherServeDocumentsPage extends BasePage {
  readonly birthMotherDocumentHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.birthMotherDocumentHeading = page.getByRole('heading', { name: 'Should the birth mother be' });
  }
}
