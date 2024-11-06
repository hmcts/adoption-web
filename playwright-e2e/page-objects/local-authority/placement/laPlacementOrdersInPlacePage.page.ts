import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LAPlacementOrdersInPlacePage extends BasePage {
  readonly placementOrdersInPlaceHeading: Locator;

  readonly yesRadioButton: Locator;
  readonly noRadioButton: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.placementOrdersInPlaceHeading = page.getByRole('heading', { name: 'Orders already in place' });

    this.yesRadioButton = page.getByLabel('Yes');
    this.noRadioButton = page.getByLabel('No');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }
}
