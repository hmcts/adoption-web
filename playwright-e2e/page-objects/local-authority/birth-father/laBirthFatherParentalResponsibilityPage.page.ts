import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthFatherParentalResponsibilityPage extends BasePage {
  readonly birthFatherParentalResponsibilityHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.birthFatherParentalResponsibilityHeader = page.getByRole('heading', { name: 'Does the birth father have' });
  }
}
