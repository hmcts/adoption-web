import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LAOtherPersonResponsibilityPage extends BasePage {
  readonly otherPersonResponsibilityHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.otherPersonResponsibilityHeading = page.getByRole('heading', { name: 'Is there another person who' });
  }
}
