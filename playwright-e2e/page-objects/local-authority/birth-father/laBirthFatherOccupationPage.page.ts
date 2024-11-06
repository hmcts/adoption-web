import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthFatherOccupationPage extends BasePage {
  readonly laBirthFatherOccupationHeader: Locator;

  readonly laBirthFatherOccuptationLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);

    this.laBirthFatherOccupationHeader = page.getByRole('heading', { name: 'What is the occupation of the' });

    this.laBirthFatherOccuptationLabel = page.locator('#birthFatherOccupation');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillBirthFatherOccupationLabel(occuptation: string): Promise<void> {
    await this.laBirthFatherOccuptationLabel.fill(occuptation);
  }
}
