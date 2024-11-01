import { Locator, Page } from '@playwright/test';

export class LACheckYourAnswerPage {
  readonly checkYourAnswersHeading: Locator;

  readonly continueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    this.checkYourAnswersHeading = page.locator('h1').filter({ hasText: 'Check your answers' });

    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Continue' });
  }

  async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }

  async clickSaveAsDraftButton(): Promise<void> {
    await this.saveAsDraftButton.click();
  }
}
