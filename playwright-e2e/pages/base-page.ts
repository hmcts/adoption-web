import { type Locator, type Page} from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole('button', { name: 'Continue' });
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
