import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthMotherServeDocumentsPage extends BasePage {
  readonly birthMotherDocumentHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.birthMotherDocumentHeading = page.getByRole('heading', { name: 'Should the birth mother be' });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }
}
