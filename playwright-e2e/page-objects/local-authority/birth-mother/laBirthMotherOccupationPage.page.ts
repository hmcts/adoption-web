import { Locator, Page } from '@playwright/test';

import BasePage from '../../../pages/basePage.page';

export class LABirthMotherOccupationPage extends BasePage {
  readonly birthMotherOccupationHeading: Locator;

  readonly birthMotherOccupationLabel: Locator;

  readonly saveAndContinueButton: Locator;
  readonly saveAsDraftButton: Locator;

  constructor(page: Page) {
    super(page);
    this.birthMotherOccupationHeading = page.getByText('What is the occupation of the');

    this.birthMotherOccupationLabel = page.getByLabel('What is the occupation of the');

    this.saveAndContinueButton = page.getByRole('button', { name: 'Save and continue' });
    this.saveAsDraftButton = page.getByRole('button', { name: 'Save as draft' });
  }

  async fillBirthMotherOccupationLabel(occupation: string): Promise<void> {
    await this.birthMotherOccupationLabel.fill(occupation);
  }
}
