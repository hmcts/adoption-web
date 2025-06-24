import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LAPlacementOrdersSummaryPage extends BasePage {
  readonly placementOrdersSummaryHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.placementOrdersSummaryHeading = page.getByRole('heading', { name: 'Orders already in place' });
  }
}
