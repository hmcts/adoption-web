import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthMotherNamePage extends BasePage {
  readonly birthMotherFullNameHeading: Locator;

  readonly birthMotherFirstNameLabel: Locator;
  readonly birthMotherLastNameLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.birthMotherFullNameHeading = page.getByRole('heading', { name: 'What is the full name of the' });

    this.birthMotherFirstNameLabel = page.getByLabel('First names');
    this.birthMotherLastNameLabel = page.getByLabel('Last names');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillBirthMotherNames(firstNames: string, lastNames: string): Promise<void> {
    await this.birthMotherFirstNameLabel.fill(firstNames);
    await this.birthMotherLastNameLabel.fill(lastNames);
  }
}
