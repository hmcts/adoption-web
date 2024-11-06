import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthMotherAliveStatusPage extends BasePage {
  readonly birthMotherStillAliveHeading: Locator;

  readonly birthMotherAliveYesRadioButton: Locator;
  readonly birthMotherAliveNoRadioButton: Locator;
  readonly birthMotherAliveNotSureRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);
    this.birthMotherStillAliveHeading = page.getByRole('heading', { name: "Is the child's birth mother" });

    this.birthMotherAliveYesRadioButton = page.getByLabel('Yes');
    this.birthMotherAliveNoRadioButton = page.getByLabel('No');
    this.birthMotherAliveNotSureRadioButton = page.getByLabel('Not sure');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkBirthMotherAliveYesRadioButton(): Promise<void> {
    await this.birthMotherAliveYesRadioButton.check();
  }

  async checkBirthMotherAliveNoRadioButton(): Promise<void> {
    await this.birthMotherAliveNoRadioButton.check();
  }

  async checkBirthMotherAliveNotSureButton(): Promise<void> {
    await this.birthMotherAliveNotSureRadioButton.check();
  }
}
