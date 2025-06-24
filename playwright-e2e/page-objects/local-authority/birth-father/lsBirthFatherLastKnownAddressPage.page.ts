import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LABirthFatherLastKnownAddressPage extends BasePage {
  readonly birthFatherLastKnownAddressHeading: Locator;

  readonly postCodeLabel: Locator;
  readonly findAddressButton: Locator;

  readonly selectAnAddressLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.birthFatherLastKnownAddressHeading = page.getByRole('heading', { name: "What is the birth father's" });

    this.postCodeLabel = page.getByLabel('Postcode');
    this.findAddressButton = page.getByRole('button', { name: 'Find address' });

    this.selectAnAddressLabel = page.getByLabel('Select an address');
  }

  async fillPostCodeLabel(postcode: string): Promise<void> {
    await this.postCodeLabel.fill(postcode);
  }

  async clickFindAddressButton(): Promise<void> {
    await this.findAddressButton.click();
  }

  async selectAddressOption(option: string): Promise<void> {
    await this.selectAnAddressLabel.selectOption(option);
  }
}
