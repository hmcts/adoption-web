import { Locator, Page } from '@playwright/test';

export class LAOtherPersonResponsibilityPage {
  readonly otherPersonResponsibilityHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.otherPersonResponsibilityHeading = page.getByRole('heading', { name: 'Is there another person who' });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No', { exact: true });

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async checkYesRadioButton(): Promise<void> {
    await this.yesRadioButton.check();
  }

  async checkNoRadioButton(): Promise<void> {
    await this.noRadioButton.check();
  }

  async clickAndSaveContinue(): Promise<void> {
    await this.saveAndContinueButton.click();
  }

  async clickSaveAsDraft(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}
