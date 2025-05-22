import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class StartPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Apply to adopt a child placed in your care' });
  }
}
