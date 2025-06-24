import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LABirthFatherNamePage extends BasePage {
  readonly birthFatherNameHeading: Locator;

  readonly firstNameLabel: Locator;
  readonly lastNameLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.birthFatherNameHeading = page.getByRole('heading', { name: 'What is the full name of the' });

    this.firstNameLabel = page.getByLabel('First names');
    this.lastNameLabel = page.getByLabel('Last names');
  }

  async fillFirstNameLabel(firstName: string): Promise<void> {
    await this.firstNameLabel.fill(firstName);
  }

  async fillLastNameLabel(lastName: string): Promise<void> {
    await this.lastNameLabel.fill(lastName);
  }
}
