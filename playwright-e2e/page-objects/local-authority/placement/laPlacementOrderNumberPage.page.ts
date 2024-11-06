import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LAPlacementOrderNumberPage extends BasePage {
  readonly placementOrderNumberPage: Locator;

  readonly orderNumberLabel: Locator;

  readonly saveAndConintueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.placementOrderNumberPage = page.getByText('What is the serial or case');

    this.orderNumberLabel = page.getByLabel('What is the serial or case');

    this.saveAndConintueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillOrderNumberLabel(order: string): Promise<void> {
    await this.orderNumberLabel.fill(order);
  }
}
