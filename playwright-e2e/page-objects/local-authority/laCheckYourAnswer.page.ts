import { Locator, Page } from '@playwright/test';

import BasePage from '../../pages/basePage.page';

export class LACheckYourAnswerPage extends BasePage {
  readonly checkYourAnswersHeading: Locator;

  readonly continueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.checkYourAnswersHeading = page.locator('h1').filter({ hasText: 'Check your answers' });

    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Continue' });
  }
}
