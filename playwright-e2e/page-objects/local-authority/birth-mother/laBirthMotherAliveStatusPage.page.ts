import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthMotherAliveStatusPage extends BasePage {
  readonly birthMotherStillAliveHeading: Locator;

  readonly birthMotherGroup: Locator;

  readonly birthMotherAliveYesRadioButton: Locator;
  readonly birthMotherAliveNoRadioButton: Locator;
  readonly birthMotherAliveNotSureRadioButton: Locator;

  constructor(page: Page) {
    super(page);

    this.birthMotherGroup = page.getByRole('group', { name: "Is the child's birth mother still alive?" });

    this.birthMotherStillAliveHeading = page.getByRole('heading', { name: "Is the child's birth mother" });

    this.birthMotherAliveYesRadioButton = this.birthMotherGroup.getByLabel('Yes');
    this.birthMotherAliveNoRadioButton = this.birthMotherGroup.getByLabel('No');
    this.birthMotherAliveNotSureRadioButton = this.birthMotherGroup.getByLabel('Not sure');
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
