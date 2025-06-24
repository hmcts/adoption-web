import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LABirthFatherStillAliveStatusPage extends BasePage {
  readonly birthFatherStillAliveHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.birthFatherStillAliveHeading = page.getByRole('heading', { name: "Is the child's birth father" });
  }
}
