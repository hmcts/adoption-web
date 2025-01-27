import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthMotherAliveStatusPage extends BasePage {
  readonly birthMotherStillAliveHeading: Locator;

  readonly birthMotherAliveYesRadioButton: Locator;
  readonly birthMotherAliveNoRadioButton: Locator;
  readonly birthMotherAliveNotSureRadioButton: Locator;

  constructor(page: Page) {
    super(page);
 
    this.birthMotherStillAliveHeading = page.getByRole('heading', { name: "Is the child's birth mother" });

    this.birthMotherAliveYesRadioButton = page.getByLabel('Yes');
    this.birthMotherAliveNoRadioButton = page.getByLabel('No');
    this.birthMotherAliveNotSureRadioButton = page.getByLabel('Not sure');

    this.birthMotherGroup = page.getByRole('group', { name: "Is the child's birth mother still alive?" });
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
