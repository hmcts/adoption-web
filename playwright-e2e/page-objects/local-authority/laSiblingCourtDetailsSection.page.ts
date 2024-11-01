import { Locator, Page } from '@playwright/test';

export class LAChildHasOtherSiblingsPage {
  readonly childHasOtherSiblingsHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;
  readonly notSureRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.childHasOtherSiblingsHeading = page.getByRole('heading', { name: 'Does the child have any' });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No', { exact: true });
    this.notSureRadioButton = page.getByLabel('Not sure');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }

  async checkNoRadioButton(): Promise<void> {
    await this.noRadioButton.check();
  }

  async checkNotSureRadioButton(): Promise<void> {
    await this.notSureRadioButton.check();
  }

  async clickSaveAndContinueButton(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}
