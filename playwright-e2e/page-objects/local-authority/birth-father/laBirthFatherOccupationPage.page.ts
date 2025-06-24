import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page.ts';

export class LABirthFatherOccupationPage extends BasePage {
  readonly laBirthFatherOccupationHeader: Locator;

  readonly laBirthFatherOccuptationLabel: Locator;

  constructor(page: Page) {
    super(page);

    this.laBirthFatherOccupationHeader = page.getByRole('heading', { name: 'What is the occupation of the' });

    this.laBirthFatherOccuptationLabel = page.locator('#birthFatherOccupation');
  }

  async fillBirthFatherOccupationLabel(occuptation: string): Promise<void> {
    await this.laBirthFatherOccuptationLabel.fill(occuptation);
  }
}
