import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthFatherNamePage extends BasePage {
  readonly birthFatherNameHeading: Locator;

  readonly firstNameLabel: Locator;
  readonly lastNameLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.birthFatherNameHeading = page.getByRole('heading', { name: 'What is the full name of the' });

    this.firstNameLabel = page.getByLabel('First names');
    this.lastNameLabel = page.getByLabel('Last names');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillFirstNameLabel(firstName: string): Promise<void> {
    await this.firstNameLabel.fill(firstName);
  }

  async fillLastNameLabel(lastName: string): Promise<void> {
    await this.lastNameLabel.fill(lastName);
  }
}
