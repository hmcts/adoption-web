import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LAPlacementOrdersInPlacePage extends BasePage {
  readonly placementOrdersInPlaceHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.placementOrdersInPlaceHeading = page.getByRole('heading', { name: 'Orders already in place' });
  }
}
