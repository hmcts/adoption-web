import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LABirthMotherNamePage extends BasePage {
  readonly birthMotherFullNameHeading: Locator;

  readonly birthMotherFirstNameLabel: Locator;
  readonly birthMotherLastNameLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.birthMotherFullNameHeading = page.getByRole('heading', { name: 'What is the full name of the' });

    this.birthMotherFirstNameLabel = page.getByLabel('First names');
    this.birthMotherLastNameLabel = page.getByLabel('Last names');
  }

  async fillBirthMotherNames(firstNames: string, lastNames: string): Promise<void> {
    await this.birthMotherFirstNameLabel.fill(firstNames);
    await this.birthMotherLastNameLabel.fill(lastNames);
  }
}
