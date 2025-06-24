import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthMotherLastKnownAddressPage extends BasePage {
  readonly birthMotherLastKnownAddressHeading: Locator;

  readonly postCodeLabel: Locator;
  readonly findAddressButton: Locator;

  readonly selectAnAddressLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.birthMotherLastKnownAddressHeading = page.getByRole('heading', { name: "What is the birth mother's" });

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
