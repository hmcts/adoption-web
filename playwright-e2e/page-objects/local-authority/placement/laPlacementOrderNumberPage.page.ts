import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LAPlacementOrderNumberPage extends BasePage {
  readonly placementOrderNumberPage: Locator;

  readonly orderNumberLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.placementOrderNumberPage = page.getByText('What is the serial or case');

    this.orderNumberLabel = page.getByLabel('What is the serial or case');
  }

  async fillOrderNumberLabel(order: string): Promise<void> {
    await this.orderNumberLabel.fill(order);
  }
}
