import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LAOtherPersonResponsibilityPage extends BasePage {
  readonly otherPersonResponsibilityHeading: Locator;

  readonly noRadioButton: Locator;

  constructor(page: Page) {
    super(page);

    this.otherPersonResponsibilityHeading = page.getByRole('heading', { name: 'Is there another person who' });

    this.noRadioButton = page.getByLabel('No', { exact: true });
  }

  async checkOtherPersonNoRadioButton(): Promise<void> {
    await this.noRadioButton.check();
  }
}
