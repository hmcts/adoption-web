import { type Locator, type Page } from '@playwright/test';
export default class BasePage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly saveAndContinue: Locator;
  readonly saveAsDraft: Locator;
  readonly continueWithYourApplication: Locator;
  readonly backLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.saveAndContinue = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraft = page.getByRole('button', { name: 'Save as draft' });
    this.continueWithYourApplication = page.getByRole('button', { name: 'Save as draft' });
    this.backLink = page.getByRole('link', { name: 'Back', exact: true });
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickSaveAndContinue(): Promise<void> {
    await this.saveAndContinue.click();
  }
}
