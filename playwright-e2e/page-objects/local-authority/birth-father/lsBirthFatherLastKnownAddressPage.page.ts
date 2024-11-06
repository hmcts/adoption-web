import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthFatherLastKnownAddressPage extends BasePage {
  readonly birthFatherLastKnownAddressHeading: Locator;

  readonly postCodeLabel: Locator;
  readonly findAddressButton: Locator;

  readonly selectAnAddressLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);
    this.birthFatherLastKnownAddressHeading = page.getByRole('heading', { name: "What is the birth father's" });

    this.postCodeLabel = page.getByLabel('Postcode');
    this.findAddressButton = page.getByRole('button', { name: 'Find address' });

    this.selectAnAddressLabel = page.getByLabel('Select an address');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
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
